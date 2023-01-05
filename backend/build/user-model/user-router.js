"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../utils/authMiddleware"));
const user_controller_1 = require("./user-controller");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.use('/:id', authMiddleware_1.default);
userRouter.get('/', user_controller_1.getUsers);
userRouter.get('/:id', user_controller_1.getUsers);
userRouter.put('/:id', user_controller_1.updateUser);
userRouter.put('/change-password/:id', user_controller_1.updateUserPassword);
userRouter.delete('/:id', user_controller_1.deleteUser);
