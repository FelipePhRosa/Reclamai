import nodemailer from 'nodemailer';
import connection from '../connection';



const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function generateOTP(length: number = 6): string {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}

export class OTPService {
  async sendOTPEmail(email: string, expirationMinutes: number = 5) {
    try {
      // Remove OTPs anteriores deste email
      await connection('otps').where({ email }).delete();

      // Gera novo OTP
      const otp = generateOTP(6);

      // Calcula expiração
      const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000);

      // Salva no banco
      await connection('otps').insert({
        email,
        code: otp,
        expires_at: expiresAt,
      });

      // Envia email
      const mailOptions = {
        from: `"Reclamaí" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '🔐 Seu código de verificação - Reclamaí',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  margin: 0;
                  padding: 0;
                  background-color: #f5f5f5;
                }
                .container { 
                  max-width: 600px;
                  margin: 40px auto;
                  background: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                  background: linear-gradient(135deg, #4250eb 30%, #e8f0aa 100%);
                  padding: 40px 20px;
                  text-align: center;
                  color: #fffff;
                }
                .header h1 {
                  margin: 0;
                  font-size: 28px;
                }
                .content {
                  padding: 40px 30px;
                }
                .code-box { 
                  background: #f8f9fa;
                  border: 2px dashed #161524;
                  border-radius: 12px;
                  padding: 30px;
                  text-align: center;
                  margin: 30px 0;
                }
                .code { 
                  font-size: 46px;
                  font-weight: bold;
                  color: #0079db;
                  letter-spacing: 10px;
                  font-family: 'Sora', sans-serif;
                  text-shadow: 2px;
                }
                .info {
                  background: #e7f3ff;
                  border-left: 4px solid #2196F3;
                  padding: 15px;
                  margin: 20px 0;
                  border-radius: 4px;
                }
                .warning { 
                  background: #fff3cd;
                  border-left: 4px solid #ffc107;
                  padding: 15px;
                  margin: 20px 0;
                  border-radius: 4px;
                  color: #856404;
                }
                .footer {
                  background: #f8f9fa;
                  text-align: center;
                  padding: 20px;
                  color: #6c757d;
                  font-size: 14px;
                  border-top: 1px solid #e9ecef;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🗺 Código de Verificação</h1>
                </div>
                
                <div class="content">
                  <p>Olá!</p>
                  <p>Você solicitou acesso à sua conta no <strong>Reclamaí</strong>. Use o código abaixo para fazer login:</p>
                  
                  <div class="code-box">
                    <div class="code">${otp}</div>
                  </div>
                  
                  <div class="info">
                    <strong>⏰ Validade:</strong> Este código expira em <strong>${expirationMinutes} minutos</strong>
                  </div>
                  
                  <div class="warning">
                    <strong>⚠️ Importante:</strong> Nunca compartilhe este código com ninguém. Nossa equipe nunca pedirá este código por telefone ou email.
                  </div>
                  
                  <p>Se você não solicitou este código, ignore este email e sua conta permanecerá segura.</p>
                </div>
                
                <div class="footer">
                  <p>Este é um email automático. Por favor, não responda.</p>
                  <p>&copy; ${new Date().getFullYear()} Reclamaí - Todos os direitos reservados</p>
                </div>
              </div>
            </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);

      return {
        success: true,
        message: 'OTP enviado com sucesso',
      };
    } catch (error) {
      console.error('Erro ao enviar OTP:', error);
      return {
        success: false,
        message: 'Erro ao enviar email',
      };
    }
  }

async verifyOTP(email: string, code: string, allowValidated: boolean = false) {
  try {
    // Busca OTP mais recente
    const otp = await connection('otps')
      .where({ email })
      .orderBy('created_at', 'desc')
      .first();

    if (!otp) {
      return { valid: false, message: 'Código não encontrado. Solicite um novo código.' };
    }

    if (otp.validated && !allowValidated) {
      return { valid: false, message: 'Código já foi utilizado. Solicite um novo código.' };
    }

    if (new Date() > new Date(otp.expires_at)) {
      await connection('otps').where({ id: otp.id }).delete();
      return { valid: false, message: 'Código expirado. Solicite um novo código.' };
    }

    if (otp.attempts >= 3) {
      await connection('otps').where({ id: otp.id }).delete();
      return { valid: false, message: 'Muitas tentativas inválidas. Solicite um novo código.' };
    }

    if (otp.code !== code) {
      await connection('otps').where({ id: otp.id }).increment('attempts', 1);
      return { valid: false, message: `Código inválido. ${3 - (otp.attempts + 1)} tentativas restantes.` };
    }

    // ✅ Código válido - marca OTP como validado
    if (!otp.validated) {
      await connection('otps').where({ id: otp.id }).update({ validated: true });
    }

    // ✅ Marca o usuário como verificado
    await connection('users').where({ email }).update({ is_verified: 1 });

    return { valid: true, message: 'Código verificado com sucesso' };
  } catch (error) {
    console.error('Erro ao verificar OTP:', error);
    throw error;
  }
}

  async cleanExpiredOTPs() {
    try {
      const result = await connection('otps')
        .where('expires_at', '<', connection.fn.now())
        .delete();

      console.log(`🧹 ${result} OTPs expirados removidos`);
      return result;
    } catch (error) {
      console.error('Erro ao limpar OTPs:', error);
      throw error;
    }
  }
}

export default OTPService;