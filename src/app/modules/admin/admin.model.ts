import { Schema, model } from "mongoose";
import { IAdmin } from "./admin.interface";
import config from "../../../config";
import bcrypt from 'bcrypt';


const AdminSchema = new Schema<IAdmin>({
    _id: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique:true
    },
    role: {
      type: String,
      enum: ['admin'],
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
      unique:true
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });

  AdminSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const admin = this;
    admin.password = await bcrypt.hash(
      admin.password,
      Number(config.bcrypt_salt_rounds)
    );

    AdminSchema.statics.isUserExist = async function (
      id: string
    ): Promise<IAdmin | null> {
      return await Admin.findOne(
        { id },
        { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
      );
    };
    
 
  
  
    next();
  });

  export const Admin = model<IAdmin>('Admin', AdminSchema);