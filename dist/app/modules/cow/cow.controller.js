"use strict";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const cow_service_1 = require("./cow.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createCow = (0, catchAsync_1.default)(async (req, res) => {
    const cowData = req.body;
    const createdCow = await cow_service_1.cowService.createCow(cowData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'cow created successfully!',
        data: createdCow,
    });
});
const getAllCows = async (req, res) => {
    const { page, limit, sortBy, sortOrder, minPrice, maxPrice, location, searchTerm } = req.query;
    const paginationOptions = {
        page: page ? parseInt(page, 10) : 1,
        limit: limit ? parseInt(limit, 10) : 10,
        sortBy: sortBy,
        sortOrder: sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : undefined,
    };
    const filters = {
        minPrice: minPrice ? parseInt(minPrice, 10) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined,
        location: location,
        searchTerm: searchTerm,
    };
    const result = await cow_service_1.cowService.getAllCows(paginationOptions, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Get cow successfully!',
        meta: result.meta,
        data: result.data,
    });
};
const getCowById = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    const result = await cow_service_1.cowService.getCowById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'get cow by id successfully!',
        data: result,
    });
});
const updateCow = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const updatedCow = req.body;
    const result = await cow_service_1.cowService.updateCow(id, updatedCow);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'cow updated successfully !',
        data: result,
    });
});
const deleteCow = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await cow_service_1.cowService.deleteCow(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'cow deleted successfully !',
        data: result,
    });
});
exports.cowController = {
    createCow,
    getAllCows,
    getCowById,
    deleteCow,
    updateCow
};
