"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginations_1 = require("../../../constants/paginations");
const getAllUsers = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, ['searchTerm', 'income', 'address', '_id']);
    const paginationOptions = (0, pick_1.default)(req.query, paginations_1.paginationFields);
    console.log(paginationOptions);
    const result = await user_service_1.userService.getAllUsers(paginationOptions, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'get all users successfully',
        meta: result.meta,
        data: result.data
    });
});
const getProfile = (0, catchAsync_1.default)(async (req, res) => {
    const token = req.headers.authorization;
    const result = await user_service_1.userService.getMyProfile(token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User's information retrieved successfully",
        data: result,
    });
});
const updateMyProfile = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const token = req.headers.authorization;
    const result = await user_service_1.userService.updateMyProfile(token, data);
    const updatedData = {
        name: result?.name,
        phoneNumber: result?.phoneNumber,
        address: result?.address,
        password: result?.password
    };
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User's information updated successfully",
        data: updatedData,
    });
});
const getSingleUser = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await user_service_1.userService.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'get all users successfully',
        data: result,
    });
});
const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await user_service_1.userService.updateUser(id, updatedData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "get all users successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteUser = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await user_service_1.userService.deleteUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User deleted successfully !',
        data: result,
    });
});
exports.userController = {
    getAllUsers,
    getProfile,
    updateMyProfile,
    getSingleUser,
    updateUser,
    deleteUser,
};
