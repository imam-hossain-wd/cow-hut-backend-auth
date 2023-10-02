import { Router } from "express";
import { cowController } from "./cow.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";


const router = Router();

router.post('/',auth(ENUM_USER_ROLE.SELLER), cowController.createCow);
router.get('/',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER), cowController.getAllCows);
router.patch('/update/:id',auth(ENUM_USER_ROLE.SELLER), cowController.updateCow);
router.get('/:id',auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER), cowController.getCowById);
router.delete('/:id',auth(ENUM_USER_ROLE.SELLER), cowController.deleteCow);

export default router;