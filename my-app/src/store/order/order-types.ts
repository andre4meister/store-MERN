import { ItemType } from 'store/item/item-types';
import { DeliverMethodType, ShipmentMethodType } from 'store/user/user-types';

export enum OrderStatus {
  created = 'created',
  processing = 'processing',
  delivering = 'delivering',
  done = 'done',
}

export enum PaymentStatus {
  payed = 'payed',
  notpayed = 'notpayed',
}

interface RecipientInfoType {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface OrderType {
  readonly _id: string;
  readonly userId: string;
  createdAt: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  items: ShoppingCartItem[];
  price: number;
  message?: string;
  shipmentMethod: ShipmentMethodType;
  delivery: DeliverMethodType;
  recipientInfo: RecipientInfoType;
}

export interface CreateOrderFormType {
  order: Omit<OrderType, '_id' | 'orderStatus' | 'createdAt'>;
  userId: string;
}

export type ShoppingCartItem = {
  item: ItemType;
  quantity: number;
};
