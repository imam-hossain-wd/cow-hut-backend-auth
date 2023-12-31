import { Router } from "express";
import { ordersController } from "./order.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";


const router = Router();

router.post('/',
auth(ENUM_USER_ROLE.BUYER),
 ordersController.createOrder);

router.get('/',
auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
 ordersController.getAllOrders);

 router.get('/:id', ordersController.getSingleOrder)


export default router;