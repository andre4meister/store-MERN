import { Router } from 'express';
import {createItem, deleteItem, list, getById, updateItem, upload} from './item-controller.js';

const itemRouter = Router();

itemRouter.get('/', list);

itemRouter.get('/:id', getById);

itemRouter.post('/', upload.array('photos', 3), createItem);

itemRouter.put('/:id', upload.array('photos', 3), updateItem);

itemRouter.delete('/:id', deleteItem);

export { itemRouter };
