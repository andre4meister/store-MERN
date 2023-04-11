import mongoose, {Model} from 'mongoose';
import {subCategoryScheme, SubCategoryType} from "../category-model/category-types.js";

class SubCategoryDao {
    private subCategoryDao: Model<SubCategoryType, any, any>;

    constructor() {
        this.subCategoryDao = mongoose.model<SubCategoryType, Model<SubCategoryType, any, any>>('subCategory', subCategoryScheme);
    }

    async list() {
        return this.subCategoryDao.find();
    }

    async findById(subCategoryId: string) {
        return this.subCategoryDao.findById(subCategoryId);
    }

    async create(subCategory: SubCategoryType) {
        return this.subCategoryDao.create(subCategory);
    }

    async update(subCategoryId: string, subCategory: SubCategoryType) {
        return this.subCategoryDao.findByIdAndUpdate(subCategoryId, subCategory, { new: true, upsert: true })
    }

    async delete(subCategoryId: string) {
        return this.subCategoryDao.findByIdAndDelete(subCategoryId);
    }
}

export default new SubCategoryDao();