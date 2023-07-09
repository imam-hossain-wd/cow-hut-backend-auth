import { Model } from "mongoose";

export type IAdmin ={
    _id: string;
    phoneNumber: string;
    role: 'admin';
    password: string;
    name: {
        firstName: string;
        lastName: string;
      };
    address: string;
    createdAt: Date;
    updatedAt: Date;
}


export type AdminModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IAdmin, '_id' | 'password' | 'role' >>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};


export type IRefreshTokenResponse = {
  accessToken: string;
};

