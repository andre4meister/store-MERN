"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.RoleEnum = exports.ShipmentMethodType = void 0;
const mongoose_1 = require("mongoose");
const item_types_1 = require("../product-model/item-types");
var ShipmentMethodType;
(function (ShipmentMethodType) {
    ShipmentMethodType["NovaPoshta"] = "Nova Poshta";
    ShipmentMethodType["UkrPoshta"] = "Ukr Poshta";
    ShipmentMethodType["Meest"] = "Meest Express";
})(ShipmentMethodType = exports.ShipmentMethodType || (exports.ShipmentMethodType = {}));
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["user"] = "user";
    RoleEnum["admin"] = "admin";
    RoleEnum["moderator"] = "moderator";
    RoleEnum["anonim"] = "anonim";
})(RoleEnum = exports.RoleEnum || (exports.RoleEnum = {}));
const deliverySchema = new mongoose_1.Schema({
    country: { type: String, required: true, validate: { validator: (v) => v.length >= 2 } },
    city: { type: String, required: true, validate: { validator: (v) => v.length >= 2 } },
    // postMethod: ShipmentMethodType,
    chosenDepartment: { type: Number, required: true },
});
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        validate: { validator: (v) => v.length >= 8 && v.length <= 16 },
    },
    firstName: { type: String, required: true, validate: { validator: (v) => v.length >= 8 && v.length <= 16 } },
    lastName: { type: String, required: true, validate: { validator: (v) => v.length >= 8 && v.length <= 16 } },
    // role: RoleEnum,
    email: {
        type: String,
        required: true,
        unique: true,
        validate: { validator: (v) => v.length >= 8 && v.length <= 24 },
    },
    password: { type: String, required: true, validate: { validator: (v) => v.length >= 8 && v.length <= 20 } },
    phone: { type: String, unique: true, validate: { validator: (v) => v.length >= 10 && v.length <= 15 } },
    deliveryMethod: [deliverySchema],
    likedItems: [item_types_1.itemScheme],
    basket: [item_types_1.itemScheme],
});
exports.userSchema = userSchema;
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};
