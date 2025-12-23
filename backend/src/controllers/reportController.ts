import { Request, Response } from "express";
import connection from "../connection";
import ReportService from "../services/reportService";
import { AuthRequest } from "../types/express";
import CitiesService from "../services/citiesService";

export default class ReportControllers{
    constructor(
        private reportService = new ReportService(),
        private citiesService = new CitiesService()
    ){}

    async createReport(req: Request, res: Response) {
        const userId = Number(req.params.userId);

        if (isNaN(userId)) {
            res.status(400).json({ error: "userID is not valid." });
            return;
        }

        try{
            const { reportTitle, category_id, description, city_id, address, latitude, longitude } = req.body
            const image = req.file?.filename;
            const user = await connection('users').where({ id: userId }).first()

            if (!user){
                res.status(404).json({ error: `User not found.`});
                return;
            }

            await this.reportService.createReport({
                 reportTitle,
                 user_id: userId,
                 category_id,
                 city_id,
                 description,
                 address,
                 latitude,
                 longitude,
                 image 
                });
            res.status(201).json({ message: `${user.nameUser} create report: ${reportTitle}.` });
            return;

        } catch(error){
            res.status(500).json({ 
                message: `Error to create Report.`, 
                details: error})
            return;
        }
    }

    async approveReport(req: AuthRequest, res: Response){
        const reportId  = Number(req.params.reportId);
        const userId  = req.user?.id
        console.log("Report ID:", reportId);
        console.log("User ID from token:", userId);
        console.log("User Role: ", req.user?.role);

        if (isNaN(reportId) || !userId) {
            return res.status(400).json({ error: "Invalid reportId or userId." });
        }

        try{
            const user = await connection('users').where({ id: userId }).first()
            
            if(!user){
                return res.status(404).json({
                    message: `Admin user not found.`
                })
            }

            if(Number(user.role) !== 2 && Number(user.role) !== 1) {
                return res.status(403).json({
                    error: `Only Owner / Admins can approve reports.`
                })
            }

            const report = await connection('reports').where({ id: reportId }).first()
            
            if(!report){
                return res.status(404).json({
                    message: `Report not found.`
                })
            }

            if(report.status === 'aprovado'){
                return res.status(400).json({
                    error: `Report already approved.`
                });
            }

            await connection('reports')
                .where({ id: reportId })
                .update({
                    status: 'aprovado',
                    approved_by: userId
            });

            return res.status(200).json({
                message: `Report ${reportId} approved by ${user.nameUser}.`,
            });

        } catch(error){
            res.status(500).json({
                message: `Internal Server Error.`,
                details: error
            });
        }
    }

    async declineReport(req: AuthRequest, res: Response){
        const reportId = Number(req.params.reportId)
        const userId = req.user?.id
        

        if(isNaN(reportId) || !userId){
            return res.status(400).json({
                error: `Invalid ReportID or UserId.`
            })
        }

        try{
            const user = await connection('users').where({ id: userId }).first()

            if(!user){
                return res.status(404).json({
                    error: `Admin not found.`
                })
            }

            if(Number(user.role) !== 2 && Number(user.role) !== 1){
                return res.status(403).json({
                    error: `Only Owner / Admin can decline reports.`
                })
            }

            const report = await connection('reports').where({ id: reportId }).first()

            if(!report){
                return res.status(404).json({
                    error: `Report not found.`
                })
            }   

            if(report.status === 'aprovado'){
                return res.status(400).json({
                    message: `Report already approved.`
                })
            }

            await connection('reports').where({ id: reportId }).update({ status: 'rejeitado' , approved_by: userId  });

            return res.status(200).json({
                message: `Report ${reportId} declined by ${user.nome}`
            })
        } catch(error){
            res.status(500).json({
                message: `Internal Server Error.`,
                details: error
            });
        }
    }

    async getAllReportsDecline(req: Request, res: Response){
        try{
            const DeclineReports = await this.reportService.getAllReportsRejected();

            res.status(200).json({
                message: `All Reports Decline Informations: `,
                data: DeclineReports
            })
        } catch(error){
            res.status(500).json({
                message: `Internal Server Error`,
                details: error
            })
        }
    }

    async getAllReportsPending(req: Request, res: Response){
        try{
            const PendingReports = await this.reportService.getAllReportsPending();

            res.status(200).json({
                message: `All Reports Pending Informations: `,
                data: PendingReports
            });
        } catch(error){
            res.status(500).json({
                message: `Internal Server Error.`,
                details: error
            });
        }
    }

    async getAllReportsByCity(req: AuthRequest, res: Response){
        const user = Number(req.user?.id);
        const userRole = Number(req.user?.role);

        try{
            const { city_id, status } = req.body

            if(!user){
                res.status(404).json({
                    message: `Searcher not authenticated or not founded.`
                });
                return;
            }

            if(userRole > 2){
                res.status(403).json({
                    message: `You don't have permissions for that action.`
                });
                return;
            }

            const validStatuses = ['pendente', 'aprovado', 'rejeitado'];
            const statusFilter = status && validStatuses.includes(status) ? status : undefined;

            const reports = await this.reportService.getAllReportsByCity(city_id, statusFilter);

            const city = await this.citiesService.getCityById(city_id)

            res.status(200).json({
                message: `// All Informations for ${city.name}`,
                data: reports
            });

            return;

        } catch ( error ){
            res.status(500).json({
                message: `Internal Server Error - 500`,
                details: error
            });
            return;
        }
    }

    async getAllReports(req: Request, res: Response) {
        try{
            const AllReports = await this.reportService.getAllReports();
            
            res.status(200).json({ 
                message: `All Reports Informations: `,
                data: AllReports
            });

            return;
        } catch(error){
            res.status(500).json({ 
                message: `Internal Server Error. `, 
                details: error});
            return;
        }
    }
    
    async getLikeStatus(req: AuthRequest, res: Response): Promise<void> {
        const reportId = Number(req.params.id);
        const userId = Number(req.user?.id);

        if (!reportId || isNaN(reportId)) {
            res.status(400).json({ message: 'Report ID inválido.' });
            return;
        }

        try {
            const report = await this.reportService.getReportById(reportId, userId);
            if (!report) {
                res.status(404).json({ message: 'Report não encontrado.' });
                return;
            }

            res.json({
                liked: Boolean(report.likedByCurrentUser),
                totalLikes: Number(report.likes)
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno.' });
        }
    }

    async getAllLikes(req: Request, res: Response): Promise<void> {
        const reportId = Number(req.params.reportId)

        if (!reportId || isNaN(reportId)) {
            res.status(400).json({ message: 'Report ID inválido.' });
            return;
        }

        try{
            const result = await this.reportService.getAllLikes(reportId)
            const totalLikes = result[0].total;

            res.json({ total: Number(totalLikes)});
        } catch(error){
            console.error('Error to search likes. ', error);
            res.status(500).json({
                message: `Error Internal Server.`
            });
        }
    }

    async getReportById(req: AuthRequest, res: Response) {
        const { id } = req.params; // <-- mudança aqui, pega de params ao invés de body
        const user = req.user
        const userId = req.user?.id;

        console.log('=== DEBUG GET REPORT BY ID ===');
        console.log('Report ID:', id);
        console.log('User ID:', userId);

        if (isNaN(Number(id))) {
            res.status(400).json({ error: "id must be a valid number." });
            return;
        }

        try {
            const report = await this.reportService.getReportById(Number(id));
            
            console.log('Report result:', {
            id: report?.id,
            likes: report?.likes,
            likedByCurrentUser: report?.likedByCurrentUser
        });

            res.status(200).json({ 
                message: `Informations for Report {${id}}`,
                reportInf: report 
            });
        } catch (error) {
            res.status(500).json({ 
                message: `Error Internal Server.`,
                details: error 
            });
        }
    }

    async deleteReport(req: Request, res: Response) {
        try{
            const { reportId } = req.body

            if (isNaN(reportId)) {
                res.status(400).json({ error: "reportId must be a valid number." });
                return;
            }
            const report = await this.reportService.getReportById(reportId);
            
            if(!report){
                res.status(404).json({ error: `Report not found.`});
                return;
            }

            await this.reportService.deleteReport(reportId);

            res.status(200).json({ 
                message: `${report.reportTitle} was deleted successfully!`,
                deletedReport: report });
            
            return;

        } catch(error){
            res.status(500).json({ 
                message: `Error Internal Server.`, 
                details: error });
            return;
        }
    }

    async getMyReports(req: AuthRequest, res: Response){
        const userId = req.user?.id;

        if (!userId){
            res.status(401).json({ error: 'User not found.' });
            return;
        }
    
        try{
            const userReports = await this.reportService.getMyReports(userId);

            res.status(200).json({
                message: `All reports created by ${req.user?.fullName} user.`,
                data: userReports,
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error (500)',
                details: error
            });
            return;
        }
    }

    async getReportsByCity(req: Request, res: Response){
        const city_id = req.body

        if(!city_id){
            res.status(404).json({
                message: 'City not found.'
            });
            return;
        }

        try{
            const reportsFiltred = await this.reportService.getReportsByCity(city_id);
            res.status(200).json({
                message: `Todos reports da cidade ${city_id}`,
                details: reportsFiltred
            })
        } catch(error){
            res.status(500).json({
                message: 'Internal Server Error (500)',
                details: error
            })
        }
    }
}