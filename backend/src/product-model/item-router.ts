import { Router } from 'express';
import { createItem, deleteItem, list, getById, updateItem } from './item-controller.js';

const itemRouter = Router();

itemRouter.get('/', list);

itemRouter.get('/:id', getById);

itemRouter.post('/', createItem);

itemRouter.put('/:id', updateItem);

itemRouter.delete('/:id', deleteItem);

export { itemRouter };
