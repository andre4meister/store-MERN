import {Handler, Response} from 'express';
import ItemDao from "../dao/item-dao.js";
import ReviewDao from "../dao/review-dao.js";
import UserDao from "../dao/user-dao.js";
import generateId from "../utils/generateId.js";

const listByUserId: Handler = async (req, res: Response) => {
    try {
        const sortBy = (req.query.sort || 'createdAt') as string;
        const limit = (req.query.limit || '30') as string;
        const order = (req.query.order || 'DESC') as string;
        const page = (req.query.page || '0') as string;
        const userId = req.query.userId as string;

        if (!userId) {
            return res.status(400).json({message: 'User id is required'});
        }

        const user = await UserDao.findById(userId);
        if (!user) {
            return res.status(400).json({message: `User with id ${userId} doesn't exist`});
        }

        const reviews = await ReviewDao.list(userId, sortBy, order, limit, page);
        return res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const getReviewById: Handler = async (req, res: Response) => {
    try {
        const review = await ReviewDao.findById(req.params.id);

        if (!review) {
            return res.status(400).json({message: `Review with id ${req.params.id} doesn't exist`});
        }
        res.status(200).json(review);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const createReview: Handler = async (req, res: Response) => {
    try {
        const {author, itemId} = req.body;

        const user = await UserDao.findById(author);
        if (!user) {
            return res.status(400).json({message: `User with id ${author} doesn't exist`});
        }

        const item = await ItemDao.findById(itemId);
        if (!item) {
            return res.status(400).json({message: `Item with id ${itemId} doesn't exist`});
        }

        const checkReview = await ReviewDao.findByItemIdAndAuthor(itemId, author);
        if (checkReview) {
            return res.status(400).json({message: `User have already made a review for item with id ${itemId}`});
        }

        const review = await ReviewDao.create({...req.body, id: generateId()});
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
            return res.status(404).json({message: `Review with id ${req.params.id} doesn't exist`});
        }

        const [numOfRowsUpdated, updatedReview] = await ReviewDao.update(req.params.id, req.body);

        if (numOfRowsUpdated === 0) {
            return res.status(400).json({message: 'Review was not updated'});
        }

        res.status(200).json(updatedReview);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const deleteReview: Handler = async (req, res: Response) => {
    try {
        const review = await ReviewDao.findById(req.params.reviewId);
        if (!review) {
            return res.status(404).json({message: `Review with id ${req.params.reviewId} doesn't exist`});
        }

        const numberOfDeletedRows = await ReviewDao.delete(req.params.reviewId);
        if (numberOfDeletedRows === 0) {
            return res.status(400).json({message: 'Something went wrong'});
        }

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};
export {listByUserId, getReviewById, createReview, updateReview, deleteReview};
