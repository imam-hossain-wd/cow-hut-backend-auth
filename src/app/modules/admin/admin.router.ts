import { Router } from "express";
import { AdminController } from "./admin.controller";

const router = Router();


router.post('/create-admin',AdminController.createAdmin);
router.post('/login',AdminController.login);
router.post('/refresh-token',AdminController.refreshToken);
router.get('/my-profile',AdminController.getAdminProfile);
router.patch('/my-profile',AdminController.updateAdminProfile);

export default router;