import { Handler, Response } from 'express';
import mongoose from 'mongoose';
import { Item } from '../product-model/item-controller';
import createSortOptions from '../utils/filters/createSortOptions';
import { reviewScheme } from './review-types';

const Review = mongoose.model('review', reviewScheme);

const getReviews: Handler = async (req, res: Response) => {
  try {
    const sort = req.query.sort as string;
    const limit = req.query.sort;
    if (req.query.userId) {
      const reviews = await Review.find({ author: req.query.userId })
        .limit(Number(limit) || 30)
        .sort(createSortOptions(sort))
        .populate('author', 'userName email');
      return res.status(200).json(reviews);
    }

    const reviews = await Review.find()
      .populate('author', 'userName email')
      .limit(Number(limit) || 30)
      .sort(createSortOptions(sort));
    if (!reviews) {
      return res.status(400).json({ message: 'Some error' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const getReviewById: Handler = async (req, res: Response) => {
  try {
    const review = await Review.findById(req.params.id).populate('author', 'userName email');

    if (!review) {
      return res.status(400).json({ message: 'Review with such id doesn`t exist' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const createReview: Handler = async (req, res: Response) => {
  try {
    const { body, itemId } = req.body;
    const review = await (await Review.create(body)).populate('author', 'userName email');
    await Item.findByIdAndUpdate(
      itemId,
      {
        $push: { reviews: review._id },
      },
      { new: true },
    );
    return res.status(201).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const updateReview: Handler = async (req, res: Response) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true }).populate([
      'author',
      'userName email',
    ]);

    if (!review) {
      return res.status(404).json({ message: 'Review with such id was not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const deleteReview: Handler = async (req, res: Response) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review with such id was not found' });
    }

    await Item.findOneAndUpdate(
      { reviews: { $in: [req.params.reviewId] } },
      {
        $pull: { reviews: req.params.reviewId },
      },
      { new: true },
    );
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};
export { Review, getReviews, getReviewById, createReview, updateReview, deleteReview };
