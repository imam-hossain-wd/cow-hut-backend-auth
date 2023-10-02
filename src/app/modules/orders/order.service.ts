
import Cow from "../cow/cow.model";
import { User } from "../users/user.model";
import { Types } from "mongoose";
import Order from './order.model';
import { Label } from '../cow/cow.interface';
import IOrder from './order.interface';

//: Promise<IOrder>

const createOrder = async (
  // cowId: Types.ObjectId,
  // buyerId: Types.ObjectId
  cowId: string,
  buyerId: string
) => {  
  console.log(cowId, buyerId);
  const cow = await Cow.findById(cowId);
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

const getOrders = async ()=> {
  const orders = await Order.find({})
  return orders;
}


export const orderService ={
  createOrder,
  getOrders
}