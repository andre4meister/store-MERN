import mongoose, {Model} from 'mongoose';
import {orderScheme, OrderType} from "../order-model/order-types.js";

class OrderDao {
    private orderDao: Model<OrderType, any, any>;

    constructor() {
        this.orderDao = mongoose.model<OrderType, Model<OrderType, any, any>>('order', orderScheme);
    }

    async listByUserId(userId: string, orderStatus?: string) {
        return this.orderDao.find({userId, orderStatus}).populate('items.item');
    }

    async findById(orderId: string) {
        return this.orderDao.findById(orderId).populate('items.item');
    }

    async create(order: OrderType) {
        return this.orderDao.create(order);
    }

    async update(orderId: string, order: OrderType) {
        return this.orderDao.findByIdAndUpdate(orderId, order, { new: true, upsert: true })
            .populate('items.item')
            .exec();
    }

    async delete(orderId: string) {
        return this.orderDao.findByIdAndDelete(orderId);
    }
}

export default new OrderDao();