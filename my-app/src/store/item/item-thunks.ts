import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ItemApi } from 'services/itemApi';
import { setError, toggleIsLoading } from 'store/app/app';
import { setItemData } from './item';
import { ItemType } from './item-types';

export const fetchItemById = createAsyncThunk<void, { id: string }>('item-by-id', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(toggleIsLoading(true));
    const response = (await ItemApi.getItemById(data.id)) as AxiosResponse<ItemType>;
    if (response?.status === 200) {
      // WIP alert thunkAPI.dispatch();
      thunkAPI.dispatch(setItemData(response.data));
    } else {
      // WIP read error
      thunkAPI.dispatch(setError('Couldn`t fetch item'));
    }
    thunkAPI.dispatch(toggleIsLoading(false));
  } catch (error) {
    //  WIP alert here
    thunkAPI.dispatch(setError('Something is wrong Thunk'));
  }
});
