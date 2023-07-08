import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>({
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

export const User = model<IUser>('User', userSchema);
