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

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IAdmin, '_id' | 'password' | 'role' >>;
  
} & Model<IAdmin>;

export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};
