import connection from "../connection"

interface ReportData{
    reportTitle: string,
    user_id: number,
    category_id: number,
    description: string,
    address: string,
    latitude: number,
    longitude: number,
    image?: string
}

export default class ReportService {
    async createReport(reportData: ReportData) {
        return await connection('reports').insert(reportData);
    }

    async getAllReports(userId?: number) {
      const reports = await connection('reports')
        .where({ status: 'aprovado' })
        .select(
          'reports.*',
          // Subquery: total de likes
          connection('likes')
            .count('*')
            .whereRaw('likes.report_id = reports.id')
            .as('likes'),

          // Subquery: se o usuário curtiu
          connection.raw(
            `(SELECT EXISTS (
                SELECT 1 FROM likes 
                WHERE likes.report_id = reports.id AND likes.user_id = ?
            )) as likedByCurrentUser`,
            [userId ?? 0]
          )
        )
        .orderBy('created_at', 'desc');

      return reports;
    }

    async getReportById(reportId: number, userId?: number) {
        const report = await connection('reports')
            .where({ id: reportId })
            .select(
                'reports.*',
                // Total de likes
                connection('likes')
                    .count('*')
                    .whereRaw('likes.report_id = reports.id')
                    .as('likes'),

                // Se o usuário curtiu
                connection.raw(
                    `(SELECT EXISTS (
                        SELECT 1 FROM likes 
                        WHERE likes.report_id = reports.id AND likes.user_id = ?
                    )) as likedByCurrentUser`,
                    [userId ?? 0]
                )
            )
            .first(); // retorna um único registro

        return report;
    }

    async getAllReportsPending(){
        return await connection('reports').where({ status: 'pendente' }).select('*');
    }

    async getAllReportsRejected(){
        return await connection('reports').where({ status: 'rejeitado' }).select('*')
    }

    async deleteReport(reportId: number){
        return await connection('reports').where({ id: reportId }).delete();
    }

    async getAllLikes(reportId: number){
        return await connection('likes').where({ report_id: reportId }).count('* as total');
    }

    async getMyReports(user_id: number){
      return await connection('reports').where({ user_id }).orderBy('created_at', 'desc');
    }
}