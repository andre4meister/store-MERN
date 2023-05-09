import { Router } from 'express';
import { createReview, deleteReview, listByUserId, getReviewById, updateReview } from './review-controller.js';

const reviewRouter = Router();

reviewRouter.get('/', listByUserId);

reviewRouter.get('/:id', getReviewById);

reviewRouter.post('/', createReview);

reviewRouter.put('/:id', updateReview);

reviewRouter.delete('/:reviewId', deleteReview);

export { reviewRouter };
