import { Router } from "express";
import { ordersController } from "./order.controller";

const router = Router();

router.post('/', ordersController.createOrder);
router.get('/', ordersController.getAllOrders)


export default router;