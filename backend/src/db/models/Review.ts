import {DataTypes, Model, InferAttributes, InferCreationAttributes} from 'sequelize';
import {UserType} from "../../user-model/user-types.js";
import sequelize from "../db.js";
import ItemModel from "./Item.js";

export interface Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>> {
    id: string;
    point: number;
    itemId: string;
    author?: string;
    text?: string;
    photos?: string[];
}

const ReviewModel = sequelize.define<Review>('review', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    itemId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: ItemModel,
            key: 'id',
        }
    },
    text: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    point: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        }
    },
    photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
}, {
    tableName: 'reviews',
    timestamps: true,
});

export default ReviewModel;