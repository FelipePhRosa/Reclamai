import { Request, Response } from "express";
import connection from "../connection";
import UserService from "../services/userService";
import bcrypt from "bcryptjs";
import { AuthRequest } from "../types/express";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

export default class UserController{
    constructor(private userService = new UserService()){}
    
    async createUser(req: Request, res: Response) {
        try{
            const { nameUser, fullName, email, password, role } = req.body

            const hashedPassword = await bcrypt.hash(password, 10);
            if (!nameUser || !fullName || !email || !password) {
                res.status(400).json( `Please complete all required fields.` )
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
                password_hash: hashedPassword,
                role: role ?? 5
            })
            res.status(201).json({ message: `User: ${fullName}, registered successfully`});
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
                res.status(404).json({ message: `User Not Found.`})
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

}