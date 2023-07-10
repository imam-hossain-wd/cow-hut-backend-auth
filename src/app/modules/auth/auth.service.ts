import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { User } from "../users/user.model";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";



const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
   
    const { id, password } = payload;
    const isUserExist = await User.isUserExist(id);
  
    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }
  
    if (
      isUserExist.password &&
      !(await User.isPasswordMatched(password, isUserExist.password))
    ) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    }

    const { id: userId, role, needsPasswordChange } = isUserExist;
    const accessToken = jwtHelpers.createToken(
      { userId, role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
  
    const refreshToken = jwtHelpers.createToken(
      { userId, role },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );
  
    return {
      accessToken,
      refreshToken,
      needsPasswordChange,
    };
  };


  export const authService = {
    loginUser
  }