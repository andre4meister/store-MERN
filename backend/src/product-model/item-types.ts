import { Schema } from 'mongoose';
import { CategoryType, SubCategoryType } from '../category-model/category-types.js';
import { ReviewType } from '../review-model/review-types.js';
import { ObjectWithStringValues } from '../types/commonTypes.js';

interface ShopingCartItem {
  item: ItemType;
  quantity: number;
}
interface ItemType {
  readonly _id: string;
  name: string;
  description: string;
  category: CategoryType;
  subCategory: SubCategoryType;
  price: number;
  photos: string[];
  isAvailable: boolean;
  reviews: ReviewType[];
  discountPrice?: number;
  characteristics?: ObjectWithStringValues;
  brand?: string;
  model?: string;
}

const itemScheme = new Schema<ItemType>({
  name: {
    type: String,
    required: true,
    unique: true,
    partialFilterExpression: { name: { $exists: true } },
    sparse: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
    partialFilterExpression: { name: { $exists: true } },
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'review',
      sparse: true,
      partialFilterExpression: { name: { $exists: true } },
    },
  ],
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'category',
    sparse: true,
    partialFilterExpression: { name: { $exists: true } },
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    required: true,
    sparse: true,
    ref: 'subCategory',
    partialFilterExpression: { name: { $exists: true } },
  },
  price: { type: Number, required: true, validate: { validator: (v: number) => v > 0, message: 'Incorrect price' } },
  isAvailable: { type: Boolean, required: true },
  discountPrice: { type: Number },
  characteristics: { type: Object, sparse: true, partialFilterExpression: { name: { $exists: true } } },
  photos: [String],
  brand: { type: String },
  model: { type: String },
});

export { itemScheme, ItemType, ShopingCartItem };
