import { Handler, Response } from 'express';
import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcrypt';

import { userSchema, UserType } from './user-types.js';
import { deletePassword } from '../utils/deletePassword.js';

const User = mongoose.model<UserType, Model<UserType, any, any>>('user', userSchema);

// WIP implement this type
// interface TypedRequest<T extends Query, U> extends Express.Request {
//   body: U;
//   query: T;
// }

const getUsers: Handler = async (req, res: Response) => {
  try {
    let users;
    if (req.params.id) {
      users = await User.findById(req.params.id).populate([
        { path: 'likedItems', populate: { path: 'reviews' } },
        'orders',
        { path: 'cart', populate: { path: 'item', populate: { path: 'reviews' } } },
      ]);

      if (!users) {
        return res.status(404).send({ message: 'Such user doesn`t exist' });
      }
      return res.status(200).send(deletePassword(users._doc));
    }

    users = await User.find().populate([
      { path: 'likedItems', populate: { path: 'reviews' } },
      'orders',
      { path: 'cart', populate: { path: 'item', populate: { path: 'reviews' } } },
    ]);

    res.status(200).json(deletePassword(users));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const updateUser: Handler = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: 'Id wasn`t denoted' });
    }

    let user = await User.findById(req.params.id);

    if (!!user) {
      user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        upsert: true,
      }).populate([
        { path: 'likedItems', populate: { path: 'reviews' } },
        'orders',
        { path: 'cart', populate: { path: 'item', populate: { path: 'reviews' } } },
      ]);

      return res.status(200).json(deletePassword(user._doc));
    } else {
      return res.status(404).json({ message: 'Such user doesn`t exist' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const addUserLikedItem: Handler = async (req, res) => {
  try {
    if (!req.params.userId) {
      return res.status(404).json({ message: 'Id wasn`t denoted' });
    }

    let user = await User.findOne({ _id: req.params.userId, likedItems: { $in: [req.body.itemId] } });

    if (!user) {
      user = await User.findByIdAndUpdate(
        req.params.userId,
        { $push: { likedItems: req.body.itemId } },
        {
          new: true,
          upsert: true,
        },
      ).populate([
        { path: 'likedItems', populate: { path: 'reviews' } },
        'orders',
        { path: 'cart', populate: { path: 'item', populate: { path: 'reviews' } } },
      ]);

      return res.status(200).json(deletePassword(user._doc));
    } else {
      return res.status(400).json({ message: 'Item is already added' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const deleteUserLikedItem: Handler = async (req, res) => {
  try {
    if (!req.params.userId) {
      return res.status(404).json({ message: 'Id wasn`t denoted' });
    }

    let user = await User.findById(req.params.userId);

    if (!!user) {
      user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { likedItems: req.body.itemId } },
        {
          new: true,
          upsert: true,
        },
      ).populate([
        { path: 'likedItems', populate: { path: 'reviews' } },
        'orders',
        { path: 'cart', populate: { path: 'item', populate: { path: 'reviews' } } },
      ]);
      return res.status(200).json(deletePassword(user._doc));
    } else {
      return res.status(404).json({ message: 'Such user doesn`t exist' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const addItemToUserCart: Handler = async (req, res) => {
  try {
    const { itemId, userId, quantity } = req.body;
    if (!req.params.userId) {
      return res.status(404).json({ message: 'Id wasn`t denoted' });
    }

    let user = await User.findById(req.params.userId);

    if (!!user) {
      const itemIndex = user.cart.findIndex((item: any) => item.item.toString() === itemId);

      if (itemIndex === -1) {
        user.cart.push({ item: itemId, quantity });
      } else {
        user.cart[itemIndex].quantity = quantity;
      }

      await user.save();
      user = await User.findById(req.params.userId).populate([
        { path: 'likedItems', populate: { path: 'reviews' } },
        'orders',
        { path: 'cart', populate: { path: 'item', populate: { path: 'reviews' } } },
      ]);
      return res.status(200).json(deletePassword(user._doc));
    } else {
      return res.status(404).json({ message: 'Such user doesn`t exist' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const deleteItemFromUserCart: Handler = async (req, res) => {
  try {
    if (!req.params.userId) {
      return res.status(404).json({ message: 'Id wasn`t denoted' });
    }

    let user = await User.findById(req.params.userId);

    if (!!user) {
      user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { cart: { item: req.body.itemId } } },
        {
          new: true,
          upsert: true,
        },
      ).populate([
        { path: 'likedItems', populate: { path: 'reviews' } },
        'orders',
        { path: 'cart', populate: { path: 'item', populate: { path: 'reviews' } } },
      ]);

      return res.status(200).json(deletePassword(user._doc));
    } else {
      return res.status(404).json({ message: 'Such user doesn`t exist' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const updateUserPassword: Handler = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: 'Id wasn`t denoted' });
    }

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Such user doesn`t exist' });
    }

    const isMatch = await bcrypt.compare(req.body.old, user.password);

    if (isMatch) {
      if (req.body.new !== req.body.confirm) {
        return res.status(400).json({ message: 'New password doesn`t match confirm new password ' });
      }

      const newHashedPassword = await bcrypt.hash(req.body.new, 12);
      user = await User.findByIdAndUpdate(req.params.id, { password: newHashedPassword }, { new: true }).populate([
        { path: 'likedItems', populate: { path: 'reviews' } },
        'orders',
        { path: 'cart', populate: { path: 'item', populate: { path: 'reviews' } } },
      ]);
      res.status(200).json(user._doc);
    } else {
      res.status(400).json({ message: 'Incorrect old password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const deleteUser: Handler = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: 'Id wasn`t denoted' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!!user) {
      return res.status(200).json(user._doc);
    } else {
      return res.status(404).json({ message: 'Such user doesn`t exist' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
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
  User,
};
