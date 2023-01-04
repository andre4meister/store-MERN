"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemScheme = void 0;
const mongoose_1 = require("mongoose");
const itemScheme = new mongoose_1.Schema({
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    isAvailable: { type: Boolean, required: true },
});
exports.itemScheme = itemScheme;
