import { OrderType, ShoppingCartItem } from 'store/order/order-types';
import { ItemType } from '../item/item-types';

export enum ShipmentMethodType {
  NovaPoshta = 'Nova Poshta',
  UkrPoshta = 'Ukr Poshta',
  Meest = 'Meest Express',
}

export interface ChangeUserCartAndWishItemsType {
  userId: string;
  itemId: string;
}
export interface DeliverMethodType {
  country: string;
  city: string;
  postMethod: ShipmentMethodType;
  chosenDepartment: number;
}

export enum RoleEnum {
  user = 'user',
  admin = 'admin',
  moderator = 'moderator',
  anonim = 'anonim',
}
export interface UserType {
  readonly _id: string;
  userName: string;
  role: RoleEnum;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  deliveryMethod: DeliverMethodType[];
  likedItems: ItemType[];
  cart: ShoppingCartItem[];
  orders: OrderType[];
}

export interface FetchCartItem extends ChangeUserCartAndWishItemsType {
  quantity: number;
}
