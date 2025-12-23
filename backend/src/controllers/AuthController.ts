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
  try {
    const { email, name, fullName, avatar, providerId, provider } = req.body;

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
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred during login with this provider';

    return res.status(401).json({ success: false, error: errorMessage });
  }
}


    // Google
  async googleCallback(req: Request, res: Response) {
    try {
      const { code } = req.query;
      if (!code) {
        return res.status(400).send('Missing code');
      }


      const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code: String(code),
          client_id: process.env.GOOGLE_CLIENT_ID || '',
          client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
          redirect_uri: process.env.GOOGLE_REDIRECT_URI || '',
          grant_type: 'authorization_code'
        }) as unknown as string
      });

      const tokenData = await tokenResp.json();
      console.log('Google token response:', tokenData);

      if (!tokenResp.ok) {
        return res.status(400).json({ error: 'Failed to exchange code with Google', details: tokenData });
      }

      const accessToken = tokenData.access_token;
      if (!accessToken) return res.status(400).json({ error: 'No access token received' });

      const userResp = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const userInfo = await userResp.json();
      console.log('Google userinfo:', userInfo);

      const payload = {
        email: userInfo.email,
        name: userInfo.given_name || userInfo.name || userInfo.email?.split('@')[0],
        fullName: userInfo.name || userInfo.email?.split('@')[0],
        avatar: userInfo.picture || '',
        provider: 'google',
        providerId: userInfo.id || userInfo.sub
      };

      const result = await this.authService.socialLogin(payload as any);

      const frontendUrl = 'http://localhost:5173';
      const userParam = encodeURIComponent(JSON.stringify({
        userId: result.userId,
        nameUser: result.nameUser,
        fullName: result.fullName,
        email: result.email,
        role: result.role,
        avatar_url: result.avatar_url,
        is_verified: result.is_verified
      }));
      const redirectUrl = `${frontendUrl}/auth/callback?token=${encodeURIComponent(result.token)}&user=${userParam}`;
      return res.redirect(redirectUrl);
    } catch (err) {
      console.error('Error in googleCallback:', err);
      return res.status(500).send('Internal server error');
    }
  }
}
