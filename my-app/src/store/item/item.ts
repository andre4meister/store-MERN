import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemType } from 'store/item/item-types';

export interface ItemInitialState {
  itemInfo: ItemType;
}

export const initialItemState: ItemInitialState = {
  itemInfo: {} as ItemType,
};

const itemReducer = createSlice({
  name: 'item',
  initialState: initialItemState,
  reducers: {
    setItemData(state, action: PayloadAction<ItemType>) {
      state.itemInfo = action.payload;
    },
  },
});

export const { setItemData } = itemReducer.actions;

export default itemReducer.reducer;
