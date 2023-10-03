"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const router = (0, express_1.Router)();
router.post('/create-admin', admin_controller_1.AdminController.createAdmin);
router.post('/login', admin_controller_1.AdminController.login);
router.post('/refresh-token', admin_controller_1.AdminController.refreshToken);
exports.default = router;
