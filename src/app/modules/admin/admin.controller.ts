import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AdminService } from './admin.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body;
  const result = await AdminService.createAdmin(adminData);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Admin created successfully",
    data: {
      _id: result?._id,
      role: result?.role,
      name: {
        firstName: result?.name?.firstName,
        lastName: result?.name?.lastName,
      },
      phoneNumber: result?.phoneNumber,
      address: result?.address,
    },
  });
});
const login = catchAsync(async (req: Request, res: Response) => {
  const { ...logInData } = req.body;
  const result = await AdminService.logInAdmin(logInData);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Admin logged successfully",
    data: result
  });
});

export const AdminController = {
  createAdmin,
  login
};
