import { Request, Response } from "express";
import AuthService from "../services/authService";
import OTPService from "../services/otpService";
import connection from "../connection";

export default class AuthController {
  constructor(
    private authService = new AuthService(),
    private otpService = new OTPService()
  ) {}

  async login(req: Request, res: Response) {
    console.log("Login Request Body:", req.body);
    const { identifier, password } = req.body;

    try {
      // Faz o login básico (valida credenciais)
      const loginResult = await this.authService.login({ identifier, password });
      
      //  Busca o usuário completo pelo ID 
      const user = await connection('users')
        .where({ id: loginResult.userId })
        .select('email', 'is_verified', 'nameUser', 'fullName')
        .first();

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      // SE NÃO VERIFICADO → Envia OTP
      if (user.is_verified === 0) {
        const otpResult = await this.otpService.sendOTPEmail(user.email);
        
        if (!otpResult.success) {
          res.status(500).json({ 
            message: 'Error sending verification code.' 
          });
          return;
        }

        res.status(200).json({
          message: 'Account not verified. Verification code sent to your email.',
          requiresOTP: true,
          email: user.email,  // Agora sim temos o email correto
          userId: loginResult.userId
        });
        return;
      }

      // JÁ VERIFICADO → Login direto com token
      res.status(200).json({
        ...loginResult,
        requiresOTP: false
      });
      
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Invalid credentials" });
    }
  }
}