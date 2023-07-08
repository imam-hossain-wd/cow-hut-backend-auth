
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICow } from './cow.interface';
import Cow from './cow.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';



const createCow = async (cowData: ICow) => {
  const result = await Cow.create(cowData);
  return result;
};


const cowSearchableFields = ['location', 'breed', 'category'];

type CowFilterableFields = {
  searchTerm?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
};

const getAllCows = async (
  paginationOptions: IPaginationOptions,
  filters: CowFilterableFields
): Promise<IGenericResponse<ICow[]>> => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (filters.searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map((field) => ({
        [field]: {
          $regex: filters.searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    andConditions.push({
      price: {
        $gte: filters.minPrice,
        $lte: filters.maxPrice,
      },
    });
  } else if (filters.minPrice !== undefined) {
    andConditions.push({
      price: {
        $gte: filters.minPrice,
      },
    });
  } else if (filters.maxPrice !== undefined) {
    andConditions.push({
      price: {
        $lte: filters.maxPrice,
      },
    });
  }

  if (filters.location) {
    andConditions.push({
      location: filters.location,
    });
  }

  const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const [data, total] = await Promise.all([
    Cow.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit),
    Cow.countDocuments(whereConditions),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data,
  };
};


const getCowById = async (id:string)=>{

    const isexits = await Cow.findOne({_id: id})
    if(!isexits){
        throw new ApiError(httpStatus.NOT_FOUND, "user is not found")
    }
    const result = await Cow.findOne({ _id: id });
    return result;

}

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'cow not found !');
  }
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
    const result = await Cow.findByIdAndDelete(id)
    return result;
  };

export const cowService = {
  createCow,
  getAllCows,
  getCowById,
  deleteCow,
  updateCow
};