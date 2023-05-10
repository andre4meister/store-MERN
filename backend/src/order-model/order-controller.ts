import {Handler, Response} from 'express';
import OrderDao from '../dao/order-dao.js';
import {OrderStatus} from "./order-types.js";
import UserDao from "../dao/user-dao.js";
import checkItemsSum from "../utils/checkItemsSum.js";
import generateId from "../utils/generateId.js";

const listByUserId: Handler = async (req, res: Response) => {
    try {
        const sortBy = (req.query.sort || 'createdAt') as string;
        const limit = (req.query.limit || '30') as string;
        const order = (req.query.order || 'DESC') as string;
        const page = (req.query.page || '0') as string;
        const {userId, orderStatus} = req.query;

        if (userId) {
            const orders = await OrderDao.listByUserId(userId.toString(), sortBy, order, limit, page, orderStatus?.toString());
            return res.status(200).json(orders);
        } else {
            const orders = await OrderDao.list(sortBy, order, limit, page, orderStatus?.toString());
            return res.status(200).json(orders);
        }
    } catch (error) {
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const getById: Handler = async (req, res: Response) => {
    try {
        const order = await OrderDao.findById(req.params.id);

        if (!order) {
            return res.status(400).json({message: `Order with id ${req.params.id} doesn't exist`});
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const createOrder: Handler = async (req, res: Response) => {
    try {
        const {userId, items, price} = req.body;

        const user = await UserDao.findById(userId);
        if (!user) {
            return res.status(400).json({message: `User with id ${userId} doesn't exist`});
        }

        if (!items || !items.length) {
            return res.status(400).json({message: `Items are required`});
        }

        const checkedItemsSum = await checkItemsSum(items);
        if (price !== checkedItemsSum) {
            return res.status(400).json({message: `Price is incorrect`});
        }


        const createdOrder = await OrderDao.create({
            ...req.body,
            orderStatus: OrderStatus.created,
            id: generateId()
        })
        res.status(201).json(createdOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const updateOrder: Handler = async (req, res: Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({message: 'Id was provided in the request'});
        }

        const order = await OrderDao.findById(req.params.id);
        if (!order) {
            return res.status(400).json({message: `Order with id ${req.params.id} doesn't exist`});
        }

        const [numberOfUpdatedRows, updatedOrder] = await OrderDao.update(req.params.id, req.body);
        if (numberOfUpdatedRows === 0) {
            return res.status(400).json({message: 'Something went wrong'});
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const deleteOrder: Handler = async (req, res: Response) => {
    try {
        const order = await OrderDao.findById(req.params.orderId);

        if (!order) {
            return res.status(400).json({message: `Order with id ${req.params.orderId} doesn't exist`});
        }

        if (order?.orderStatus === OrderStatus.created || order?.orderStatus === OrderStatus.processing) {
            const numberOfDeletedRows = await OrderDao.delete(req.params.orderId);

            if (numberOfDeletedRows === 0) {
                return res.status(400).json({message: 'Something went wrong'});
            }
            return res.status(200).json(order);
        }
        res.status(400).json({message: 'You cannot delete order when it was processed or shipped'});
    } catch (error) {
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};
export {listByUserId, getById, createOrder, updateOrder, deleteOrder};
