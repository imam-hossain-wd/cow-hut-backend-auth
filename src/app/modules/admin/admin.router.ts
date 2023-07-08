import { Router } from "express";

const router = Router();

router.post('/',AdminController.createAdmin);
  

export const AdminRoutes = router;