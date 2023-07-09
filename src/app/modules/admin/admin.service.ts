import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAdmin, ILoginUser, ILoginUserResponse } from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (payload: IAdmin):  Promise<IAdmin> => {
  const admin = await Admin.create(payload);
  return admin;
};
//: Promise<ILoginUserResponse>

const logInAdmin = async (payload:ILoginUser) => {
  const { id, password } = payload;
  const isUserExist = await Admin.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (
    isUserExist.password &&
    !(await Admin.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }


  const admin = await Admin.create(payload);
  return admin;
};



export const AdminService = {
  createAdmin,
  logInAdmin
};
