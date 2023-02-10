import { Schema } from 'mongoose';
import { UserType } from '../user-model/user-types';

interface ReviewType {
  _id: string;
  author: UserType;
  text: string;
  point: number;
  photos: string[];
}

const reviewScheme = new Schema<ReviewType>({
  text: {
    type: String,
    partialFilterExpression: { name: { $exists: true } },
    sparse: true,
  },
  point: {
    type: Number,
    required: true,
    partialFilterExpression: { name: { $exists: true } },
  },
  photos: { type: [String], partialFilterExpression: { name: { $exists: true } }, sparse: true },

  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    sparse: true,
    partialFilterExpression: { name: { $exists: true } },
  },
});

export { reviewScheme, ReviewType };
