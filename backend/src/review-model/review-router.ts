import { Router } from 'express';
import { createReview, deleteReview, getReviews, getReviewById, updateReview } from './review-controller';

const reviewRouter = Router();

reviewRouter.get('/', getReviews);

reviewRouter.get('/:id', getReviewById);

reviewRouter.post('/', createReview);

reviewRouter.put('/:id', updateReview);

reviewRouter.delete('/:itemId/:reviewId', deleteReview);

export { reviewRouter };
