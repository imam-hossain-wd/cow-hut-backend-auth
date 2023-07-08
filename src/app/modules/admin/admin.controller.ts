import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from '../../../shared/sendResponse'
import { IAdmin } from "./admin.interface";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
   const {...userData} = req.body;
   const 
    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully !',
      data: result,
    });
  });

  export const AdminController ={
    createAdmin
  }
