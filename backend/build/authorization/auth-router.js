"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../authorization/auth-controller");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post('/register', [
    (0, express_validator_1.check)('email', 'Incorrect email').isEmail(),
    (0, express_validator_1.check)('password', 'Incorrect password').isLength({ min: 8, max: 16 }),
    (0, express_validator_1.check)('userName', 'Incorrect userName').isLength({ min: 6, max: 16 }),
], auth_controller_1.register);
authRouter.post('/login', [(0, express_validator_1.check)('email', 'Incorrect email').isEmail(), (0, express_validator_1.check)('password', 'Incorrect password').isLength({ min: 8, max: 16 })], auth_controller_1.login);
authRouter.post('change-password');
