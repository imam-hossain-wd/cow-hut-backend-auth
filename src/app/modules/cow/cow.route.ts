import { Router } from "express";
import { cowController } from "./cow.controller";


const router = Router();

router.post('/create-cow', cowController.createCow);
router.get('/', cowController.getAllCows);
router.patch('/update/:id', cowController.updateCow);
router.get('/:id', cowController.getCowById);
router.delete('/:id', cowController.deleteCow);

export default router;