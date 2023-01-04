"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.ShipmentMethodType = void 0;
const mongoose_1 = require("mongoose");
var ShipmentMethodType;
(function (ShipmentMethodType) {
    ShipmentMethodType["NovaPoshta"] = "Nova Poshta";
    ShipmentMethodType["UkrPoshta"] = "Ukr Poshta";
    ShipmentMethodType["Meest"] = "Meest Express";
})(ShipmentMethodType = exports.ShipmentMethodType || (exports.ShipmentMethodType = {}));
const userSchema = new mongoose_1.Schema({
    userName: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // _id: { type: Types.ObjectId, required: true, unique: true },
    // deliveryMethod: Types.Array<DeliverMethodType>,
    // likedItems: Types.DocumentArray<ItemType>,
    // basket: Types.DocumentArray<ItemType>,
});
exports.userSchema = userSchema;
