import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from './category-controller';

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories);

categoryRouter.get('/:id', getCategory);

categoryRouter.post('/', createCategory);

categoryRouter.put('/:id', updateCategory);

categoryRouter.delete('/:id', deleteCategory);

export { categoryRouter };
