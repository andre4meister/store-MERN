import {DataTypes, Model, InferAttributes, InferCreationAttributes} from 'sequelize';
import {DeliverMethodType} from "../../user-model/user-types.js";
import {OrderStatus, PaymentStatus, RecipientInfoType} from "../../order-model/order-types.js";
import sequelize from "../db.js";

export interface Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    id: string;
    orderStatus: OrderStatus;
    paymentStatus: PaymentStatus;
    price: number;
    message?: string;
    shipmentMethod: string;
    delivery: DeliverMethodType;
    recipientInfo: RecipientInfoType;
}

const OrderModel = sequelize.define<Order>('order', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    orderStatus: {
        type: DataTypes.ENUM(...Object.values(OrderStatus)),
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.ENUM(...Object.values(PaymentStatus)),
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    message: {
        type: DataTypes.STRING,
    },
    shipmentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    delivery: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    recipientInfo: {
        type: DataTypes.JSON(),
        allowNull: false,
    },
}, {
    tableName: 'orders',
    timestamps: true,
});

export default OrderModel;