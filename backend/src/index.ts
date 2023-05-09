import express, {json, NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {userRouter} from './user-model/user-router.js';
import {authRouter} from './authorization/auth-router.js';
import {itemRouter} from './item-model/item-router.js';
import {subCategoryRouter} from './subCategory-model/subCategory-router.js';
import {categoryRouter} from './category-model/category-router.js';
import {orderRouter} from './order-model/order-router.js';
import validationMiddleware from './middleware/validationMiddleware.js';
import {oneOf} from 'express-validator';
import {
    createCategoryValidation,
    createItemValidation,
    createOrderValidation,
    createReviewValidation,
    createSubCategoryValidation,
    loginValidation,
    registerValidation,
} from './utils/validationChecks.js';
import {reviewRouter} from './review-model/review-router.js';
import authorizationMW from "./middleware/authorizationMW.js";
import authentificationMW from "./middleware/authentificationMW.js";
import sequelize from "./db/db.js";
import {syncAll} from "./db/models/models.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app
    .use(json())
    .use(cors({origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: '*'}))
    // .use(authentificationMW as (req: Request, res: Response, next: NextFunction) => void)
    // .use(authorizationMW as (req: Request, res: Response, next: NextFunction) => void)
    // .use(validationMiddleware)
    .use('/users', userRouter)
    .use('/auth', oneOf([registerValidation, loginValidation]), authRouter)
    .use('/category', oneOf([createCategoryValidation]), categoryRouter)
    .use('/subCategory', oneOf([createSubCategoryValidation]), subCategoryRouter)
    .use('/items', oneOf([createItemValidation]), itemRouter)
    .use('/orders', oneOf([createOrderValidation]), orderRouter)
    .use('/reviews', oneOf([createReviewValidation]), reviewRouter);

const start = async () => {
    try {
        await sequelize.authenticate();
        await syncAll(false);
        console.log('synced and connected to postgresql');
        app.listen(PORT, () => console.log('Server started on ' + process.env.DB_PORT));
    } catch (error) {
        console.log(error);
    }
};

start();
