import { Schema } from 'mongoose';
import { categoryScheme, subCategoryScheme } from '../category-model/category-types';

interface ItemType {
  readonly _id: string;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  photos: string[];
  isAvailable: boolean;
  discountPrice?: number;
  brand?: string;
  model?: string;
}

const itemScheme = new Schema<ItemType>({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: { validator: (v: string) => v.length >= 2, message: 'Incorrect name, it should be longer' },
  },
  description: {
    type: String,
    required: true,
    validate: { validator: (v: string) => v.length >= 10, message: 'Too short description' },
  },
  category: [{ type: categoryScheme, required: true, ref: 'Category' }],
  subCategory: [{ type: subCategoryScheme, required: true, ref: 'SubCategory' }],
  price: { type: Number, required: true, validate: { validator: (v: number) => v > 0, message: 'Incorrect price' } },
  isAvailable: { type: Boolean, required: true },
  discountPrice: { type: Number, validate: { validator: (v: number) => v > 0, message: 'Incorrect price' } },
  photos: [String],
  brand: { type: String },
  model: { type: String },
});

export { itemScheme, ItemType };
