import {FindOptions, ModelCtor} from "sequelize";
import OrderModel,{Order} from "../db/models/Order.js";
import UserModel from "../db/models/User.js";
import {CartItem} from "../db/models/models.js";
import ItemModel from "../db/models/Item.js";

const INCLUDE_OPTIONS = [
    {
        model: CartItem,
        as: 'items',
        include: [ItemModel]
        // include: [{ model: ItemModel, as: 'item' }]
    },
    {
        model: UserModel,
        attributes: ['id', 'firstName', 'userName', 'lastName', 'email']
    }
];

class OrderDao {
    private orderDao: ModelCtor<Order>;

    constructor() {
        this.orderDao = OrderModel;
    }

    async list(sortBy: string, order: string, limit: string, page: string, orderStatus?: string) {
        const options: FindOptions = {
            where: {...(orderStatus && {orderStatus})},
            include: INCLUDE_OPTIONS,
            order: [[sortBy, order]],
            limit: Number(limit),
            offset: Number(page) * Number(limit) || 0,
        };

        return this.orderDao.findAndCountAll(options);
    }

    async listByUserId(userId: string, sortBy: string, order: string, limit: string, page: string, orderStatus?: string) {
        const options: FindOptions = {
            where: { userId, ...(orderStatus && {orderStatus})},
            include: INCLUDE_OPTIONS,
            order: [[sortBy, order]],
            limit: Number(limit),
            offset: Number(page) * Number(limit) || 0,
        };

        return this.orderDao.findAndCountAll(options);    }

    async findById(orderId: string) {
        return this.orderDao.findByPk(orderId, {
            include: INCLUDE_OPTIONS
        });
    }

    async create(order: Order) {
        return this.orderDao.create(order);
    }

    async update(orderId: string, orderBody: Order) {
        const [numOfRowsUpdated, updatedOrder] = await OrderModel.update(orderBody, {
            where: { id: orderId },
            returning: true,
        });

        const order = await OrderModel.findOne({
            where: { id: updatedOrder[0].id },
            include: INCLUDE_OPTIONS,
        });
        return [numOfRowsUpdated, order];
    }

    async delete(orderId: string) {
        return this.orderDao.destroy({where: {id: orderId}});
    }
}

export default new OrderDao();