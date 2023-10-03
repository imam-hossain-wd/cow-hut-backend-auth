import { Model } from "mongoose";

export type IUser = {
  _id?:string;
  password: string;
  role: 'seller' | 'buyer';
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type IUserProfileResponse = {
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
};

export type IUserProfile = Partial<IUserProfileResponse> & {
  password?: string;
};

export type IUserFilters = {
  searchTerm : string ;
}

export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, '_id' | 'password' | 'role' >>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;