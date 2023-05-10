import { Router } from 'express';
import {
  createSubCategory,
  deleteSubCategory,
  list,
  getById,
  updateSubCategory,
} from './subCategory-controller.js';

const subCategoryRouter = Router();

subCategoryRouter.get('/', list);

subCategoryRouter.get('/:id', getById);

subCategoryRouter.post('/', createSubCategory);

subCategoryRouter.put('/:id', updateSubCategory);

subCategoryRouter.delete('/:id', deleteSubCategory);

export { subCategoryRouter };
