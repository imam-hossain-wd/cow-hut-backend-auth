import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse'
import { orderService } from './order.service';


const createOrder = catchAsync(async (req: Request, res: Response) => {
    const { cow, buyer } = req.body;
      const newOrder = await orderService.createOrder(cow, buyer);
  
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Order placed successfully.',
        data: newOrder,
      });
  });

  const getAllOrders = catchAsync(async (req: Request, res: Response) => {
      const newOrder = await orderService.getOrders();
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Orders retrieved successfully',
        data: newOrder,
      });
  });

export const ordersController = {
  createOrder,
  getAllOrders
};
