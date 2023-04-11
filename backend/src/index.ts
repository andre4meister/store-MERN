import express, {json, NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRouter } from './user-model/user-router.js';
import { authRouter } from './authorization/auth-router.js';
import mongoose from 'mongoose';
import { itemRouter } from './product-model/item-router.js';
import { subCategoryRouter } from './subCategoty-model/subCategory-router.js';
import { categoryRouter } from './category-model/category-router.js';
import { orderRouter } from './order-model/order-router.js';
import validationMiddleware from './middleware/validationMiddleware.js';
import { oneOf } from 'express-validator';
import {
  createCategoryValidation,
  createItemValidation,
  createOrderValidation,
  createReviewValidation,
  createSubCategoryValidation,
  loginValidation,
  registerValidation,
} from './utils/validationChecks.js';
import { reviewRouter } from './review-model/review-router.js';
import authorizationMW from "./middleware/authorizationMW.js";
import authentificationMW from "./middleware/authentificationMW.js";
import {RequestWithDecodedData} from "./types/commonTypes.js";

dotenv.config();

const mongoConnectURL = process.env.MONGODB_URL as string;
const PORT = process.env.PORT || 5000;
const app = express();

app
    .use(json())
    .use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: '*' }))
    .use(authentificationMW as (req: Request, res: Response, next: NextFunction) => void)
    .use(authorizationMW as (req: Request, res: Response, next: NextFunction) => void)
    .use(validationMiddleware)
    .use('/users', userRouter)
    .use('/auth', oneOf([registerValidation, loginValidation]), authRouter)
    .use('/category', oneOf([createCategoryValidation]), categoryRouter)
    .use('/subCategory', oneOf([createSubCategoryValidation]), subCategoryRouter)
    .use('/items', oneOf([createItemValidation]), itemRouter)
    .use('/orders', oneOf([createOrderValidation]), orderRouter)
    .use('/reviews', oneOf([createReviewValidation]), reviewRouter);

const start = async () => {
  try {
    await mongoose.connect(mongoConnectURL);
    console.log('connected to mongo');
    app.listen(PORT, () => console.log('Server started on ' + PORT));
  } catch (error) {
    console.log(error);
  }
};

mongoose.set('strictQuery', true);
start();
