import {DataTypes, Model, InferAttributes, InferCreationAttributes} from 'sequelize';
import sequelize from "../db.js";

export interface SubCategory extends Model<InferAttributes<SubCategory>, InferCreationAttributes<SubCategory>> {
    id: string;
    name: string;
    photo: string;
    description: string;
    filters: string[];
}

const SubCategoryModel = sequelize.define<SubCategory>('subCategory', {
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
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filters: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
    },
}, {
    tableName: 'subCategories',
    timestamps: true,
});

export default SubCategoryModel;
