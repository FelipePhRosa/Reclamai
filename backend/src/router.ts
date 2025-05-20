import { RequestHandler } from 'express';
import { Router } from "express";
import ReportControllers from "./controllers/reportController";
import UserController from "./controllers/userController";
import AuthController from "./controllers/AuthController";
import { authenticate } from './Services/authMiddleware';

const router = Router();
const userController = new UserController();
const reportControllers = new ReportControllers();
const authController = new AuthController();

router.get('/', async (req, res) => {
    res.json({ 
        message: "Welcome to the LocalTED API!",
            routes: {

                users: {
                    create: "POST /user",
                    list: "GET /userList",
                    byId: "GET /userById",
                    delete: "DELETE /delUser (auth required)"
                },
                reports: {
                    create: "POST /report/:userId",
                    list: "GET /reportList",
                    byId: "GET /reportById",
                    delete: "DELETE /delReport"
                },
                auth: {
                    login: "POST /login"
                },

            }
        }
    );    
});

router.post('/login', authController.login.bind(authController));

router.post('/user', userController.createUser.bind(userController));
router.post('/report/:userId', authenticate, reportControllers.createReport.bind(reportControllers));

router.post('/approveReport/:reportId', authenticate, reportControllers.approveReport.bind(reportControllers) as RequestHandler);
router.post('/declineReport/:reportId', authenticate, reportControllers.declineReport.bind(reportControllers) as RequestHandler);

router.get('/userList', userController.listAllUsers.bind(userController));
router.get('/userById', userController.listUserById.bind(userController));
router.get('/reportList', reportControllers.getAllReports.bind(reportControllers));
router.get('/reportById', reportControllers.getReportById.bind(reportControllers));
router.get('/reportPending', reportControllers.getAllReportsPending.bind(reportControllers));
router.get('/reportDecline', reportControllers.getAllReportsDecline.bind(reportControllers));

router.delete('/delUser', userController.deleteUser.bind(userController));
router.delete('/delReport', reportControllers.deleteReport.bind(reportControllers))

export default router;
    