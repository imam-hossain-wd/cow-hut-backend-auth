"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)(async (req, res) => {
    const order = req.body;
    const newOrder = await order_service_1.orderService.createOrder(order);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Order placed successfully.',
        data: newOrder,
    });
});
const getAllOrders = (0, catchAsync_1.default)(async (req, res) => {
    const token = req.headers.authorization;
    const newOrder = await order_service_1.orderService.getOrders(token);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Orders retrieved successfully',
        data: newOrder,
    });
});
const getSingleOrder = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization;
    const result = await order_service_1.orderService.getSingleOrder(id, token);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order information retrieved successfully",
        data: result
    });
});
exports.ordersController = {
    createOrder,
    getAllOrders,
    getSingleOrder
};
