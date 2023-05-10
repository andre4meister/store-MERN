import { Optional } from 'sequelize';
import { OrderType } from '../order-model/order-types.js';
import { ItemType, ShopingCartItem } from '../item-model/item-types.js';

enum ShipmentMethodType {
  NovaPoshta = 'Nova Poshta',
  UkrPoshta = 'Ukr Poshta',
  Meest = 'Meest Express',
}

enum RoleEnum {
  admin = 'admin',
  moderator = 'moderator',
  user = 'user',
  anonim = 'anonim',
}

interface DeliverMethodType {
  country: string;
  city: string;
  postMethod: ShipmentMethodType;
  chosenDepartment: number;
}

interface UserType {
  id: string;
  userName: string;
  role: RoleEnum;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  deliveryMethod: DeliverMethodType[];
  likedItems: ItemType[];
  cart: ShopingCartItem[];
  orders: OrderType[];
}

// const deliverySchema = new Schema<DeliverMethodType>({
//   country: { type: String, required: true, validate: { validator: (v: string) => v.length >= 2 } },
//   city: { type: String, required: true, validate: { validator: (v: string) => v.length >= 2 } },
//   postMethod: { type: String, enum: ShipmentMethodType, required: true },
//   chosenDepartment: { type: Number, required: true },
// });

// const userSchema = new Schema({
//   userName: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: { validator: (v: string) => v.length >= 8 && v.length <= 16 },
//   },
//   firstName: { type: String, sparse: true },
//   lastName: { type: String, sparse: true },
//   role: { type: String, enum: RoleEnum },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: { validator: (v: string) => v.length >= 8 && v.length <= 24, message: 'Too long or short password' },
//   },
//   password: { type: String, required: true },
//   phone: { type: String },
//   // WIP
//   // deliveryMethod: { type: [deliverySchema], required: false },
//   likedItems: [
//     {
//       type: Schema.Types.ObjectId,
//       required: false,
//       ref: 'item',
//       sparse: true,
//       partialFilterExpression: { name: { $exists: true } },
//     },
//   ],
//   cart: [
//     {
//       item: {
//         type: Schema.Types.ObjectId,
//         required: false,
//         ref: 'item',
//         sparse: true,
//         partialFilterExpression: { name: { $exists: true } },
//       },
//       quantity: {
//         type: Number,
//         required: true,
//         ref: 'item',
//       },
//     },
//   ],
//   orders: [
//     {
//       type: Schema.Types.ObjectId,
//       required: false,
//       ref: 'order',
//       sparse: true,
//       partialFilterExpression: { name: { $exists: true } },
//     },
//   ],
// });

interface UserAttributes {
  id: number;
  userName: string;
  firstName: string | null;
  lastName: string | null;
  role: RoleEnum;
  email: string;
  password: string;
  phone: string | null;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

export { UserType, DeliverMethodType, UserCreationAttributes, UserAttributes, RoleEnum, ShipmentMethodType };
