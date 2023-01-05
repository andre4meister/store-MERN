"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemScheme = void 0;
const mongoose_1 = require("mongoose");
const category_types_1 = require("../category-model/category-types");
const itemScheme = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: { validator: (v) => v.length >= 2, message: 'Incorrect name, it should be longer' },
    },
    description: {
        type: String,
        required: true,
        validate: { validator: (v) => v.length >= 10, message: 'Too short description' },
    },
    category: [{ type: category_types_1.categoryScheme, required: true, ref: 'Category' }],
    subCategory: [{ type: category_types_1.subCategoryScheme, required: true, ref: 'SubCategory' }],
    price: { type: Number, required: true, validate: { validator: (v) => v > 0, message: 'Incorrect price' } },
    isAvailable: { type: Boolean, required: true },
    discountPrice: { type: Number, validate: { validator: (v) => v > 0, message: 'Incorrect price' } },
    photos: [String],
    brand: { type: String },
    model: { type: String },
});
exports.itemScheme = itemScheme;
