import { Router } from 'express';
import { createOrder, deleteOrder, listByUserId, getById, updateOrder } from './order-controller.js';

const orderRouter = Router();

orderRouter.get('/', listByUserId);

orderRouter.get('/:id', getById);

orderRouter.post('/', createOrder);

orderRouter.put('/:id', updateOrder);

orderRouter.delete('/:userId/:orderId', deleteOrder);

export { orderRouter };
