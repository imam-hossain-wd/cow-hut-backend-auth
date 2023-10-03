"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const order_model_1 = __importDefault(require("./order.model"));
//: Promise<IOrder>
const createOrder = async (
// cowId: Types.ObjectId,
// buyerId: Types.ObjectId
cowId, buyerId) => {
    console.log(cowId, buyerId);
    const cow = await cow_model_1.default.findById(cowId);
    console.log(cow);
    // const cow = await Cow.findById({_id:cowId});
    // console.log(cow);
    // const buyer = await User.findById(buyerId);
    // const seller = await User.findById(cow?.seller);
    // if (!cow) {
    //   throw new Error('Cow not found');
    // }
    // if (!buyer) {
    //   throw new Error('Buyer not found');
    // }
    // if (buyer.budget < cow.price) {
    //   throw new Error("Can't Buy! Insufficient budget")
    // }
    //   console.log(buyer.budget, 'buyer budget');
    //   console.log(cow.price, 'cow price');
    //   console.log(buyer.budget -= cow.price, 'reaming budget balance');
    //  if(seller){
    //   console.log('seller income', seller.income += cow.price);
    //  }
    // cow.label = Label.SoldOut;
    // await cow.save();
    // buyer.budget -= cow.price;
    // await buyer.save();
    // if (seller) {
    //   seller.income += cow.price;
    //   await seller.save();
    // }
    // const order: IOrder = await Order.create({ cow: cowId, buyer: buyerId });
    // return order;
    //   const session = await Order.startSession();
    //   session.startTransaction();
    //   try {
    // cow.label = Label.SoldOut;
    // await cow.save();
    // buyer.budget -= cow.price;
    // await buyer.save();
    // const seller = await User.findById(cow.seller);
    // console.log(seller, 'seller');
    // if (seller) {
    //   seller.income += cow.price;
    //   await seller.save();
    // }
    // const order: IOrder = await Order.create({ cow: cowId, buyer: buyerId });
    // console.log(order, 'order');
    //     await session.commitTransaction();
    //     session.endSession();
    //     return order;
    //   } catch (error) {
    //     await session.abortTransaction();
    //     session.endSession();
    //     throw error;
    //   }
};
const getOrders = async () => {
    const orders = await order_model_1.default.find({});
    return orders;
};
exports.orderService = {
    createOrder,
    getOrders
};
