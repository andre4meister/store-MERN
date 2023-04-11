import {Handler, Response} from 'express';
import createSortOptions from '../utils/filters/createSortOptions.js';
import ItemDao from "../dao/item-dao.js";
import ReviewDao from "../dao/review-dao.js";


const listByUserId: Handler = async (req, res: Response) => {
    try {
        const sort = req.query.sort as string;
        const userId = req.query.userId as string;
        const limit = req.query.sort as string;

        if (!userId) {
            return res.status(400).json({message: 'User id is required'});
        }

        if (userId) {
            const reviews = await ReviewDao.list(userId, sort, limit);
            return res.status(200).json(reviews);
        }

    } catch (error) {
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const getReviewById: Handler = async (req, res: Response) => {
    try {
        const review = await ReviewDao.findById(req.params.id);

        if (!review) {
            return res.status(400).json({message: 'Review with such id doesn`t exist'});
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const createReview: Handler = async (req, res: Response) => {
    try {
        const {body, itemId} = req.body;
        const review = await ReviewDao.create(body);
        await ItemDao.updateItemReviews(
            itemId,
            review._id,
            true
        );
        return res.status(201).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const updateReview: Handler = async (req, res: Response) => {
    try {
        const review = await ReviewDao.findById(req.params.id);
        if (!review) {
            return res.status(404).json({message: 'Review with such id was not found'});
        }
        await ReviewDao.update(req.params.id, req.body);

        res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const deleteReview: Handler = async (req, res: Response) => {
    const itemId = req.body.itemId;
    try {
        const review = await ReviewDao.findById(req.params.reviewId);
        if (!review) {
            return res.status(404).json({message: 'Review with such id was not found'});
        }

        await ReviewDao.delete(req.params.reviewId);
        await ItemDao.updateItemReviews(
            itemId,
            review._id,
            false
        );
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};
export {listByUserId, getReviewById, createReview, updateReview, deleteReview};
