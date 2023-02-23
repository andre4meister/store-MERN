import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { OrderApi } from 'services/orderAPI';
import { addNotification } from 'store/alert/alert';
import { setError, toggleIsLoading } from 'store/app/app';
import { setUserOrders } from 'store/user/user';
import { setOrder, setOrderStatus } from './order';
import { CreateOrderFormType, OrderStatus, OrderType } from './order-types';

export const fetchCreateOrder = createAsyncThunk<void, CreateOrderFormType>('create-order', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(toggleIsLoading(true));
    const response = (await OrderApi.createOrder(data)) as AxiosResponse;
    if (response?.status === 201) {
      thunkAPI.dispatch(setOrder(response.data));
      thunkAPI.dispatch(setOrderStatus(OrderStatus.created));
      thunkAPI.dispatch(addNotification({ message: 'Your order was created ', type: 'success' }));
    } else {
      thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
      thunkAPI.dispatch(setError('Couldn`t create order'));
    }
    thunkAPI.dispatch(toggleIsLoading(false));
  } catch (error) {
    thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
    thunkAPI.dispatch(setError('Something is wrong Thunk'));
  }
});

export const fetchOrdersByUserId = createAsyncThunk<void, { userId: string }>(
  'fetch-orders-by-user',
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(toggleIsLoading(true));
      const response = (await OrderApi.getOrders(data)) as AxiosResponse;
      if (response?.status === 200) {
        thunkAPI.dispatch(setUserOrders(response.data));
      } else {
        thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
        thunkAPI.dispatch(setError('Couldn`t fetch orders'));
      }
      thunkAPI.dispatch(toggleIsLoading(false));
    } catch (error) {
      thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
      thunkAPI.dispatch(setError('Something is wrong Thunk'));
    }
  },
);
