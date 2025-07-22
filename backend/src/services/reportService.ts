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
        );

      return reports;
    }


    async getAllReportsPending(){
        return await connection('reports').where({ status: 'pendente' }).select('*');
    }

    async getAllReportsRejected(){
        return await connection('reports').where({ status: 'rejeitado' }).select('*')
    }

    async getReportById(reportId: number){
        return await connection('reports').where({ id: reportId }).select('*').first();
    }

    async deleteReport(reportId: number){
        return await connection('reports').where({ id: reportId }).delete();
    }

    async getAllLikes(reportId: number){
        return await connection('likes').where({ report_id: reportId }).count('* as total');
    }
}