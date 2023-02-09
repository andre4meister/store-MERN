import { CategoryType, SubCategoryType } from 'store/category/category-types';
import { ObjectWithStringValues } from 'store/commonTypes';
import { UserType } from 'store/user/user-types';

export interface ItemType {
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

export interface ReviewType {
  _id: string;
  author: UserType;
  text: string;
  point: number;
}
