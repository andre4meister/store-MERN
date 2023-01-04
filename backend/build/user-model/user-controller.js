"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.updateUser = exports.deleteUser = exports.getUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// import { Query } from 'express-serve-static-core';
const user_types_1 = require("./user-types");
const userModel = mongoose_1.default.model('user', user_types_1.userSchema);
exports.userModel = userModel;
// interface TypedRequest<T extends Query, U> extends Express.Request {
//   body: U;
//   query: T;
// }
const getUsers = async (req, res) => {
    try {
        let users;
        if (req.params.id) {
            users = await userModel.findById({ _id: req.params.id });
            if (!users) {
                return res.status(404).send({ message: 'Such user doesn`t exist' });
            }
            return res.status(200).send(users);
        }
        users = await userModel.find();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send({ message: 'Some error has occured', error: error });
    }
};
exports.getUsers = getUsers;
const updateUser = async (req, res) => {
    const requestBody = JSON.parse(req.body);
    const user = await userModel.updateOne(requestBody._id, requestBody);
    res.send(user);
    return user;
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const user = await userModel.findByIdAndDelete(req.body);
    res.send(user);
    return user;
};
exports.deleteUser = deleteUser;
