import {ModelCtor} from "sequelize";
import SubCategoryModel, {SubCategory} from "../db/models/SubCategory.js";
import {SubCategoryType} from "../category-model/category-types.js";

class SubCategoryDao {
    private subCategoryDao: ModelCtor<SubCategory>;

    constructor() {
        this.subCategoryDao = SubCategoryModel;
    }

    async list() {
        return await this.subCategoryDao.findAndCountAll({});
    }

    async findById(subCategoryId: string) {
        return await this.subCategoryDao.findByPk(subCategoryId);
    }

    async create(subCategory: SubCategory) {
        return this.subCategoryDao.create(subCategory);
    }

    async update(subCategoryId: string, subCategory: SubCategoryType) {
        const [numOfRowsUpdated, updatedCategories] = await this.subCategoryDao.update(
            subCategory,
            {
                where: { id: subCategoryId },
                returning: true,
            }
        );
        return [numOfRowsUpdated, updatedCategories[0]];
    }

    async delete(subCategoryId: string) {
        return this.subCategoryDao.destroy({
            where: { id: subCategoryId },
        });
    }
}

export default new SubCategoryDao();