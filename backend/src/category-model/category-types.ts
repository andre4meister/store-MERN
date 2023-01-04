import mongoose, { Schema } from 'mongoose';
import { itemScheme, ItemType } from '../product-model/item-types';

interface FiltersType {
  isAvailable: boolean;
  minPrice: number;
  maxPrice: number;
  brand: string;
  model: string;
}
interface SubCategoryType {
  readonly _id: string;
  name: string;
  description: string;
  filters: FiltersType[];
}

interface CategoryType extends SubCategoryType {
  subCategories: SubCategoryType[];
}

const subCategoryScheme = new Schema<CategoryType>({
  name: {
    type: String,
    required: true,
    validate: { validator: (v: string) => v.length >= 2, message: 'Incorrect name, it should be longer' },
  },
  description: {
    type: String,
    required: true,
    validate: { validator: (v: string) => v.length >= 10, message: 'Too short description' },
  },
  filters: [String],
});

const categoryScheme = new Schema<CategoryType>({
  name: {
    type: String,
    required: true,
    validate: { validator: (v: string) => v.length >= 2, message: 'Incorrect name, it should be longer' },
  },
  description: {
    type: String,
    required: true,
    validate: { validator: (v: string) => v.length >= 10, message: 'Too short description' },
  },
  subCategories: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }],
  filters: [String],
});

const Category = mongoose.model('Category', categoryScheme);
const SubCategory = mongoose.model('SubCategory', subCategoryScheme);

export { categoryScheme, subCategoryScheme, CategoryType, FiltersType, SubCategoryType, Category, SubCategory };
