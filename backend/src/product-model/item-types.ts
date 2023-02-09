import { Schema } from 'mongoose';

interface ItemType {
  readonly _id: string;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  photos: string[];
  isAvailable: boolean;
  // WIP add review logic
  // reviews: ReviewType[];
  discountPrice?: number;
  // WIP type ObjectWithStringValues
  characteristics?: { [key: string]: string | number };
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
  category: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'category',
      sparse: true,
      partialFilterExpression: { name: { $exists: true } },
    },
  ],
  subCategory: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      sparse: true,
      ref: 'subCategory',
      partialFilterExpression: { name: { $exists: true } },
    },
  ],
  price: { type: Number, required: true, validate: { validator: (v: number) => v > 0, message: 'Incorrect price' } },
  isAvailable: { type: Boolean, required: true },
  discountPrice: { type: Number },
  photos: [String],
  brand: { type: String },
  model: { type: String },
});

export { itemScheme, ItemType };
