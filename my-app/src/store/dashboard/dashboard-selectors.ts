import { createSelector } from 'reselect';
import { AppStateType } from 'store/store';

export const selectDashboardReducer = (state: AppStateType) => state.dashboardReducer;

export const selectLikedItems = createSelector(
  [selectDashboardReducer],
  (dashboardReducer) => dashboardReducer.likedItems,
);
