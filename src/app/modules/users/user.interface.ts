
export type IUser = {
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

export type IUserFilters = {
  searchTerm : string ;
}
