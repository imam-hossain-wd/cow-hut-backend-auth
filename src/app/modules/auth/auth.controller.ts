import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { authService } from "./auth.service";
import config from "../../../config";


const loginUser = catchAsync(async (req: Request,res: Response ) => {
  const {...loginData } = req.body;
  const result = await authService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  res.status(200).json({
    success:true,
    statusCode:200,
    message:"user logged in successfully",
    data: {
      accessToken: others
    }
  })
});

  export const authController ={
    loginUser
  }