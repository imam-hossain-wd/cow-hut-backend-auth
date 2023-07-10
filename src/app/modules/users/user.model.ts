import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt'

const userSchema = new Schema<IUser ,UserModel>({
  password: {
    type: String,
    required: true,
    unique:true
  },
  role: {
    type: String,
    enum: ['seller', 'buyer'],
    required: true,
    unique:true
    
  },
  name: {
    firstName: {
      type: String,
      required: true,
      unique:true
      
    },
    lastName: {
      type: String,
      required: true,
      unique:true
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    unique:true
  },
  address: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  }
}, { timestamps: true })


userSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<IUser | null> {
return await User.findOne({ phoneNumber },{ _id: 1,password: 1,role: 1, phoneNumber:1});
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const User = model<IUser , UserModel>('User', userSchema);
