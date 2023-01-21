import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemType } from 'store/item/item-types';

export interface ItemInitialState {
  itemInfo: ItemType;
}

const initialState: ItemInitialState = {
  itemInfo: {} as ItemType,
};

const itemReducer = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItemData(state, action: PayloadAction<ItemType>) {
      state.itemInfo = action.payload;
    },
  },
});

export const { setItemData } = itemReducer.actions;

export default itemReducer.reducer;
