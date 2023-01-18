import { ItemType } from '../item/item-types';

export enum ShipmentMethodType {
  NovaPoshta = 'Nova Poshta',
  UkrPoshta = 'Ukr Poshta',
  Meest = 'Meest Express',
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
  readonly userName: string;
  readonly role: RoleEnum;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
  deliveryMethod: DeliverMethodType[];
  likedItems: ItemType[];
  basketItems: ItemType[];
  orders: [];
}
