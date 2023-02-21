import { Router } from 'express';
import { createItem, deleteItem, getAllItems, getItem, updateItem } from './item-controller.js';

const itemRouter = Router();

itemRouter.get('/', getAllItems);

itemRouter.get('/:id', getItem);

itemRouter.post('/', createItem);

itemRouter.put('/:id', updateItem);

itemRouter.delete('/:id', deleteItem);

export { itemRouter };
