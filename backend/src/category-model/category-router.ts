import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  list,
  getById,
  updateCategory,
} from './category-controller.js';

const categoryRouter = Router();

categoryRouter.get('/', list);

categoryRouter.get('/:id', getById);

categoryRouter.post('/', createCategory);

categoryRouter.put('/:id', updateCategory);

categoryRouter.delete('/:id', deleteCategory);

export { categoryRouter };
