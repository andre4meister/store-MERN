import { initialAppState } from './app/app';
import { initialDashboardState } from './dashboard/dashboard';
import { initialItemState } from './item/item';
import { RootState } from './store';
import { initialUserState } from './user/user';

export const initialStore: RootState = {
  dashboardReducer: initialDashboardState,
  itemReducer: initialItemState,
  userReducer: initialUserState,
  appReducer: initialAppState,
};
