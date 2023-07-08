
import Cow from "../cow/cow.model";
import { User } from "../users/user.model";
import { Types } from "mongoose";
import Order from './order.model';
import { Label } from '../cow/cow.interface';
import IOrder from './order.interface';

//: Promise<IOrder>

const createOrder = async (
  cowId: Types.ObjectId,
  buyerId: Types.ObjectId
) => {  
    const cow = await Cow.findById(cowId);
    const buyer = await User.findById(buyerId);
  
    if (!cow) {
      throw new Error('Cow not found');
    }
    if (!buyer) {
      throw new Error('Buyer not found');
    }
    if (buyer.budget < cow.price) {
      throw new Error("Can't Buy! Insufficient budget")
    }
  const session = await Order.startSession();

  session.startTransaction();

  try {
    cow.label = Label.SoldOut;
    await cow.save();

    buyer.budget -= cow.price;
    await buyer.save();

    const seller = await User.findById(cow.seller);
    if (seller) {
      seller.income += cow.price;
      await seller.save();
    }

    const order: IOrder = await Order.create({ cow: cowId, buyer: buyerId });

    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
  
};

const getOrders = async ()=> {
  const orders = await Order.find({})
  return orders;
}


export const orderService ={
  createOrder,
  getOrders
}