import { Router } from 'express';
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
} from './subCategory-controller.js';

const subCategoryRouter = Router();

subCategoryRouter.get('/', getAllSubCategories);

subCategoryRouter.get('/:id', getSubCategory);

subCategoryRouter.post('/', createSubCategory);

subCategoryRouter.put('/:id', updateSubCategory);

subCategoryRouter.delete('/:id', deleteSubCategory);

export { subCategoryRouter };
