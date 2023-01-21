import { Schema } from 'mongoose';
import { DeliverMethodType, ShipmentMethodType } from '../user-model/user-types';

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
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  price: number;
  message?: string;
  shipmentMethod: { type: StringConstructor; enum: typeof ShipmentMethodType };
  delivery: DeliverMethodType;
}

const orderScheme = new Schema<OrderType>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    sparse: true,
    partialFilterExpression: { name: { $exists: true } },
  },
  orderStatus: { type: String, enum: OrderStatus, required: true },
  paymentStatus: { type: String, enum: PaymentStatus, required: true },
  price: { type: Number, required: true, validate: { validator: (v: number) => v > 0, message: 'Incorrect price' } },
  message: { type: String },
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
});

export { orderScheme, OrderType, UserIdType, PaymentStatus, OrderStatus };
