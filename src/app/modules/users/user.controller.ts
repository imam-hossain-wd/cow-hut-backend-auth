import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service';
import { IUser, IUserProfileResponse} from './user.interface';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginations';




const getAllUsers = catchAsync(async (req: Request, res: Response) => {

  const filters = pick(req.query,['searchTerm', 'income', 'address', '_id'])
  const paginationOptions = pick(req.query, paginationFields);
  console.log(paginationOptions);
  const result = await userService.getAllUsers(paginationOptions, filters);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all users successfully',
    meta: result.meta,
    data: result.data
  });
});



const getProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const result = await userService.getMyProfile(token);
  sendResponse<IUserProfileResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  });
});


const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const token = req.headers.authorization as string;
  const result = await userService.updateMyProfile(token, data);
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

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userService.getSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all users successfully',
    data: result,
  });
});

const updateUser = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await userService.updateUser(id, updatedData);
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "get all users successfully",
      data: result,
    });

  } catch (error) {
    next(error)
  }
};

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully !',
    data: result,
  });
});

export const userController = {
  getAllUsers,
  getProfile,
  updateMyProfile,
  getSingleUser,
  updateUser,
  deleteUser,
};
