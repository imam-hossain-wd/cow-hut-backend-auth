"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = require("./admin.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createAdmin = async (payload) => {
    const admin = await admin_model_1.Admin.create(payload);
    return admin;
};
const logInAdmin = async (payload) => {
    const { phoneNumber, password } = payload;
    const isUserExist = await admin_model_1.Admin.isUserExist(phoneNumber);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.password &&
        !(await admin_model_1.Admin.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const { _id, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
};
const refreshToken = async (token) => {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { _id } = verifiedToken;
    console.log(verifiedToken);
    const isUserExist = await admin_model_1.Admin.findOne({ _id });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
        console.log('user does not exit');
    }
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist._id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
};
const getAdminProfile = async (token) => {
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const result = await admin_model_1.Admin.findOne({ _id: user._id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin is not found');
    }
    return result;
};
const updateAdminProfile = async (token, data) => {
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const isUserExit = await admin_model_1.Admin.findOne({ _id: user._id });
    if (!isUserExit) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user is not found');
    }
    if (data.password) {
        data.password = await bcrypt_1.default.hash(data.password, Number(config_1.default.bcrypt_salt_rounds));
    }
    const result = await admin_model_1.Admin.findOneAndUpdate({ _id: user._id }, data, {
        new: true,
    });
    return result;
};
exports.AdminService = {
    createAdmin,
    logInAdmin,
    refreshToken,
    getAdminProfile,
    updateAdminProfile
};
