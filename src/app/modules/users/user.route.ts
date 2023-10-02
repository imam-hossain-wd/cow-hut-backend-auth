import { Router } from "express";
import { userController } from "./user.controller";

import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";


const router = Router();
router.get('/',
auth(ENUM_USER_ROLE.ADMIN),
userController.getAllUsers)

router.get('/profile', userController.getProfile)
router.get('/:id',
auth(ENUM_USER_ROLE.ADMIN),
userController.getSingleUser);

router.patch('/:id',
auth(ENUM_USER_ROLE.ADMIN),
userController.updateUser);

router.delete('/:id',
auth(ENUM_USER_ROLE.ADMIN),
 userController.deleteUser);


export default router;