import { Schema } from 'mongoose';
import { OrderType } from '../order-model/order-types';
import { ItemType } from '../product-model/item-types';

enum ShipmentMethodType {
  NovaPoshta = 'Nova Poshta',
  UkrPoshta = 'Ukr Poshta',
  Meest = 'Meest Express',
}

enum RoleEnum {
  user = 'user',
  admin = 'admin',
  moderator = 'moderator',
  anonim = 'anonim',
}

interface DeliverMethodType {
  country: string;
  city: string;
  postMethod: ShipmentMethodType;
  chosenDepartment: number;
}

interface UserType {
  readonly _id: string;
  readonly userName: string;
  readonly role: RoleEnum;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  deliveryMethod: DeliverMethodType[];
  likedItems: ItemType[];
  basket: ItemType[];
  orders: OrderType[];
}

interface UserMethods {
  deletePassword(): Omit<UserType, 'password'>;
}

const deliverySchema = new Schema<DeliverMethodType>({
  country: { type: String, required: true, validate: { validator: (v: string) => v.length >= 2 } },
  city: { type: String, required: true, validate: { validator: (v: string) => v.length >= 2 } },
  postMethod: { type: String, enum: ShipmentMethodType, required: true },
  chosenDepartment: { type: Number, required: true },
});

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    validate: { validator: (v: string) => v.length >= 8 && v.length <= 16 },
  },
  firstName: { type: String, sparse: true },
  lastName: { type: String, sparse: true },
  role: { type: String, enum: RoleEnum },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: { validator: (v: string) => v.length >= 8 && v.length <= 24, message: 'Too long or short password' },
  },
  password: { type: String, required: true },
  phone: { type: String },
  // deliveryMethod: { type: [deliverySchema], required: false },
  likedItems: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'item',
      sparse: true,
      partialFilterExpression: { name: { $exists: true } },
    },
  ],
  basket: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'item',
      sparse: true,
      partialFilterExpression: { name: { $exists: true } },
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'order',
      sparse: true,
      partialFilterExpression: { name: { $exists: true } },
    },
  ],
});

userSchema.method('deletePassword', function deletePassword() {
  const obj: Partial<UserType> = { ...this.toObject() };
  delete obj.password;
  return obj;
});

export { userSchema, UserType, DeliverMethodType, UserMethods, RoleEnum, ShipmentMethodType, deliverySchema };
