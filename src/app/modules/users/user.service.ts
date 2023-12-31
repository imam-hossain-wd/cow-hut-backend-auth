import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser, IUserProfile, IUserProfileResponse } from './user.interface';
import { User } from './user.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';



type IuserSearchableFeilds = {
  searchTerm?: string;
};

const getAllUsers = async (
  paginationOptions: IPaginationOptions,
  filters: IuserSearchableFeilds
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const userSearchableFeilds = ['income', 'address', '_id'];
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFeilds.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await User.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getMyProfile = async(token:string):Promise<IUserProfileResponse> => {
  const user =  jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  const result= await User.findOne({_id:user._id});
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user is not found');
  }
  return result;
}

const updateMyProfile = async(token:string, data:IUserProfile):Promise<IUserProfileResponse | null> => {
  const user =  jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  const isUserExit= await User.findOne({_id:user._id});
  if (!isUserExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user is not found');
  }
  if (data.password) {
    data.password = await bcrypt.hash(data.password, Number(config.bcrypt_salt_rounds));
  }
  const result = await User.findOneAndUpdate({ _id:user._id }, data, {
    new: true,
  });
  return result;
  
}

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const isexits = await User.findOne({ _id: id });
  if (!isexits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user is not found');
  }
  const singleUser = await User.findOne({ _id: id });
  return singleUser;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
  }

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userService = {
  getAllUsers,
  getSingleUser,
  getMyProfile,
  deleteUser,
  updateUser,
  updateMyProfile
};
