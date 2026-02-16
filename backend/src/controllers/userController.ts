import { Request, Response } from "express";
import connection from "../connection";
import UserService from "../services/userService";
import bcrypt from "bcryptjs";
import { AuthRequest } from "../types/express";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import OTPService from "../services/otpService";
import AuthService from "../services/authService";
import validatePassword from "../errors/validatePassword";

interface UpdateUserInfoDTO{
    fullName?: string,
    email?: string,
    avatar?: string
}

export default class UserController{
    constructor(
        private userService = new UserService(),
        private otpService = new OTPService(),
        private authService = new AuthService()){}
    
    async createUser(req: Request, res: Response) {
        try{
            console.log("REQ.BODY =>", req.body);
            const { nameUser, fullName, email, birth_date, city_id, neighborhood_id, password, role, avatar_url, telefone, cpf, is_verified } = req.body

            const hashedPassword = await bcrypt.hash(password, 10);
            if (!nameUser || !fullName || !email || !password || !birth_date || !city_id || !neighborhood_id || !cpf || !telefone || !city_id) {
                res.status(400).json({
                    message: `Please complete all required fields.`
                });
                return;
            }

            const birthDateObj = new Date(birth_date);
            const today = new Date();
            let age = today.getFullYear() - birthDateObj.getFullYear();
            const monthDiff = today.getMonth() - birthDateObj.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
                    age--;
                }
                if (age < 18) {
                    res.status(400).json({ message: "You must be at least 18 years old." });
                    return;
                }

            const userAlreadyExists = await connection('users').where({ email })

            if (userAlreadyExists.length > 0) {
                res.status(409).json({ message: `Email already register another account.` });
                return;
            };

            const user = await this.userService.createUser({
                nameUser,
                fullName,
                email,
                birth_date,
                telefone, 
                cpf,
                city_id,
                neighborhood_id,
                password_hash: hashedPassword,
                role: role ?? 5,
                avatar_url,
                is_verified: Number(is_verified) === 1 ? 1 : 0
            })
            res.status(201).json({ 
                message: `User: ${fullName}, registered successfully`
            });
            return;

        } catch (error) {
            console.error("Erro no createUser:", error);
            res.status(500).json({
                message: "Error to insert new User.",
                details: error instanceof Error ? error.message : error,
            });
            return;
        }
    }

    async resetPassword(req: Request, res: Response){
        try{
            const { email, code, newPassword } = req.body
                if(!email || !code || !newPassword){
                    res.status(400).json({
                        message: `Please complete all required fields.`
                    });
                    return;
                };
            
            const passwordValidation = validatePassword(newPassword);
                if (!passwordValidation.valid) {
                    res.status(400).json({
                        message: passwordValidation.message,
                    });
                    return;
                }

            const user = await connection('users').where({ email: email }).first();
                if(!user){
                    res.status(404).json({
                        message: `User not found.`
                    });
                    return;
                };
            
            // Busca OTP mais recente com esse email e código
            const otp = await connection('otps')
                .where({ email, code })
                .orderBy('created_at', 'desc')
                .first();

            if (!otp){
                res.status(404).json({
                    message: 'Código não encontrado. Solicite um novo código.'
                });
                return;
            }

            // Verifica se o OTP foi validado (precisa ter sido verificado antes)
            if (!otp.validated) {
                res.status(400).json({
                    message: 'Código não foi verificado. Verifique o código primeiro na etapa anterior.'
                });
                return;
            }

            // Verifica expiração
            if (new Date() > new Date(otp.expires_at)) {
                await connection('otps').where({ id: otp.id }).delete();
                res.status(400).json({
                    message: 'Código expirado. Solicite um novo código.'
                });
                return;
            }
            
            const saltRounds = 10;
            const password_hash = await bcrypt.hash(newPassword, saltRounds);

            // Atualiza a senha
            await connection('users').where({ email: email }).update({ 
                password_hash, 
                last_login: null
            });
            
            // Remove o OTP após a senha ser alterada com sucesso
            await connection('otps').where({ id: otp.id }).delete();
            
            res.status(200).json({
                success: true,
                message: `Senha alterada com sucesso.`
            });
            return;
        } catch( error ){
            console.error('Erro ao resetar a senha: ', error)
            res.status(500).json({
                success: false,
                message: `Internal Server Error`
            });
            return;
        }
    }

    async listAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUsers()
            const stats = await this.userService.getUsersWithReportStats()
            
            const usersWithStats = users.map(user => {
            
            const userStats = stats.find(stat => stat.id === user.id)
            return {
                ...user,
                totalReports: userStats?.totalReports || 0,
                aprovados: userStats?.aprovados || 0,
                rejeitados: userStats?.rejeitados || 0,
                pendentes: userStats?.pendentes || 0
            }
            })

            res.status(200).json({ 
            message: `/// List for All Users - Reclamaí |||`, 
            data: usersWithStats
            })
        } catch(error) {
            res.status(500).json({ 
                message:`Internal Server Error.`, 
                details: error });
            return;
        }
    }

    async listUserById (req: Request, res: Response) {
        const { userId } = req.body
        try {
            const user = await this.userService.getUserById(userId)
            if (!user){
                res.status(404).json({ message: `User Not Found.`});
                return;
            }
            res.status(200).json({ 
                message: `// ${user?.nameUser} - Informations. `,
                userInf: user });
            return;
        } catch(error) {
            res.status(500).json({ 
                message: `Error to Search User.`,
                details: error });
            return;
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { userId } = req.body

        if (isNaN(userId)) {
            res.status(400).json({ error: "userId must be a valid number." });
            return;
        }
        try {
            const user = await this.userService.getUserById(userId)

            await this.userService.deleteUser(userId)
            res.status(200).json({ 
                message: `${user.nome} was deleted successfully!`,
                deleteuser: user });
            return;
        } catch(error) {
            res.status(500).json({ 
                message: `Error to delete user.`,
                details: error});
            return;
        }
    }
    
    async userLiked(req: AuthRequest, res: Response): Promise<void> {
        const reportId = Number(req.params.reportId);
        const userId = Number(req.user?.id);

        if (!userId) {
            res.status(401).json({
                message: `Unauthenticated user.`
            });
            return;
        }

        if (!reportId || isNaN(reportId)) {
            res.status(400).json({
                message: `Report ID inválido.`
            });
            return;
        }

        try {
            const existing = await connection('likes')
                .where({ user_id: userId, report_id: reportId });

            if (existing.length > 0) {
                await this.userService.userUnlike(userId, reportId);
            } else {
                await this.userService.userLiked(userId, reportId);
            }

            const [{ count }] = await connection('likes')
                .where({ report_id: reportId })
                .count('id as count');

            res.json({ 
                liked: existing.length === 0,
                totalLikes: Number(count) 
            });
            return;

        } catch (error) {
            console.error('Error to like.', error);

            if (!res.headersSent) {
                res.status(500).json({
                    message: `Error to Like report`,
                    details: error
                });
            } else {
                console.warn('Resposta já foi enviada, não é possível retornar erro novamente.');
            }
            return;
        }
    }

    async updateRole(req: AuthRequest, res: Response){
        try {
            const { userId, newRole } = req.body
            const requester = req.user;
            
            if(!requester){
                res.status(401).json({
                    message: `User not authenticated.`
                });
                return;
            }

            if(Number(requester.role) !== 1 && Number(requester.role) !== 2){
                res.status(403).json({
                    message: `You don't have permission for this action.`
                });
                return;
            }

            if (!userId || isNaN(userId) || !newRole) {
                res.status(400).json({ 
                    message: "Parameters Invalid. Send new parameters value." 
                });
                return;
            }
            const user = await this.userService.getUserById(userId);

            if(!user){
                res.status(404).json({
                    message: `User not found. Send new parameters value.`
                })
                return;
            }

            if(Number(requester.role) == Number(user.role)){
                res.status(403).json({
                    message: `You can't change role that user because you have same role.`
                })
                return;
            }

            if(Number(requester.role) > Number(user.role)){
                res.status(403).json({
                    message: `You don't have permissions for that action. Saving Log.`
                })
            }

            await this.userService.updateRole(userId, newRole);

            res.status(200).json({
                message: `Role for ${user.fullName} was updated to ${newRole}.`
            });

        } catch(error){
            console.error("Error to update new role:", error);
            res.status(500).json({
                message: `Error to update new role.`,
                details: error instanceof Error ? error.message : error
            });
            return;
        }
    }

    async updateUserInfo(req: AuthRequest, res: Response) {
        const userId = Number(req.user?.id);

        if (!userId) {
            res.status(401).json({ message: `User not authenticated.` });
            return;
        }

        try {
            const { fullName, email, telefone, cpf } = req.body;

            const updateData: any = {};
            if (fullName) updateData.fullName = fullName;
            if (email) updateData.email = email;
            if (telefone) updateData.telefone = telefone;
            if (cpf) updateData.cpf = cpf;

            const image = req.file?.filename;
            if (image) updateData.avatar_url = image;

            if (Object.keys(updateData).length === 0) {
                res.status(400).json({ message: 'No data provided for update.' });
                return;
            }

            if (email) {
                const existingUser = await connection('users')
                    .where({ email })
                    .whereNot({ id: userId })
                    .first();
                if (existingUser) throw new Error('EMAIL_ALREADY_IN_USE');

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) throw new Error('INVALID_EMAIL_FORMAT');
            }

            if (cpf && !cpfValidator.isValid(cpf)) throw new Error('INVALID_CPF');

            await this.userService.updateUserInfo(userId, updateData);

            const updatedUser = await connection('users')
                .where({ id: userId })
                .select('id', 'fullName', 'email', 'avatar_url', 'telefone', 'cpf', 'created_at')
                .first();

            if (!updatedUser) throw new Error('USER_NOT_FOUND');

            res.status(200).json({
                message: `User updated successfully!`,
                data: updatedUser
            });

        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(500).json({
                message: "Internal Server Error",
                details: error instanceof Error ? error.message : error,
            });
        }
    }

    async verifyLoginOTP(req: Request, res: Response) {
        try {
            const { email, code } = req.body;

            if (!email || !code) {
                res.status(400).json({ message: "Email and code are required." });
                return;
            }

            const otpResult = await this.otpService.verifyOTP(email, code);
            if (!otpResult.valid) {
                res.status(401).json({ message: otpResult.message });
                return;
            }

            // Busca usuário
            const user = await connection("users")
            .where({ email })
            .select(
                "id",
                "nameUser",
                "fullName",
                "email",
                "role",
                "avatar_url",
                "telefone",
                "cpf",
                "is_verified"
            )
            .first();

            if (!user) {
                res.status(404).json({ message: "User not found." });
                return;
            }

            if (user.is_verified == 0){
                await connection("users").where({ id: user.id }).update({ is_verified: 1 });
            }
            
            const token = this.authService.generateToken({
                userId: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                avatar_url: user.avatar_url,
                telefone: user.telefone,
                city_id: user.city_id,
                neighborhood_id: user.neighborhood_id
            });
            
            await connection('otps').where({ email, code }).delete()

            res.status(200).json({
            message: "Login successful via OTP!",
            user: {
                id: user.id,
                nameUser: user.nameUser,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                avatar_url: user.avatar_url,
                telefone: user.telefone,
                city_id: user.city_id,
                neighborhood_id: user.neighborhood_id,
                cpf: user.cpf,
                is_verified: 1,
            },
            token,
            });
            return;
        } catch (error) {
            console.error("Error in verifyLoginOTP:", error);
            res.status(500).json({
            message: "Internal server error.",
            details: error instanceof Error ? error.message : error,
            });
            return;
        }
    }

    async verifyOTPOnly(req: Request, res: Response) {
        try {
            const { email, code } = req.body;

            if (!email || !code) {
                res.status(400).json({ message: "Email e código são obrigatórios." });
                return;
            }

            // Apenas verifica o OTP, sem excluir
            const otpResult = await this.otpService.verifyOTP(email, code);
            
            if (!otpResult.valid) {
                res.status(401).json({ message: otpResult.message });
                return;
            }

            res.status(200).json({
                message: "Código verificado com sucesso!",
                valid: true
            });
            return;

        } catch (error) {
            console.error("Erro ao verificar OTP:", error);
            res.status(500).json({
                message: "Erro interno do servidor.",
                details: error,
            });
            return;
        }
    }

    async resendOTP(req: Request, res: Response) {
        try {
            const { email } = req.body;

            if (!email) {
                res.status(400).json({ 
                    message: 'Email is required.' 
                });
                return;
            }

            // Verifica se usuário existe
            const user = await connection('users')
                .where({ email })
                .first();

            if (!user) {
                res.status(404).json({ 
                    message: 'User not found.' 
                });
                return;
            }

            // Envia novo OTP
            const result = await this.otpService.sendOTPEmail(email);

            if (!result.success) {
                res.status(500).json({ 
                    message: 'Failed to resend verification code.' 
                });
                return;
            }

            res.status(200).json({
                message: 'Verification code resent successfully.'
            });
            return;

        } catch (error) {
            res.status(500).json({
                message: 'Internal server error.',
                details: error
            });
            return;
        }
    }

    

}

