import {RequestHandler} from 'express';
import UserDao from "../dao/user-dao.js";
import bcrypt from 'bcrypt';
import {RoleEnum, UserType} from '../user-model/user-types.js';
import {ValidationError, validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import {User} from "../db/models/User.js";
import generateId from "../utils/generateId.js";
import CartDao from "../dao/cart-dao.js";
import LikedItemListDao from "../dao/likedItemList-dao.js";

const saltRounds = 12;

interface ErrorResponseType {
    message: string;
    errors?: ValidationError[];
}

interface ResponseLoginWithToken extends UserType {
    token: string;
}

const register: RequestHandler<
    UserType,
    UserType | ErrorResponseType | any,
    Pick<UserType, 'password' | 'email' | 'userName' | 'phone'>
> = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect password or email',
            });
        }

        const {email, password} = req.body;
        const isUserExist = await UserDao.findByEmail(email);

        if (!!isUserExist) {
            return res.status(400).json({message: `User with email: ${email} already exists`});
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // TODO fix any type

        const createUserBody = {
            ...req.body as Partial<UserType>,
            id: generateId(),
            password: hashedPassword,
            role: RoleEnum.user,
        } as UserType;
        console.log("before create=============================")
        const user: any = await UserDao.create(createUserBody);
        console.log("after create===============================")
        const cart = await CartDao.create({id: generateId(), userId: user.id});
        const likedItemsList = await LikedItemListDao.create({id: generateId(), userId: user.id});

        const userWithAll = await UserDao.findByEmailWithPassword(email);
        console.log(userWithAll)
        return res.status(201).json(userWithAll);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Some error has occurred', error});
    }
};

const login: RequestHandler<
    UserType,
    ResponseLoginWithToken | ErrorResponseType | any,
    Pick<UserType, 'password' | 'email'>
> = async (req, res) => {
    try {
        const errors = validationResult(req);
        const secret = process.env.JWTSECRET as string;

        const {email, password} = req.body;
        if (!errors.isEmpty()) {
            return res.status(401).json({
                errors: errors.array(),
                message: 'Incorrect password or email',
            });
        }
        const userData = await UserDao.findByEmailWithPassword(email) as User;

        if (!userData) {
            res.status(400).json({message: 'Such user doesn`t exist'});
        }
        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return res.status(401).json({message: 'Incorrect password or email'});
        }

        const userBodyWithNoPassword = await UserDao.findByEmail(email);

        const token = jwt.sign({email, password, id: userData.id, role: userData.role}, secret, {expiresIn: '2h'});
        res.json({token, userData: userBodyWithNoPassword});

    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Some error has occurred'});
    }
};

export {login, register, ErrorResponseType};
