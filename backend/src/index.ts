import express, { json } from 'express';
import cors from 'cors';
import { userRouter } from './user-model/user-router';
import { authRouter } from './authorization/auth-router';
import mongoose from 'mongoose';
import { itemRouter } from './product-model/item-router';
import { subCategoryRouter } from './subCategoty-model/subCategory-router';
import { categoryRouter } from './category-model/category-router';
import { orderRouter } from './order-model/order-router';
import validationMiddleware from './middleWare/validationMiddleware';
import { oneOf } from 'express-validator';
import {
  createCategoryValidation,
  createItemValidation,
  createOrderValidation,
  createSubCategoryValidation,
  loginValidation,
  registerValidation,
} from './utils/validationChecks';


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
  .use('/orders', oneOf([createOrderValidation]), orderRouter);


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
