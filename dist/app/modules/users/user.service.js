"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAllUsers = async (paginationOptions, filters) => {
    const { searchTerm, ...filtersData } = filters;
    const userSearchableFeilds = ['income', 'address', '_id'];
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: userSearchableFeilds.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = await user_model_1.User.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await user_model_1.User.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const getMyProfile = async (token) => {
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const result = await user_model_1.User.findOne({ _id: user.id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user is not found');
    }
    return result;
};
const updateMyProfile = async (token, data) => {
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const isUserExit = await user_model_1.User.findOne({ _id: user.id });
    if (!isUserExit) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user is not found');
    }
    if (data.password) {
        data.password = await bcrypt_1.default.hash(data.password, Number(config_1.default.bcrypt_salt_rounds));
    }
    const result = await user_model_1.User.findOneAndUpdate({ _id: user.id }, data, {
        new: true,
    });
    return result;
};
const getSingleUser = async (id) => {
    const isexits = await user_model_1.User.findOne({ _id: id });
    if (!isexits) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user is not found');
    }
    const singleUser = await user_model_1.User.findOne({ _id: id });
    return singleUser;
};
const updateUser = async (id, payload) => {
    const isExist = await user_model_1.User.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user not found !');
    }
    const result = await user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
const deleteUser = async (id) => {
    const result = await user_model_1.User.findByIdAndDelete(id);
    return result;
};
exports.userService = {
    getAllUsers,
    getSingleUser,
    getMyProfile,
    deleteUser,
    updateUser,
    updateMyProfile
};
