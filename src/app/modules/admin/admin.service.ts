import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAdmin, ILoginUser, ILoginUserResponse } from './admin.interface';
import { Admin } from './admin.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';


const createAdmin = async (payload: IAdmin):  Promise<IAdmin> => {
  const admin = await Admin.create(payload);
  return admin;
};


const logInAdmin = async (payload:ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;
  const isUserExist = await Admin.isUserExist(phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (
    isUserExist.password &&
    !(await Admin.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { _id, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };

};


export const AdminService = {
  createAdmin,
  logInAdmin,
};
