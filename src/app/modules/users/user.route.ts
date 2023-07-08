import { Router } from "express";
import { userController } from "./user.controller";


const router = Router();

router.post('/singup',userController.createUser);
router.get('/:id',userController.getSingleUser);
router.delete('/:id',userController.deleteUser);
router.get('/',userController.getAllUsers);

router.patch('/:id',userController.updateUser);



export default router;