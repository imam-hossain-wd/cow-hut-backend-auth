import { IAdmin, ILoginUser, ILoginUserResponse } from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (payload: IAdmin):  Promise<IAdmin> => {
  const admin = await Admin.create(payload);
  return admin;
};

const logInAdmin = async (payload:ILoginUser): Promise<ILoginUserResponse> => {
  const admin = await Admin.create(payload);
  return admin;
};

export const AdminService = {
  createAdmin,
  logInAdmin
};
