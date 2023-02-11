import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ItemApi } from 'services/itemApi';
import { addNotification } from 'store/alert/alert';
import { setError, toggleIsLoading } from 'store/app/app';
import { setItemData } from './item';
import { ItemType } from './item-types';

export const fetchItemById = createAsyncThunk<void, { id: string }>('item-by-id', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(toggleIsLoading(true));
    const response = (await ItemApi.getItemById(data.id)) as AxiosResponse<ItemType>;
    if (response?.status === 200) {
      thunkAPI.dispatch(setItemData(response.data));
    } else {
      thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
      thunkAPI.dispatch(setError('Couldn`t fetch item'));
    }
    thunkAPI.dispatch(toggleIsLoading(false));
  } catch (error) {
    thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
    thunkAPI.dispatch(setError('Something is wrong Thunk'));
  }
});
