import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AdminService } from './admin.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body;
  console.log(adminData);
  const result = AdminService.createAdmin(adminData);
  res.status(200).json({
    data: result,
  });
});

export const AdminController = {
  createAdmin,
};
