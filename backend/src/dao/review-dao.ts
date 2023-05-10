import createSortOptions from "../utils/filters/createSortOptions.js";
import {FindOptions, ModelCtor} from "sequelize";
import ReviewModel, {Review} from "../db/models/Review.js";
import UserModel from "../db/models/User.js";

const INCLUDE_OPTIONS = [
    {
        model: UserModel,
        as: 'user',
        attributes: ['id', 'userName', 'email', 'role']
    }
];

class ReviewDao {
    private reviewDao: ModelCtor<Review>;

    constructor() {
        this.reviewDao = ReviewModel;
    }

    async list(author: string, sortBy: string, order: string, limit: string, page: string) {
        const options: FindOptions = {
            where: {author},
            include: INCLUDE_OPTIONS,
            order: [[sortBy, order]],
            limit: Number(limit),
            offset: Number(page) * Number(limit) || 0,
        };
        return this.reviewDao.findAndCountAll(options);
    }

    async findById(reviewId: string) {
        return this.reviewDao.findByPk(reviewId, {include: INCLUDE_OPTIONS});
    }

    async findByItemIdAndAuthor(itemId: string, author: string) {
        return this.reviewDao.findOne({ where: { itemId, author } });
    }

    async create(review: Review) {
        return this.reviewDao.create(review);
    }

    async update(reviewId: string, reviewBody: Partial<Review>) {
        const [numOfRowsUpdated, updatedReview] = await this.reviewDao.update(reviewBody, {
            where: {id: reviewId},
            returning: true,

        });
        if (numOfRowsUpdated !== 0) {
            const review = await this.reviewDao.findOne({
                where: {id: updatedReview[0].id},
                include: INCLUDE_OPTIONS,
            });
            return [numOfRowsUpdated, review];
        }
        return [numOfRowsUpdated, null];
    }

    async delete(reviewId: string) {
        return this.reviewDao.destroy({where: {id: reviewId}});
    }
}

export default new ReviewDao();