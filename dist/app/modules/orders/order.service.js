"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const user_model_1 = require("../users/user.model");
const order_model_1 = __importDefault(require("./order.model"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const cow_interface_1 = require("../cow/cow.interface");
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const createOrder = async (orderData) => {
    const { cow: cowId, buyer: buyerId } = orderData;
    const buyer = await user_model_1.User.findById(buyerId);
    const cow = await cow_model_1.default.findById(cowId);
    if (!cow) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow not found');
    }
    if (!buyer) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Buyer not found');
    }
    if (buyer.budget < cow.price) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Can't Buy! Insufficient budget");
    }
    const session = await order_model_1.default.startSession();
    session.startTransaction();
    try {
        cow.label = cow_interface_1.Label.SoldOut;
        await cow.save();
        buyer.budget -= cow.price;
        await buyer.save();
        const seller = await user_model_1.User.findById(cow.seller);
        console.log(seller, 'seller');
        if (seller) {
            seller.income += cow.price;
            await seller.save();
        }
        const order = await order_model_1.default.create({ cow: cowId, buyer: buyerId });
        console.log(order, 'order');
        await session.commitTransaction();
        session.endSession();
        return order;
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getOrders = async (token) => {
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (user.role === 'admin') {
        const orders = await order_model_1.default.find({});
        return orders;
    }
    else if (user.role === 'buyer') {
        const orders = await order_model_1.default.find({
            buyer: user._id,
        });
        return orders;
    }
    else if (user.role === 'seller') {
        const cows = await cow_model_1.default.find({ seller: user._id });
        const cowIds = cows.map(cow => cow._id);
        const orders = await order_model_1.default.find({ cow: { $in: cowIds } });
        return orders;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
};
const getSingleOrder = async (id, token) => {
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (user.role === 'admin') {
        const order = await order_model_1.default.findOne({ _id: id });
        return order;
    }
    else if (user.role === 'buyer') {
        const orders = await order_model_1.default.find({
            buyer: user._id,
        });
        const matchingOrder = orders.find(order => order._id.toString() === id.toString());
        if (matchingOrder) {
            return matchingOrder;
        }
        else {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
        }
    }
    else if (user.role === 'seller') {
        const cows = await cow_model_1.default.find({ seller: user._id });
        const cowIds = cows.map(cow => cow._id);
        const orders = await order_model_1.default.find({ cow: { $in: cowIds } });
        const matchingOrder = orders.find(order => order._id.toString() === id.toString());
        if (matchingOrder) {
            return matchingOrder;
        }
        else {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
        }
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'order not found');
    }
};
exports.orderService = {
    createOrder,
    getOrders,
    getSingleOrder,
};
