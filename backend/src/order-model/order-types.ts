import { Schema } from 'mongoose';
import { ShopingCartItem } from '../item-model/item-types.js';
import { DeliverMethodType, ShipmentMethodType } from '../user-model/user-types.js';

enum OrderStatus {
  created = 'created',
  processing = 'processing',
  delivering = 'delivering',
  done = 'done',
}

enum PaymentStatus {
  payed = 'payed',
  notpayed = 'notpayed',
}

interface RecipientInfoType {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

type UserIdType = {
  type: typeof Schema.Types.ObjectId;
  ref: string;
  required: true;
  sparse: true;
  partialFilterExpression: { name: { $exists: true } };
};

interface OrderType {
  readonly _id: string;
  readonly userId: UserIdType;
  createdAt: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  items: ShopingCartItem[];
  price: number;
  message?: string;
  shipmentMethod: { type: StringConstructor; enum: typeof ShipmentMethodType };
  delivery: DeliverMethodType;
  recipientInfo: RecipientInfoType;
}

const orderScheme = new Schema<OrderType>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    sparse: true,
    partialFilterExpression: { name: { $exists: true } },
  },
  createdAt: {
    type: String,
    required: true,
    sparse: true,
    partialFilterExpression: { name: { $exists: true } },
  },
  orderStatus: { type: String, enum: OrderStatus, required: true },
  paymentStatus: { type: String, enum: PaymentStatus, required: true },
  price: { type: Number, required: true, validate: { validator: (v: number) => v > 0, message: 'Incorrect price' } },
  message: { type: String },
  items: [
    {
      item: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'item',
        sparse: true,
        partialFilterExpression: { name: { $exists: true } },
      },
      quantity: {
        type: Number,
        required: true,
        ref: 'item',
        // validate: { validate: (quantity: number) => quantity > 0, message: 'This property coudn`t be less than 1' },
      },
    },
  ],
  shipmentMethod: {
    type: String,
    required: true,
    sparse: true,
    partialFilterExpression: { name: { $exists: true } },
  },
  delivery: {
    enum: ShipmentMethodType,
    type: {
      country: String,
      city: String,
      postMethod: { type: String, enum: ShipmentMethodType },
      chosenDepartment: Number,
    },
    required: true,
    sparse: true,
    partialFilterExpression: { name: { $exists: true } },
  },
  recipientInfo: {
    type: {
      name: String,
      surname: String,
      email: String,
      phone: String,
    },
    required: true,
    sparse: true,
    partialFilterExpression: { name: { $exists: true } },
  },
});

export { orderScheme, OrderType, UserIdType, PaymentStatus, RecipientInfoType, OrderStatus };
