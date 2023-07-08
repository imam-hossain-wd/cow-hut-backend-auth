import mongoose from "mongoose";


enum Location {
  Dhaka = 'Dhaka',
  Chattogram = 'Chattogram',
  Barishal = 'Barishal',
  Rajshahi = 'Rajshahi',
  Sylhet = 'Sylhet',
  Comilla = 'Comilla',
  Rangpur = 'Rangpur',
  Mymensingh = 'Mymensingh',
}

enum Breed {
  Brahman = 'Brahman',
  Nellore = 'Nellore',
  Sahiwal = 'Sahiwal',
  Gir = 'Gir',
  Indigenous = 'Indigenous',
  Tharparkar = 'Tharparkar',
  Kankrej = 'Kankrej',
}

enum Label {
  ForSale = 'for sale',
  SoldOut = 'sold out',
}

enum Category {
  Dairy = 'Dairy',
  Beef = 'Beef',
  DualPurpose = 'Dual Purpose',
}
enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
  None = 'none',
}

type IPaginationOptions ={
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: SortOrder | undefined;
}

 type ICow = {
  name: string;
  age: number;
  price: number;
  location: Location;
  breed: Breed;
  weight: number;
  label: Label;
  category: Category;
  seller: mongoose.Types.ObjectId; 
}

export { ICow, Location, Breed, Label, Category, IPaginationOptions };