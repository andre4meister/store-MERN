import mongoose, {FilterQuery, Model} from 'mongoose';
import {itemScheme, ItemType} from "../product-model/item-types.js";
import createSortOptions from "../utils/filters/createSortOptions.js";

class ItemDao {
    private itemDao: Model<ItemType, any, any>;

    constructor() {
        this.itemDao = mongoose.model<ItemType, Model<ItemType, any, any>>('item', itemScheme);
    }

    async list(filter: FilterQuery<ItemType>, sort: string, limit: string) {
        return this.itemDao.find(filter)
            .limit(Number(limit) || 30)
            .sort(createSortOptions(sort))
            .populate(['category', 'subCategory', 'reviews'])
            .collation({locale: 'en', strength: 2});
    }

    async findById(orderId: string) {
        return this.itemDao.findById(orderId).populate([
            'category',
            'subCategory',
            {path: 'reviews', populate: 'author'},
        ]);
    }

    async create(item: ItemType) {
        return this.itemDao.create(item);
    }

    async update(itemId: string, itemBody: Partial<ItemType>) {
        return this.itemDao.findByIdAndUpdate(itemId, itemBody, {new: true, upsert: true})
            .populate([
                'category',
                'subCategory',
                'reviews',
            ]);
    }

    async updateItemReviews(itemId: string, reviewId: string, isAddingReview: boolean) {
        if (isAddingReview) {
            return this.itemDao.findByIdAndUpdate(itemId, {$push: {reviews: reviewId}}, {new: true})
        } else {
            return this.itemDao.findByIdAndUpdate(itemId, {$pull: {reviews: reviewId}}, {new: true})
        }
    }
    async delete(itemId: string) {
        return this.itemDao.findByIdAndDelete(itemId);
    }
}

export default new ItemDao();