"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.updateUserPassword = exports.updateUser = exports.deleteUser = exports.getUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import { Query } from 'express-serve-static-core';
const user_types_1 = require("./user-types");
const User = mongoose_1.default.model('user', user_types_1.userSchema);
exports.User = User;
// interface TypedRequest<T extends Query, U> extends Express.Request {
//   body: U;
//   query: T;
// }
const getUsers = async (req, res) => {
    try {
        let users;
        if (req.params.id) {
            users = await User.findById({ _id: req.params.id });
            if (!users) {
                return res.status(404).send({ message: 'Such user doesn`t exist' });
            }
            return res.status(200).send(users);
        }
        users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Some error has occured', error: error });
    }
};
exports.getUsers = getUsers;
const updateUser = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({ message: 'Id wasn`t denoted' });
        }
        let user = await User.findOne({ _id: req.body._id });
        if (!!user) {
            user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true });
            res.status(200).json(user);
        }
        else {
            return res.status(404).json({ message: 'Such user doesn`t exist' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Some error has occured', error: error });
    }
};
exports.updateUser = updateUser;
const updateUserPassword = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({ message: 'Id wasn`t denoted' });
        }
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Such user doesn`t exist' });
        }
        const isMatch = await bcrypt_1.default.compare(req.body.old, user.password);
        if (isMatch) {
            if (req.body.new !== req.body.confirm) {
                return res.status(400).json({ message: 'New password doesn`t match confirm new password ' });
            }
            const newHashedPassword = await bcrypt_1.default.hash(req.body.new, 12);
            user = await User.findByIdAndUpdate(req.params.id, { password: newHashedPassword }, { new: true });
            res.status(200).json(user);
        }
        else {
            res.status(400).json({ message: 'Incorrect old password' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Some error has occured', error: error });
    }
};
exports.updateUserPassword = updateUserPassword;
const deleteUser = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({ message: 'Id wasn`t denoted' });
        }
        const user = await User.findByIdAndDelete({ _id: req.params.id });
        if (!!user) {
            return res.status(200).json(user);
        }
        else {
            return res.status(404).json({ message: 'Such user doesn`t exist' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Some error has occured', error: error });
    }
};
exports.deleteUser = deleteUser;
