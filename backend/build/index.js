"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = require("./user-model/user-router");
const auth_router_1 = require("./authorization/auth-router");
const mongoose_1 = __importDefault(require("mongoose"));
const item_router_1 = require("./product-model/item-router");
const mongoConnectURL = 'mongodb+srv://andreameister:andrik2016@mybackend.hoha1tw.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app
    .use((0, express_1.json)())
    .use((0, cors_1.default)({ origin: '*' }))
    // .use(parseURL)
    .use('/users', user_router_1.userRouter)
    .use('/auth', auth_router_1.authRouter)
    .use('/items', item_router_1.itemRouter);
const start = async () => {
    try {
        await mongoose_1.default.connect(mongoConnectURL);
        console.log('connected to mongo');
        app.listen(PORT, () => console.log('Server started on ' + PORT));
    }
    catch (error) {
        console.log(error);
    }
};
mongoose_1.default.set('strictQuery', true);
start();
