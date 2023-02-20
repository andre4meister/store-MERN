import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderStatus, OrderType } from './order-types';

export interface OrderInitialState {
  order: OrderType;
  orderStatus: OrderStatus | '';
}

export const initialOrderState: OrderInitialState = {
  order: {} as OrderType,
  orderStatus: '',
};

const orderReducer = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {
    setOrder(state, action: PayloadAction<OrderType>) {
      state.order = action.payload;
    },
    setOrderStatus(state, action: PayloadAction<OrderStatus>) {
      state.orderStatus = action.payload;
    },
  },
});

export const { setOrder, setOrderStatus } = orderReducer.actions;

export default orderReducer.reducer;
