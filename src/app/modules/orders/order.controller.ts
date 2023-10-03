import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse'
import { orderService } from './order.service';


const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = req.body;
    const newOrder = await orderService.createOrder(order)
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Order placed successfully.',
        data: newOrder,
      });
  });

  const getAllOrders = catchAsync(async (req: Request, res: Response) => {

    const token = req.headers.authorization as string;
      const newOrder = await orderService.getOrders(token);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Orders retrieved successfully',
        data: newOrder,
      });
  });

  const getSingleOrder:RequestHandler = catchAsync(async (req, res)=> {
    const id = req.params.id;
    const token = req.headers.authorization as string;
    const result = await orderService.getSingleOrder(id, token);
    sendResponse(res, {
      statusCode:200,
      success:true,
      message:"Order information retrieved successfully",
      data: result
    })

  })

export const ordersController = {
  createOrder,
  getAllOrders,
  getSingleOrder
};
