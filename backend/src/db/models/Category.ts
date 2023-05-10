import sequelize from "../db.js";
import {DataTypes, Model, InferAttributes, InferCreationAttributes} from 'sequelize';
import SubCategoryModel from "./SubCategory.js";

export interface Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    id: string;
    name: string;
    description: string;
    icon: string;
    filters: string[];
}

const CategoryModel = sequelize.define<Category>('category', {
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
        type: DataTypes.STRING,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filters: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
    },
}, {
    tableName: 'categories',
    timestamps: true,
});

CategoryModel.beforeDestroy(async (category, options) => {
    await SubCategoryModel.destroy({
        where: {
            categoryId: category.id
        } as any,
        ...options
    })
})
export default CategoryModel;
