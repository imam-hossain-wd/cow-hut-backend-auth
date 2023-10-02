import { Router } from "express";
import { userController } from "./user.controller";

import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";


const router = Router();
  
router.get('/:id',auth(ENUM_USER_ROLE.ADMIN),userController.getSingleUser);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), userController.deleteUser);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), userController.getAllUsers);
router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN),userController.updateUser);



export default router;