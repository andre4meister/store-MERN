import { Handler, Response } from 'express';
import UserDao from '../dao/user-dao.js';
import OrderDao from '../dao/order-dao.js';
import {OrderStatus} from "./order-types.js";

const listByUserId: Handler = async (req, res: Response) => {
  try {
    const { userId, orderStatus } = req.query;
    if (userId) {
      const orders = await OrderDao.listByUserId(userId.toString(), orderStatus?.toString());
      return res.status(200).json(orders);
    }
  } catch (error) {
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};

const getById: Handler = async (req, res: Response) => {
  try {
    const order = await OrderDao.findById(req.params.id);

    if (!order) {
      return res.status(400).json({ message: 'Order with such id doesn`t exist' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};

const createOrder: Handler = async (req, res: Response) => {
  try {
    const { userId, order } = req.body;
    const createdOrder = await (
      await OrderDao.create({
        ...order,
        orderStatus: OrderStatus.created,
        createdAt: new Date().toLocaleString(),
      })
    ).populate('items.item');
    await UserDao.updateUserOrderList(userId, createdOrder._id, true);
    res.status(201).json(createdOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};

const updateOrder: Handler = async (req, res: Response) => {
  try {
    const order = await OrderDao.update(req.params.id, req.body);

    if (!order) {
      return res.status(400).json({ message: 'Order with such id doesn`t exist' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};

const deleteOrder: Handler = async (req, res: Response) => {
  try {
    const order = await OrderDao.findById(req.params.orderId);

    if (!order) {
      return res.status(400).json({ message: 'Order with such id doesn`t exist' });
    }

    if (order?.orderStatus === OrderStatus.created || order?.orderStatus === OrderStatus.processing) {
      await OrderDao.delete(req.params.orderId);
      await UserDao.updateUserOrderList(
        req.params.userId,
        req.params.orderId,
        false,
      );
      return res.status(200).json(order);
    }
    res.status(400).json({ message: 'You cannot delete order when it was processed or shipped' });
  } catch (error) {
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};
export { listByUserId, getById, createOrder, updateOrder, deleteOrder };
