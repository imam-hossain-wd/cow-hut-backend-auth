import catchAsync from "../../../shared/catchAsync";


const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData);
    const { refreshToken, ...others } = result;
  
    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
  
    res.cookie('refreshToken', refreshToken, cookieOptions);
  
    sendResponse<ILoginUserResponse>(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully !',
      data: others,
    });
  });

  export const authController ={
    loginUser
  }