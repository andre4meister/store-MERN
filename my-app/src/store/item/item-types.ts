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
  createdAt: string;
  author: UserType;
  text: string;
  point: number;
  photos: string[];
}

export interface FetchLeaveReview {
  body: {
    author: string;
    text: string;
    point: number;
    photos?: string[];
  };
  itemId: string;
}
