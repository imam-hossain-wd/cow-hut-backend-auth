import { Router } from "express";
import { userController } from "./user.controller";

import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";


const router = Router();
  
router.post('/singup',userController.createUser);
router.get('/:id',userController.getSingleUser);

router.delete('/:id', userController.deleteUser);
router.get('/',userController.getAllUsers);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), userController.getAllUsers);
router.patch('/:id',userController.updateUser);



export default router;