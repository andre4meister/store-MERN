"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const user_controller_1 = require("../user-model/user-controller");
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const saltRounds = 12;
const secretJWT = "it'smern_stack";
const register = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect password or email',
            });
        }
        const { email, password, userName } = req.body;
        const isUserExist = await user_controller_1.userModel.findOne({ email, userName });
        if (!!isUserExist) {
            return res.status(400).json({ message: 'Such user already exists', isUserExist });
        }
        if (password.length < 8 || password.length > 16) {
            return res.status(400).json({ message: 'Incorrect password' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        const user = await user_controller_1.userModel.create({ ...req.body, password: hashedPassword, role: 'user' });
        return res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Some error has occured', error });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        const { email, password } = req.body;
        if (!errors.isEmpty()) {
            return res.status(401).json({
                errors: errors.array(),
                message: 'Incorrect password or email',
            });
        }
        const authUser = await user_controller_1.userModel.findOne({ email: email });
        if (!authUser) {
            res.status(400).json({ message: 'Some error has occured' });
        }
        const isMatch = bcrypt_1.default.compare(password, authUser.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Incorrect password or email' });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ userId: authUser.id }, secretJWT, { expiresIn: '1h' });
            res.json({ token, authUser });
        }
    }
    catch (error) {
        res.status(500).send({ message: 'Some error has occured' });
    }
};
exports.login = login;
