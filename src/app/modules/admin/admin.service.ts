import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAdmin, ILoginUser, ILoginUserResponse } from './admin.interface';
import { Admin } from './admin.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const createAdmin = async (payload: IAdmin):  Promise<IAdmin> => {
  const admin = await Admin.create(payload);
  return admin;
};


const logInAdmin = async (payload:ILoginUser): Promise<ILoginUserResponse> => {
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

  const { _id: userId, role, needsPasswordChange } = isUserExist;
  
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

};



export const AdminService = {
  createAdmin,
  logInAdmin
};
