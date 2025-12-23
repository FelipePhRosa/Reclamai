import { Request, Response } from "express"
import router from "../router"
import connection from "../connection"

interface UserData{
    nameUser: string,
    fullName: string,
    email: string,
    birth_date: string,
    password_hash: string,
    telefone: string,
    cpf: string,
    city_id: number,
    role: number,
    avatar_url: string,
    is_verified: number
}

interface UpdateUserInfoDTO{
    fullName?: string,
    email?: string,
    avatar_url?: string, 
    telefone?: string, 
    password_hash?: string,
    cpf?: string, 
}

export default class UserService {
    async createUser(userData: UserData){
        return await connection('users').insert(userData)
    }

    async getUserById(userId: number){
        return await connection('users').where({ id: userId }).select('*').first();
    }

    async getUserByName(fullName: string){
        return await connection('users').where({ fullName: fullName }).select('*').first();
    }

    async getAllUsers(){
        return await connection('users').select('*');
    }

    async deleteUser(userId: number){
        return await connection('users').where({ id: userId }).delete();
    }

    async userLiked(userId: number, reportId: number){
        return await connection('likes').insert({ user_id: userId, report_id: reportId });
    }

    async userUnlike(userId: number, reportId: number){
        return await connection('likes').where({ user_id: userId, report_id: reportId }).delete();
    }

    async getUsersWithReportStats() {
        return await connection('users as u')
            .leftJoin('reports as r', 'u.id', 'r.user_id')
            .select(
            'u.id',
            'u.nameUser',
            'u.email',
            connection.raw('COUNT(r.id) as totalReports'),
            connection.raw(`SUM(CASE WHEN r.status = 'aprovado' THEN 1 ELSE 0 END) as aprovados`),
            connection.raw(`SUM(CASE WHEN r.status = 'rejeitado' THEN 1 ELSE 0 END) as rejeitados`),
            connection.raw(`SUM(CASE WHEN r.status = 'pendente' THEN 1 ELSE 0 END) as pendentes`)
            )
            .groupBy('u.id');
    }

    async updateRole(userId: number, newRole: number){
        return await connection('users').where({ id: userId }).update({ role: newRole });
    }

    async updateUserInfo(userId: number, updateData: UpdateUserInfoDTO) {
        return await connection('users').where({ id: userId }).update(updateData);
    } 

}
