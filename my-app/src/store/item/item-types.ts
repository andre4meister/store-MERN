export interface ItemType {
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
