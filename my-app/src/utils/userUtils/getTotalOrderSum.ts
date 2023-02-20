import { ItemType } from 'store/item/item-types';
import { ShoppingCartItem } from 'store/order/order-types';

export const getTotalCountSum = (cart: ShoppingCartItem[]) => {
  return cart.reduce((prev, cur) => {
    return cur.item.discountPrice ? prev + cur.item.discountPrice * cur.quantity : prev + cur.item.price * cur.quantity;
  }, 0);
};

export const getLikedItemsTotalSum = (likedItems: ItemType[]) => {
  return likedItems.reduce((prev, cur) => {
    return cur?.discountPrice ? prev + cur.discountPrice : prev + cur.price;
  }, 0);
};
