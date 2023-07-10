import { Schema, model } from 'mongoose';
import { IAdmin, AdminModel } from './admin.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';

const AdminSchema = new Schema<IAdmin, AdminModel>({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
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
    unique: true,
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
  next();
});


AdminSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<IAdmin | null> {
return await Admin.findOne({ phoneNumber },{ _id: 1,password: 1,role: 1, phoneNumber:1});
};


AdminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
