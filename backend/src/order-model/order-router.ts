import { Router } from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrder, updateOrder } from './order-controller.js';

const orderRouter = Router();

orderRouter.get('/', getAllOrders);

orderRouter.get('/:id', getOrder);

orderRouter.post('/', createOrder);

orderRouter.put('/:id', updateOrder);

orderRouter.delete('/:userId/:orderId', deleteOrder);

export { orderRouter };
