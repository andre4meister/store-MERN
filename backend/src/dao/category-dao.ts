import {CategoryType} from "../category-model/category-types.js";
import {ModelCtor} from "sequelize";
import CategoryModel, {Category} from "../db/models/Category.js";

class CategoryDao {
    private categoryDao: ModelCtor<Category>;

    constructor() {
        this.categoryDao = CategoryModel;
    }

    async list() {
        return await this.categoryDao.findAndCountAll({
            include: ['subCategories'],
        });
    }

    async findById(categoryId: string) {
        return await this.categoryDao.findByPk(categoryId);
    }

    async create(category: CategoryType) {
        return await this.categoryDao.create(category);
    }

    async update(categoryId: string, category: CategoryType) {
        const [numOfRowsUpdated, updatedCategories] = await this.categoryDao.update(
            category,
            {
                where: { id: categoryId },
                returning: true,
            }
        );
        return [numOfRowsUpdated, updatedCategories[0]];
    }

    async delete(categoryId: string) {
        const numOfRowsDeleted = await this.categoryDao.destroy({
            where: { id: categoryId },
        });
        if (numOfRowsDeleted === 0) {
            throw new Error(`Category with id ${categoryId} not found`);
        }
        return;
    }
}

export default new CategoryDao();