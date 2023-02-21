import express, { json } from 'express';
import cors from 'cors';
import { userRouter } from './user-model/user-router.js';
import { authRouter } from './authorization/auth-router.js';
import mongoose from 'mongoose';
import { itemRouter } from './product-model/item-router.js';
import { subCategoryRouter } from './subCategoty-model/subCategory-router.js';
import { categoryRouter } from './category-model/category-router.js';
import { orderRouter } from './order-model/order-router.js';
import validationMiddleware from './middleWare/validationMiddleware.js';
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

const mongoConnectURL =
  'mongodb+srv://andreameister:andrik2016@mybackend.hoha1tw.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
const app = express();

app
  .use(json())
  .use(validationMiddleware)
  .use(cors({ origin: '*' }))
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
