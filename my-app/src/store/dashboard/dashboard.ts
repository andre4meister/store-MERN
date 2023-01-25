import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryType, SubCategoryType } from 'store/category/category-types';
import { ItemType } from 'store/item/item-types';

interface DashboardInitialType {
  categories: CategoryType[];
  subCategories: SubCategoryType[];
  likedItems: ItemType[];
}

export const initialDashboardState: DashboardInitialType = {
  categories: [] as CategoryType[],
  subCategories: [] as SubCategoryType[],
  likedItems: [] as ItemType[],
};

const dashboardReducer = createSlice({
  name: 'dashboard',
  initialState: initialDashboardState,
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
