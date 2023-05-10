import {DataTypes, Model, InferAttributes, InferCreationAttributes} from 'sequelize';
import sequelize from "../db.js";

export interface Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
    id: string;
    name: string;
    description: string;
    price: number;
    photos: string[];
    isAvailable: boolean;
    reviews?: string[];
    discountPrice?: number;
    characteristics?: Record<string, string>;
    brand?: string;
    model?: string;
}

const ItemModel = sequelize.define<Item>('item', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING(3000),
        allowNull: false,
        unique: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    discountPrice: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
        validate: {
            min: 1,
        },
    },
    characteristics: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
}, {
    tableName: 'items',
    timestamps: true,
});

export default ItemModel;