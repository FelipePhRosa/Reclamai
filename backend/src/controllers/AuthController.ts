import { Request, Response } from 'express';
import AuthService from '../services/authService';
import OTPService from '../services/otpService';
import connection from '../connection';

export default class AuthController {
  private authService: AuthService;
  private otpService: OTPService;

  constructor() {
    this.authService = new AuthService();
    this.otpService = new OTPService();
  }

  // Login tradicional
  async login(req: Request, res: Response) {
    console.log("Login Request Body:", req.body);
    const { identifier, password } = req.body;

    try {
      // Faz o login básico (valida credenciais)
      const loginResult = await this.authService.login({ identifier, password });
      
      // Busca o usuário completo pelo ID
      const user = await connection('users')
        .where({ id: loginResult.userId })
        .select('email', 'is_verified', 'nameUser', 'fullName')
        .first();

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // SE NÃO VERIFICADO → envia OTP
      if (user.is_verified === 0) {
        const otpResult = await this.otpService.sendOTPEmail(user.email);

        if (!otpResult.success) {
          return res.status(500).json({ message: 'Error sending verification code.' });
        }

        return res.status(200).json({
          message: 'Account not verified. Verification code sent to your email.',
          requiresOTP: true,
          email: user.email,
          userId: loginResult.userId
        });
      }

      // JÁ VERIFICADO → login direto com token
      return res.status(200).json({
        ...loginResult,
        requiresOTP: false
      });

    } catch (error) {
      console.error("Login error:", error);
      return res.status(401).json({ error: "Invalid credentials" });
    }
  }

  // Login social
  async socialLogin(req: Request, res: Response) {
    console.log("Social Login Request Body:", req.body);
    const { email, name, fullName, avatar, providerId, provider } = req.body;

    try {
      const loginResult = await this.authService.socialLogin({
        email,
        name,
        fullName,
        avatar,
        provider: provider as "google" | "facebook",
        providerId,
      });

      return res.status(200).json(loginResult);

    } catch (error) {
      console.error('Social login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during login with this provider';
      return res.status(401).json({ success: false, error: errorMessage });
    }
  }
}
