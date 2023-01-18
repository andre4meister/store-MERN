export interface ItemType {
  readonly _id: string;
  name: string;
  description: string;
  category: any;
  subCategory: any;
  price: number;
  photos: string[];
  isAvailable: boolean;
  discountPrice?: number;
  brand?: string;
  model?: string;
}
