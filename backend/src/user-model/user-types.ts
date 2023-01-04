import { Schema } from 'mongoose';
import { itemScheme, ItemType } from '../product-model/item-types';

export enum ShipmentMethodType {
  NovaPoshta = 'Nova Poshta',
  UkrPoshta = 'Ukr Poshta',
  Meest = 'Meest Express',
}

export enum RoleEnum {
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
}

const deliverySchema = new Schema<DeliverMethodType>({
  country: { type: String, required: true, validate: { validator: (v: string) => v.length >= 2 } },
  city: { type: String, required: true, validate: { validator: (v: string) => v.length >= 2 } },
  // postMethod: ShipmentMethodType,
  chosenDepartment: { type: Number, required: true },
});

const userSchema = new Schema<UserType>({
  userName: {
    type: String,
    required: true,
    unique: true,
    validate: { validator: (v: string) => v.length >= 8 && v.length <= 16 },
  },
  firstName: { type: String, required: true, validate: { validator: (v: string) => v.length >= 8 && v.length <= 16 } },
  lastName: { type: String, required: true, validate: { validator: (v: string) => v.length >= 8 && v.length <= 16 } },
  // role: RoleEnum,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: { validator: (v: string) => v.length >= 8 && v.length <= 24 },
  },
  password: { type: String, required: true, validate: { validator: (v: string) => v.length >= 8 && v.length <= 20 } },
  phone: { type: String, unique: true, validate: { validator: (v: string) => v.length >= 10 && v.length <= 15 } },
  deliveryMethod: [deliverySchema],
  likedItems: [itemScheme],
  basket: [itemScheme],
});

export { userSchema, UserType, DeliverMethodType };
