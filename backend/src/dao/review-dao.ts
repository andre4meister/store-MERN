import mongoose, {FilterQuery, Model} from 'mongoose';
import createSortOptions from "../utils/filters/createSortOptions.js";
import {reviewScheme, ReviewType} from "../review-model/review-types.js";

class ReviewDao {
    private reviewDao: Model<ReviewType, any, any>;

    constructor() {
        this.reviewDao = mongoose.model<ReviewType, Model<ReviewType, any, any>>('review', reviewScheme);
    }

    async list(authorId: string, sort: string, limit: string) {
        return this.reviewDao.find({author: authorId})
            .limit(Number(limit) || 30)
            .sort(createSortOptions(sort))
            .populate('author', 'userName email');
    }

    async findById(reviewId: string) {
        return this.reviewDao.findById(reviewId).populate('author', 'userName email')
    }

    async create(review: ReviewType) {
        return this.reviewDao.create(review);
    }

    async update(reviewId: string, reviewBody: Partial<ReviewType>) {
        return this.reviewDao.findByIdAndUpdate(reviewId, reviewBody, {new: true})
            .populate([
                'author',
                'userName email',
            ]);
    }

    async delete(reviewId: string) {
        return this.reviewDao.findByIdAndDelete(reviewId);
    }
}

export default new ReviewDao();