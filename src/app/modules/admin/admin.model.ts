import { Schema, model } from "mongoose";
import { IAdmin } from "./admin.interface";


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
    // hashing user password
    const user = this;
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bycrypt_salt_rounds)
    );
  
  
    next();
  });

  export const Admin = model<IAdmin>('Admin', AdminSchema);