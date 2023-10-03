import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAdmin, ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from './admin.interface';
import { Admin } from './admin.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { IUserProfile, IUserProfileResponse } from '../users/user.interface';
import bcrypt from 'bcrypt';


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

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { _id } = verifiedToken;
  console.log(verifiedToken);
  const isUserExist = await Admin.findOne({ _id})

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    console.log('user does not exit');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const getAdminProfile = async(token:string):Promise<IUserProfileResponse> => {
  const user =  jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  const result= await Admin.findOne({_id:user._id});
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin is not found');
  }
  return result;
}

const updateAdminProfile = async(token:string, data:IUserProfile):Promise<IUserProfileResponse | null> => {
  const user =  jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  const isUserExit= await Admin.findOne({_id:user._id});
  if (!isUserExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user is not found');
  }
  if (data.password) {
    data.password = await bcrypt.hash(data.password, Number(config.bcrypt_salt_rounds));
  }
  const result = await Admin.findOneAndUpdate({ _id:user._id }, data, {
    new: true,
  });
  return result;
  
}


export const AdminService = {
  createAdmin,
  logInAdmin,
  refreshToken,
  getAdminProfile,
  updateAdminProfile
};
