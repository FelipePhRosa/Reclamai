import { RequestHandler } from 'express';
import { Router } from "express";
import multer from 'multer';
import ReportControllers from "./controllers/reportController";
import UserController from "./controllers/userController";
import AuthController from "./controllers/AuthController";
import CitiesControllers from './controllers/citiesController';
import neighborhoodsControllers from './controllers/neighborhoodsController';
import { authenticate } from './services/authMiddleware';
import upload from './services/upload'

const router = Router();
const userController = new UserController();
const reportControllers = new ReportControllers();
const citiesControllers = new CitiesControllers();
const neighborHoodsControllers = new neighborhoodsControllers();
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

router.post('/login', authController.login.bind(authController) as unknown as RequestHandler);
router.post('/loginMidia', authController.socialLogin.bind(authController) as unknown as RequestHandler);
router.get("/auth/google/callback", authController.googleCallback.bind(authController) as unknown as RequestHandler); 
router.post('/register', userController.createUser.bind(userController));

router.post('/report/:userId', authenticate, uploadtemp.single('imagem'), reportControllers.createReport.bind(reportControllers));
router.post('/report/:reportId/like', authenticate, userController.userLiked.bind(userController))

router.post('/approveReport/:reportId', authenticate, reportControllers.approveReport.bind(reportControllers) as RequestHandler);
router.post('/declineReport/:reportId', authenticate, reportControllers.declineReport.bind(reportControllers) as RequestHandler);

router.post('/cr_city', authenticate, citiesControllers.createCity.bind(citiesControllers));
router.post('/cr_neighborhood', authenticate, neighborHoodsControllers.createNeighborhood.bind(neighborHoodsControllers));

router.post('/updateRole', authenticate, userController.updateRole.bind(userController));

router.put('/api/user/update', authenticate, upload.single("avatar"), userController.updateUserInfo.bind(userController));

router.post('/auth/login-otp', userController.verifyLoginOTP.bind(userController));
router.post('/auth/verify-otp', userController.verifyOTPOnly.bind(userController));
router.post('/auth/resend-otp', userController.resendOTP.bind(userController));
router.post('/resetpass', userController.resetPassword.bind(userController));

router.get('/dashboard', authenticate, citiesControllers.dashboardByCity.bind(citiesControllers));
router.get('/dashboardNeighbordoor', neighborHoodsControllers.dashboardNeighborhood.bind(neighborHoodsControllers));


router.get('/userList', userController.listAllUsers.bind(userController));
router.get('/userById', userController.listUserById.bind(userController));
router.get('/myreports', authenticate, reportControllers.getMyReports.bind(reportControllers));
router.get('/reportList', reportControllers.getAllReports.bind(reportControllers));
router.get('/neighborhoodById', authenticate, neighborHoodsControllers.getNeighborhoods.bind(neighborHoodsControllers));
router.get('/cityById', authenticate, citiesControllers.getCityById.bind(citiesControllers));
router.get('/allCities', citiesControllers.getAllCities.bind(citiesControllers));
router.get('/allNeighborhoods', neighborHoodsControllers.getAllNeighborhoods.bind(neighborHoodsControllers));
router.get('/reportsByCity', authenticate, reportControllers.getAllReportsByCity.bind(reportControllers));
router.get('/report/:id', reportControllers.getReportById.bind(reportControllers));
router.get('/report/:id/like', authenticate, reportControllers.getLikeStatus.bind(reportControllers));
router.get('/report/:id/likes', reportControllers.getAllLikes.bind(reportControllers));
router.get('/reportPending', reportControllers.getAllReportsPending.bind(reportControllers));
router.get('/reportDecline', reportControllers.getAllReportsDecline.bind(reportControllers));
router.get('/likes/:reportId', reportControllers.getAllLikes.bind(reportControllers));

router.delete('/delUser', userController.deleteUser.bind(userController));
router.delete('/delCity', authenticate, citiesControllers.deleteCity.bind(citiesControllers));
router.delete('/delNeighborhood', authenticate, neighborHoodsControllers.delNeighborhood.bind(neighborHoodsControllers));
router.delete('/delReport', reportControllers.deleteReport.bind(reportControllers));

export default router;
    