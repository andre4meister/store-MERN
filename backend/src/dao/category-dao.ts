import mongoose, {Model} from 'mongoose';
import {CategoryType, categoryScheme} from "../category-model/category-types.js";

class CategoryDao {
    private categoryDao: Model<CategoryType, any, any>;

    constructor() {
        this.categoryDao = mongoose.model<CategoryType, Model<CategoryType, any, any>>('category', categoryScheme);
    }

    async list() {
        return this.categoryDao.find().populate('subCategories');
    }

    async findById(categoryId: string) {
        return this.categoryDao.findById(categoryId).populate('subCategories');
    }

    async create(category: CategoryType) {
        return this.categoryDao.create(category);
    }

    async update(categoryId: string, category: CategoryType) {
        return this.categoryDao.findByIdAndUpdate(categoryId, category, { new: true, upsert: true })
            .populate('subCategories')
    }

    async delete(categoryId: string) {
        return this.categoryDao.findByIdAndDelete(categoryId);
    }
}

export default new CategoryDao();