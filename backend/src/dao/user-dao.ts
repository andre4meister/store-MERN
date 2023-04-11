import mongoose, {Model} from 'mongoose';
import {userSchema, UserType} from "../user-model/user-types.js";
import {addItemToUserCart, addUserLikedItem} from "../user-model/user-controller.js";

class UserDao {
    private userDao: Model<UserType, any, any>;

    constructor() {
        this.userDao = mongoose.model<UserType, Model<UserType, any, any>>('user', userSchema);
    }

    async findById(userId: string) {
        return this.userDao.findById(userId).populate([
            {path: 'likedItems', populate: {path: 'reviews'}},
            'orders',
            {path: 'cart', populate: {path: 'item', populate: {path: 'reviews'}}},
        ]);
    }

    async findByEmail(email: string) {
        return this.userDao.findOne({email}).populate([
            {path: 'likedItems', populate: {path: 'reviews'}},
            'orders',
            {path: 'cart', populate: {path: 'item', populate: {path: 'reviews'}}},
        ]);
    }

    async list() {
        return this.userDao.find().populate([
            {path: 'likedItems', populate: {path: 'reviews'}},
            'orders',
            {path: 'cart', populate: {path: 'item', populate: {path: 'reviews'}}},
        ]);
    }

    async create(user: UserType) {
        return this.userDao.create(user);
    }

    async update(userId: string, updateBody: Partial<UserType>) {
        return this.userDao.findByIdAndUpdate(userId, updateBody, {
            new: true,
            upsert: true,
        }).populate([
            {path: 'likedItems', populate: {path: 'reviews'}},
            'orders',
            {path: 'cart', populate: {path: 'item', populate: {path: 'reviews'}}},
        ]);
    }

    async updateUserOrderList(userId: string, orderId: string, isAddingOrder: boolean) {
        if (isAddingOrder) {
            return this.userDao.findByIdAndUpdate(
                userId,
                {
                    $push: {orders: orderId},
                },
                {new: true},
            );
        } else {
            return this.userDao.findByIdAndUpdate(
                userId,
                {
                    $pull: {orders: orderId},
                },
                {new: true},
            );
        }
    }

    async addItemToUserLikedItem(userId: string, itemId: string) {
        return this.userDao.findByIdAndUpdate(
            userId,
            {$push: {likedItems: itemId}},
            {
                new: true,
                upsert: true,
            },
        ).populate([
            {path: 'likedItems', populate: {path: 'reviews'}},
            'orders',
            {path: 'cart', populate: {path: 'item', populate: {path: 'reviews'}}},
        ]);
    }

    async deleteUserLikedItem(userId: string, itemId: string) {
        return this.userDao.findByIdAndUpdate(
            userId,
            {$pull: {likedItems: itemId}},
            {
                new: true,
                upsert: true,
            },
        ).populate([
            {path: 'likedItems', populate: {path: 'reviews'}},
            'orders',
            {path: 'cart', populate: {path: 'item', populate: {path: 'reviews'}}},
        ]);
    }

    async deleteItemFromUserCart(userId: string, itemId: string) {
        return this.userDao.findByIdAndUpdate(
            userId,
            {$pull: {cart: {item: itemId}}},
            {
                new: true,
                upsert: true,
            },
        ).populate([
            {path: 'likedItems', populate: {path: 'reviews'}},
            'orders',
            {path: 'cart', populate: {path: 'item', populate: {path: 'reviews'}}},
        ]);
    }

    async findByIdAndDelete(userId: string) {
        return this.userDao.findByIdAndDelete(userId);
    }
}

export default new UserDao();