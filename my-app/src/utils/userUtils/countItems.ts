import { ItemType } from 'store/item/item-types';

export const countLikedItems = (likedItems: ItemType[]) => {
  if (likedItems) {
    return likedItems.length;
  }
  return 0;
};

export const countCartItems = (cartItems: ItemType[]) => {
  if (cartItems) {
    return cartItems.length;
  }
  return 0;
};
