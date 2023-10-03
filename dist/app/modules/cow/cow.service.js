"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = __importDefault(require("./cow.model"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createCow = async (cowData) => {
    const result = await cow_model_1.default.create(cowData);
    return result;
};
const cowSearchableFields = ['location', 'breed', 'category'];
const getAllCows = async (paginationOptions, filters) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
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
    }
    else if (filters.minPrice !== undefined) {
        andConditions.push({
            price: {
                $gte: filters.minPrice,
            },
        });
    }
    else if (filters.maxPrice !== undefined) {
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const [data, total] = await Promise.all([
        cow_model_1.default.find(whereConditions)
            .sort(sortConditions)
            .skip(skip)
            .limit(limit),
        cow_model_1.default.countDocuments(whereConditions),
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
const getCowById = async (id) => {
    const isexits = await cow_model_1.default.findOne({ _id: id });
    if (!isexits) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "user is not found");
    }
    const result = await cow_model_1.default.findOne({ _id: id });
    return result;
};
const updateCow = async (id, payload) => {
    const isExist = await cow_model_1.default.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'cow not found !');
    }
    const result = await cow_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
const deleteCow = async (id) => {
    const result = await cow_model_1.default.findByIdAndDelete(id);
    return result;
};
exports.cowService = {
    createCow,
    getAllCows,
    getCowById,
    deleteCow,
    updateCow
};
