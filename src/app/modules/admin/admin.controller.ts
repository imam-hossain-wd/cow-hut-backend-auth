import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AdminService } from './admin.service';
import config from '../../../config';
import sendResponse from '../../../shared/sendResponse';
import { IRefreshTokenResponse } from './admin.interface';
import httpStatus from 'http-status';


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


const login = catchAsync(async (req: Request,res: Response ) => {
  const {...loginData } = req.body;
  const result = await AdminService.logInAdmin(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  res.status(200).json({
    success:true,
    statusCode:200,
    message:"Admin logged successfully",
    data: {
      accessToken: others.accessToken
    }
  })
});

const getAdminProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const result = await AdminService.getAdminProfile(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  });
});


const updateAdminProfile = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const token = req.headers.authorization as string;
  const result = await AdminService.updateAdminProfile(token, data);
  const updatedData = {
      name:result?.name,
     phoneNumber:result?.phoneNumber,
     address:result?.address,
     password:result?.password
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information updated successfully",
    data: updatedData,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AdminService.refreshToken(refreshToken);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

export const AdminController = {
  createAdmin,
  login,
  refreshToken,
  updateAdminProfile,
  getAdminProfile
};
