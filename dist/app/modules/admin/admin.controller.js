"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const admin_service_1 = require("./admin.service");
const config_1 = __importDefault(require("../../../config"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { ...adminData } = req.body;
    const result = await admin_service_1.AdminService.createAdmin(adminData);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Admin created successfully",
        data: {
            _id: result?._id,
            role: result?.role,
            name: {
                firstName: result?.name?.firstName,
                lastName: result?.name?.lastName,
            },
            phoneNumber: result?.phoneNumber,
            address: result?.address,
        },
    });
});
const login = (0, catchAsync_1.default)(async (req, res) => {
    const { ...loginData } = req.body;
    const result = await admin_service_1.AdminService.logInAdmin(loginData);
    const { refreshToken, ...others } = result;
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Admin logged successfully",
        data: {
            accessToken: others.accessToken
        }
    });
});
const getAdminProfile = (0, catchAsync_1.default)(async (req, res) => {
    const token = req.headers.authorization;
    const result = await admin_service_1.AdminService.getAdminProfile(token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User's information retrieved successfully",
        data: result,
    });
});
const updateAdminProfile = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const token = req.headers.authorization;
    const result = await admin_service_1.AdminService.updateAdminProfile(token, data);
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
const refreshToken = (0, catchAsync_1.default)(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await admin_service_1.AdminService.refreshToken(refreshToken);
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully !',
        data: result,
    });
});
exports.AdminController = {
    createAdmin,
    login,
    refreshToken,
    updateAdminProfile,
    getAdminProfile
};
