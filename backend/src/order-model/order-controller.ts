import { Handler, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../user-model/user-controller';
import { orderScheme, OrderStatus } from './order-types';

const Order = mongoose.model('order', orderScheme);

const getAllOrders: Handler = async (req, res: Response) => {
  try {
    const { userId, orderStatus } = req.query;
    if (userId) {
      const orders = await Order.find({ userId }).populate('items.item');
      return res.status(200).json(orders);
    }

    const orders = await Order.find();
    if (!orders) {
      return res.status(400).json({ message: 'Some error' });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const getOrder: Handler = async (req, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(400).json({ message: 'Order with such id doesn`t exist' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const createOrder: Handler = async (req, res: Response) => {
  try {
    const { userId, order } = req.body;
    const createdOrder = await (
      await Order.create({
        ...order,
        orderStatus: OrderStatus.created,
        createdAt: new Date().toLocaleString(),
      })
    ).populate('items.item');
    await User.findByIdAndUpdate(userId, { $push: { orders: createdOrder._id } });
    res.status(201).json(createdOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const updateOrder: Handler = async (req, res: Response) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true })
      .populate('items.item')
      .exec();

    if (!order) {
      return res.status(400).json({ message: 'Order with such id doesn`t exist' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const deleteOrder: Handler = async (req, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);

    if (!order) {
      return res.status(400).json({ message: 'Order with such id doesn`t exist' });
    }

    if (order?.orderStatus === OrderStatus.created || order?.orderStatus === OrderStatus.processing) {
      await User.findByIdAndUpdate(
        req.params.userId,
        {
          $pull: { orders: req.params.orderId },
        },
        { new: true },
      );
      return res.status(200).json(order);
    }

    res.status(400).json({ message: 'You cannot delete order when it was proccesed or shipped' });
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};
export { Order, getAllOrders, getOrder, createOrder, updateOrder, deleteOrder };
