import { CategoryType, SubCategoryType } from 'store/category/category-types';

export interface ItemType {
  readonly _id: string;
  name: string;
  description: string;
  category: CategoryType[];
  subCategory: SubCategoryType[];
  price: number;
  photos: string[];
  isAvailable: boolean;
  discountPrice?: number;
  brand?: string;
  model?: string;
}
