import {Handler, Response} from 'express';
import bcrypt from 'bcrypt';

import {deletePassword} from '../utils/deletePassword.js';
import UserDao from "../dao/user-dao.js";


// WIP implement this type
// interface TypedRequest<T extends Query, U> extends Express.Request {
//   body: U;
//   query: T;
// }

const getUsers: Handler = async (req, res: Response) => {
    try {
        let users;
        if (req.params.id) {
            users = await UserDao.findById(req.params.id);

            if (!users) {
                return res.status(404).send({message: 'Such user doesn`t exist'});
            }
            return res.status(200).send(deletePassword(users._doc));
        }

        users = await UserDao.list();

        res.status(200).json(deletePassword(users));
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const updateUser: Handler = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({message: 'Id wasn`t denoted'});
        }

        let user = await UserDao.findById(req.params.id);

        if (!!user) {
            user = await UserDao.update(req.params.id, req.body);

            return res.status(200).json(deletePassword(user._doc));
        } else {
            return res.status(404).json({message: 'Such user doesn`t exist'});
        }
    } catch (error) {
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const addUserLikedItem: Handler = async (req, res) => {

    if (!req.params.userId) {
        return res.status(404).json({message: 'Id wasn`t denoted'});
    }

    try {
        let user = await UserDao.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({message: 'Such user doesn`t exist'});
        }

        if (user.likedItems.includes(req.body.itemId)) {
            return res.status(400).json({message: 'Such item is already liked'});
        } else {
            user = await UserDao.addItemToUserLikedItem(req.params.userId, req.body.itemId);
            return res.status(200).json(deletePassword(user._doc));
        }
    } catch (error) {
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const deleteUserLikedItem: Handler = async (req, res) => {
    try {
        if (!req.params.userId) {
            return res.status(404).json({message: 'Id wasn`t denoted'});
        }

        let user = await UserDao.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({message: 'Such user doesn`t exist'});
        }

        user = await UserDao.deleteUserLikedItem(req.params.userId, req.body.itemId);
        return res.status(200).json(deletePassword(user._doc));

    } catch (error) {
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const addItemToUserCart: Handler = async (req, res) => {
    try {
        const {itemId, quantity} = req.body;
        if (!req.params.userId) {
            return res.status(404).json({message: 'Id wasn`t denoted'});
        }

        let user = await UserDao.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({message: 'Such user doesn`t exist'});
        }

        const itemIndex = user.cart.findIndex((item: any) => item.item._id.toString() === itemId.toString());

        if (itemIndex === -1) {
            user.cart.push({item: itemId, quantity});
        } else {
            user.cart[itemIndex].quantity = quantity;
        }

        await user.save();
        user = await UserDao.findById(req.params.userId);
        return res.status(200).json(deletePassword(user._doc));
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const deleteItemFromUserCart: Handler = async (req, res) => {
    if (!req.params.userId) {
        return res.status(404).json({message: 'Id wasn`t denoted'});
    }

    try {
        let user = await UserDao.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({message: 'Such user doesn`t exist'});
        }

        user = await UserDao.deleteItemFromUserCart(req.params.userId, req.body.itemId);

        return res.status(200).json(deletePassword(user._doc));
    } catch (error) {
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const updateUserPassword: Handler = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({message: 'Id wasn`t denoted'});
        }

        let user = await UserDao.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: 'Such user doesn`t exist'});
        }

        const isMatch = await bcrypt.compare(req.body.old, user.password);

        if (isMatch) {
            if (req.body.new !== req.body.confirm) {
                return res.status(400).json({message: 'New password doesn`t match confirm new password '});
            }

            const newHashedPassword = await bcrypt.hash(req.body.new, 12);
            user = await UserDao.update(req.params.id, {password: newHashedPassword});
            res.status(200).json(deletePassword(user._doc));
        } else {
            res.status(400).json({message: 'Incorrect old password'});
        }
    } catch (error) {
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const deleteUser: Handler = async (req, res) => {
    if (!req.params.id) {
        return res.status(404).json({message: 'Id wasn`t denoted'});
    }

    try {
        const user = await UserDao.findByIdAndDelete(req.params.id);
        if (!!user) {
            return res.status(200).json(deletePassword(user._doc));
        } else {
            return res.status(404).json({message: 'Such user doesn`t exist'});
        }
    } catch (error) {
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

export {
    getUsers,
    deleteUser,
    updateUser,
    updateUserPassword,
    addItemToUserCart,
    addUserLikedItem,
    deleteItemFromUserCart,
    deleteUserLikedItem,
};
