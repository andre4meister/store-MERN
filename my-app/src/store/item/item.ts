import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { DashboardApi } from 'services/dashboardAPI';
import { ItemApi } from 'services/itemApi';
import { CategoryType, SubCategoryType } from 'store/category/category-types';
import { setError } from 'store/dashboard/dashboard';
import { ItemType } from 'store/item/item-types';
import { toggleIsLoading } from 'store/user/user';

interface ItemInitialState {
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

export const { setItemData } = itemReducer.actions;

export default itemReducer.reducer;
