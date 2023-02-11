import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderType } from './order-types';

export interface OrderInitialState {
  orders: OrderType[];
}

export const initialOrderState: OrderInitialState = {
  orders: [],
};

const orderReducer = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {
    setOrders(state, action: PayloadAction<OrderType[]>) {
      state.orders = action.payload;
    },
  },
});

export const {} = orderReducer.actions;

export default orderReducer.reducer;
