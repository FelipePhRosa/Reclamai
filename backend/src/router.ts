import { RequestHandler } from 'express';
import { Router } from "express";
import multer from 'multer';
import ReportControllers from "./controllers/reportController";
import UserController from "./controllers/userController";
import AuthController from "./controllers/AuthController";
import { authenticate } from './services/authMiddleware';
import upload from './services/upload'

const router = Router();
const userController = new UserController();
const reportControllers = new ReportControllers();
const authController = new AuthController();
const uploadtemp = multer({ dest: 'uploads/' });

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

router.post('/register', userController.createUser.bind(userController));

router.post('/report/:userId', authenticate, uploadtemp.single('imagem'), reportControllers.createReport.bind(reportControllers));
router.post('/report/:reportId/like', authenticate, userController.userLiked.bind(userController))

router.post('/approveReport/:reportId', authenticate, reportControllers.approveReport.bind(reportControllers) as RequestHandler);
router.post('/declineReport/:reportId', authenticate, reportControllers.declineReport.bind(reportControllers) as RequestHandler);

router.post('/updateRole', authenticate, userController.updateRole.bind(userController));


router.get('/userList', userController.listAllUsers.bind(userController));
router.get('/userById', userController.listUserById.bind(userController));
router.get('/myreports', authenticate, reportControllers.getMyReports.bind(reportControllers));
router.get('/reportList', reportControllers.getAllReports.bind(reportControllers));

router.get('/report/:id', reportControllers.getReportById.bind(reportControllers));
router.get('/report/:id/like', authenticate, reportControllers.getLikeStatus.bind(reportControllers));
router.get('/report/:id/likes', reportControllers.getAllLikes.bind(reportControllers));
router.get('/reportPending', reportControllers.getAllReportsPending.bind(reportControllers));
router.get('/reportDecline', reportControllers.getAllReportsDecline.bind(reportControllers));
router.get('/likes/:reportId', reportControllers.getAllLikes.bind(reportControllers));

router.delete('/delUser', userController.deleteUser.bind(userController));
router.delete('/delReport', reportControllers.deleteReport.bind(reportControllers))

export default router;
    