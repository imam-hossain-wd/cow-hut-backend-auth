import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (payload: IAdmin):  Promise<IAdmin> => {
  const admin = await Admin.create(payload);
  return admin;
};

export const AdminService = {
  createAdmin,
};
