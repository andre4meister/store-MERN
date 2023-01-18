import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { DashboardApi } from 'services/dashboardAPI';
import { CategoryType, SubCategoryType } from 'store/category/category-types';
import { ItemType } from 'store/item/item-types';
import { toggleIsLoading } from 'store/user/user';

interface DashboardInitialType {
  categories: CategoryType[];
  subCategories: SubCategoryType[];
  likedItems: ItemType[];
  error: string;
}

const initialState: DashboardInitialType = {
  categories: [] as CategoryType[],
  subCategories: [] as SubCategoryType[],
  error: '',
  likedItems: [] as ItemType[],
};

const dashboardReducer = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<CategoryType[]>) {
      state.categories = action.payload;
    },
    setSubCategories(state, action: PayloadAction<SubCategoryType[]>) {
      state.subCategories = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setLikedItems(state, action: PayloadAction<ItemType[]>) {
      state.likedItems = action.payload;
    },
  },
});

export const fetchCategories = createAsyncThunk<void, { id?: string }>('dashboard/category', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(toggleIsLoading(true));
    const response = (await DashboardApi.getCategory(data.id)) as AxiosResponse<CategoryType[]>;

    if (response?.status === 200) {
      // WIP alert thunkAPI.dispatch();
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
        // WIP alert thunkAPI.dispatch();
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

export const fetchAllItems = createAsyncThunk<void, void>('dashboard/all-items', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(toggleIsLoading(true));
    const response = (await DashboardApi.getAllItems()) as AxiosResponse<ItemType[]>;
    if (response?.status === 200) {
      // WIP alert thunkAPI.dispatch();
      thunkAPI.dispatch(setLikedItems(response.data));
    } else {
      // WIP read error
      thunkAPI.dispatch(setError('Couldn`t fetch liked items'));
    }
    thunkAPI.dispatch(toggleIsLoading(false));
  } catch (error) {
    //  WIP alert here
    thunkAPI.dispatch(setError('Something is wrong Thunk'));
  }
});

export const { setCategories, setError, setSubCategories, setLikedItems } = dashboardReducer.actions;

export default dashboardReducer.reducer;
