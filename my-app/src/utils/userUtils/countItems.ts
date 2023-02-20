import { ItemType } from 'store/item/item-types';
import { ShoppingCartItem } from 'store/order/order-types';

export const countLikedItems = (likedItems: ItemType[]) => {
  if (likedItems) {
    return likedItems.length;
  }
  return 0;
};

export const countCartItems = (cartItems: ShoppingCartItem[]) => {
  if (cartItems) {
    return cartItems.length;
  }
  return 0;
};
