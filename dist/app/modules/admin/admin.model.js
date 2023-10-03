"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const AdminSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['admin'],
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
        unique: true,
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    address: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
AdminSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const admin = this;
    admin.password = await bcrypt_1.default.hash(admin.password, Number(config_1.default.bcrypt_salt_rounds));
    next();
});
AdminSchema.statics.isUserExist = async function (phoneNumber) {
    return await exports.Admin.findOne({ phoneNumber }, { _id: 1, password: 1, role: 1, phoneNumber: 1 });
};
AdminSchema.statics.isPasswordMatched = async function (givenPassword, savedPassword) {
    return await bcrypt_1.default.compare(givenPassword, savedPassword);
};
exports.Admin = (0, mongoose_1.model)('Admin', AdminSchema);
