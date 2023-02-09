import { createAsyncThunk } from '@reduxjs/toolkit';
import { ItemType } from '../item/item-types';
import { AxiosResponse } from 'axios';
import { DashboardApi } from 'services/dashboardAPI';
import { CategoryType, SubCategoryType } from 'store/category/category-types';
import { setError, toggleIsLoading } from 'store/app/app';
import { setCategories, setSubCategories, setLikedItems, setSearchedItems } from './dashboard';
import { ItemApi } from 'services/itemApi';
import { setItemData } from 'store/item/item';

export const fetchCategories = createAsyncThunk<void, { id?: string }>('dashboard/category', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(toggleIsLoading(true));
    const response = (await DashboardApi.getCategory(data.id)) as AxiosResponse<CategoryType[]>;

    if (response?.status === 200) {
      thunkAPI.dispatch(setCategories(response.data));
    } else {
      // WIP read error
      thunkAPI.dispatch(setError('Couldn`t fetch category'));
    }
    thunkAPI.dispatch(toggleIsLoading(false));
  } catch (error) {
    //  WIP alert here
    thunkAPI.dispatch(setError('Something is wrong Thunk'));
  }
});

export const fetchSubCategories = createAsyncThunk<void, { id?: string }>(
  'dashboard/subCategory',
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(toggleIsLoading(true));
      const response = (await DashboardApi.getSubCategory(data.id)) as AxiosResponse<SubCategoryType[]>;
      if (response?.status === 200) {
        thunkAPI.dispatch(setSubCategories(response.data));
      } else {
        // WIP read error
        thunkAPI.dispatch(setError('Couldn`t fetch subCategory'));
      }
      thunkAPI.dispatch(toggleIsLoading(false));
    } catch (error) {
      //  WIP alert here
      thunkAPI.dispatch(setError('Something is wrong Thunk'));
    }
  },
);

export const fetchItems = createAsyncThunk<void, void>('dashboard/all-items', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(toggleIsLoading(true));
    const response = (await ItemApi.getItems()) as AxiosResponse<ItemType[]>;
    if (response?.status === 200) {
      thunkAPI.dispatch(setLikedItems(response.data));
    } else {
      // WIP read error
      thunkAPI.dispatch(setError('Couldn`t fetch items'));
    }
    thunkAPI.dispatch(toggleIsLoading(false));
  } catch (error) {
    //  WIP alert here
    thunkAPI.dispatch(setError('Something is wrong Thunk'));
  }
});

export const fetchItemsWithFilters = createAsyncThunk<void, { [keys: string]: string }>(
  'items-by-filters',
  async (data, thunkAPI) => {
    try {
      const response = (await ItemApi.getItems(data)) as AxiosResponse<ItemType[]>;
      if (response?.status === 200) {
        thunkAPI.dispatch(setSearchedItems(response.data));
      } else {
        // WIP read error
        thunkAPI.dispatch(setError('Couldn`t fetch items'));
      }
    } catch (error) {
      //  WIP alert here
      thunkAPI.dispatch(setError('Something is wrong Thunk'));
    }
  },
);
