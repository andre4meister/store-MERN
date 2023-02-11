import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ItemApi } from 'services/itemApi';
import { addNotification } from 'store/alert/alert';
import { setError, toggleIsLoading } from 'store/app/app';

export const fetchItemById = createAsyncThunk<void, { id: string }>('item-by-id', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(toggleIsLoading(true));
    const response = (await ItemApi.getItemById(data.id)) as AxiosResponse;
    if (response?.status === 200) {
      thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'success' }));
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
