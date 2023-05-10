import {UserType} from "../user-model/user-types.js";
import UserModel, {User} from "../db/models/User.js";
import {FindOptions, ModelCtor} from "sequelize";
import Order from "../db/models/Order.js";
import {LikedItemsList, CartItem, CartModel} from "../db/models/models.js";
import ReviewModel from "../db/models/Review.js";
import ItemModel from "../db/models/Item.js";

const INCLUDE_OPTIONS = [
    Order,
    {
        model: LikedItemsList, as: 'likedItems',
        attributes: ['id'],
        include: [{model: ItemModel, as: 'likedItemsList'}]
    },
    {
        model: CartModel,
        attributes:['id'],
        include: [{model: CartItem, as: 'cartItemsList', include: [{model: ItemModel, as: 'item'}]}]}
]
class UserDao {
    private userDao: ModelCtor<User>;

    constructor() {
        this.userDao = UserModel;
    }

    async findById(userId: string) {
        return this.userDao.scope('withoutPassword').findByPk(userId, {
            include: INCLUDE_OPTIONS,
        });
    }
    async findByIdWithPassword(userId: string) {
        return this.userDao.findByPk(userId, {
            include: INCLUDE_OPTIONS,
        });
    }


    async findByEmail(email: string) {
        return this.userDao.scope('withoutPassword').findOne({
            where: {email},
            include: INCLUDE_OPTIONS,
        });
    }
    async findByEmailWithPassword(email: string) {
        return this.userDao.findOne({
            where: {email},
            include: INCLUDE_OPTIONS,
        });
    }

    async list(filter: UserType[], sortBy: string, order: string, limit: string, page: string) {
        const options: FindOptions = {
            where: filter as any,
            include: INCLUDE_OPTIONS,
            order: [[sortBy, order]],
            limit: Number(limit),
            offset: Number(page) * Number(limit) || 0,
        };

        return this.userDao.scope('withoutPassword').findAndCountAll(options);
    }

    async create(user: UserType) {
        return this.userDao.scope('withoutPassword').create(user);
    }

    async update(userId: string, userBody: Partial<User>) {
        const [numOfRowsUpdated, updatedUser] = await this.userDao.update(userBody, {
            where: {id: userId},
            returning: true,

        });
        if (numOfRowsUpdated !== 0) {
            const user = await UserModel.scope('withoutPassword').findOne({
                where: {id: updatedUser[0].id},
                include: INCLUDE_OPTIONS,
            });
            return [numOfRowsUpdated, user];
        }
        return [numOfRowsUpdated, null];
    }

    async updateUserOrderList(userId: string, orderId: string, isAddingOrder: boolean) {
        // if (isAddingOrder) {
        //     return this.userDao.findByIdAndUpdate(
        //         userId,
        //         {
        //             $push: {orders: orderId},
        //         },
        //         {new: true},
        //     );
        // } else {
        //     return this.userDao.findByIdAndUpdate(
        //         userId,
        //         {
        //             $pull: {orders: orderId},
        //         },
        //         {new: true},
        //     );
        // }
    }

    async addItemToUserLikedItem(userId: string, itemId: string) {
        // return this.userDao.findByIdAndUpdate(
        //     userId,
        //     {$push: {likedItems: itemId}},
        //     {
        //         new: true,
        //         upsert: true,
        //     },
        // ).populate([
        //     {path: 'likedItems', populate: {path: 'reviews'}},
        //     'orders',
        //     {path: 'cart', populate: {path: 'item', populate: {path: 'reviews'}}},
        // ]);
    }

    async deleteUserLikedItem(userId: string, itemId: string) {
        // return this.userDao.findByIdAndUpdate(
        //     userId,
        //     {$pull: {likedItems: itemId}},
        //     {
        //         new: true,
        //         upsert: true,
        //     },
        // ).populate([
        //     {path: 'likedItems', populate: {path: 'reviews'}},
        //     'orders',
        //     {path: 'cart', populate: {path: 'item', populate: {path: 'reviews'}}},
        // ]);
    }

    async deleteItemFromUserCart(userId: string, itemId: string) {
        // return this.userDao.findByIdAndUpdate(
        //     userId,
        //     {$pull: {cart: {item: itemId}}},
        //     {
        //         new: true,
        //         upsert: true,
        //     },
        // ).populate([
        //     {path: 'likedItems', populate: {path: 'reviews'}},
        //     'orders',
        //     {path: 'cart', populate: {path: 'item', populate: {path: 'reviews'}}},
        // ]);
    }

    async delete(userId: string) {
        return await this.userDao.destroy({
            where: {id: userId},
        });
    }
}

export default new UserDao();
