import { ItemType } from 'store/item/item-types';
import { DeliverMethodType, ShipmentMethodType } from 'store/user/user-types';

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

export interface OrderType {
  readonly _id: string;
  readonly userId: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  items: ItemType[];
  price: number;
  message?: string;
  shipmentMethod: ShipmentMethodType;
  delivery: DeliverMethodType;
}
