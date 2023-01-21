import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { DashboardApi } from 'services/dashboardAPI';
import { CategoryType, SubCategoryType } from 'store/category/category-types';
import { ItemType } from 'store/item/item-types';

interface DashboardInitialType {
  categories: CategoryType[];
  subCategories: SubCategoryType[];
  likedItems: ItemType[];
}

export const initialState: DashboardInitialType = {
  categories: [] as CategoryType[],
  subCategories: [] as SubCategoryType[],
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
    setLikedItems(state, action: PayloadAction<ItemType[]>) {
      state.likedItems = action.payload;
    },
  },
});

export const { setCategories, setSubCategories, setLikedItems } = dashboardReducer.actions;

export default dashboardReducer.reducer;
