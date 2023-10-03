import { Secret } from 'jsonwebtoken';
import { User } from '../users/user.model';
import Order from './order.model';
import IOrder from './order.interface';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Label } from '../cow/cow.interface';
import Cow from '../cow/cow.model';

const createOrder = async (orderData: IOrder) => {
  const { cow: cowId, buyer: buyerId } = orderData;

  const buyer = await User.findById(buyerId);
  const cow = await Cow.findById(cowId);

  if (!cow) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found');
  }
  if (!buyer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Buyer not found');
  }
  if (buyer.budget < cow.price) {
    throw new ApiError(httpStatus.NOT_FOUND, "Can't Buy! Insufficient budget");
  }

  const session = await Order.startSession();

  session.startTransaction();

  try {
    cow.label = Label.SoldOut;
    await cow.save();

    buyer.budget -= cow.price;
    await buyer.save();

    const seller = await User.findById(cow.seller);
    console.log(seller, 'seller');
    if (seller) {
      seller.income += cow.price;
      await seller.save();
    }

    const order: IOrder = await Order.create({ cow: cowId, buyer: buyerId });
    console.log(order, 'order');
    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getOrders = async (token: string):Promise<IOrder[] | null> => {
  const user = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

  if (user.role === 'admin') {
    const orders = await Order.find({});
    return orders;
  } else if (user.role === 'buyer') {
    const orders = await Order.find({
      buyer: user._id,
    });
    return orders;
  } else if (user.role === 'seller') {
    const cows = await Cow.find({ seller: user._id });
    const cowIds = cows.map(cow => cow._id);

    const orders = await Order.find({ cow: { $in: cowIds } });
    return orders;
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
};

const getSingleOrder = async (id:string, token: string):Promise<IOrder | null> => {
  const user = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  
  if (user.role === 'admin') {
    const order = await Order.findOne({ _id: id });
    return order;
  } else if (user.role === 'buyer') {
    const orders = await Order.find({
      buyer: user._id,
    });
    const matchingOrder = orders.find(
      order => order._id.toString() === id.toString()
    );

    if (matchingOrder) {
      return matchingOrder;
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
  } else if (user.role === 'seller') {
    const cows = await Cow.find({ seller: user._id });
    const cowIds = cows.map(cow => cow._id);

    const orders = await Order.find({ cow: { $in: cowIds } });
    const matchingOrder = orders.find(
      order => order._id.toString() === id.toString()
    );

    if (matchingOrder) {
      return matchingOrder;
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'order not found');
  }
};

export const orderService = {
  createOrder,
  getOrders,
  getSingleOrder,
};
