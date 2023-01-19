import { RequestHandler } from 'express';
import { User } from '../user-model/user-controller';
import bcrypt from 'bcrypt';
import { UserMethods, userSchema, UserType } from '../user-model/user-types';
import { ValidationError, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import secretJWT from '../utils/secret';
import { deletePassword } from '../utils/deletePassword';
import { Document, Model, Types } from 'mongoose';

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

    const { email, password } = req.body;
    const isUserExist = await User.findOne({ email });

    if (!!isUserExist) {
      return res.status(400).json({ message: 'Such user already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // WIP fix any type  Document<Types.ObjectId, any, Model<UserType, any, UserMethods, any, typeof userSchema>>
    const user: any = await User.create({ ...req.body, password: hashedPassword, role: 'admin' });

    return res.status(201).json(deletePassword(user._doc));
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error });
  }
};

const login: RequestHandler<
  UserType,
  ResponseLoginWithToken | ErrorResponseType | any,
  Pick<UserType, 'password' | 'email'>
> = async (req, res) => {
  try {
    const errors = validationResult(req);

    const { email, password } = req.body;
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
        message: 'Incorrect password or email',
      });
    }
    const userData = await User.findOne({ email });

    if (!userData) {
      res.status(400).json({ message: 'Such user doesn`t exist' });
    }

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password or email' });
    } else {
      const token = jwt.sign({ email, password, _id: userData._id }, secretJWT, { expiresIn: '1h' });
      res.json({ token, userData: deletePassword(userData._doc) });
    }
  } catch (error) {
    res.status(500).send({ message: 'Some error has occured' });
  }
};

export { login, register, ErrorResponseType };
