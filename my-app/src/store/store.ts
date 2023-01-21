import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user';
import dashboardReducer from './dashboard/dashboard';
import itemReducer from './item/item';

const rootReducer = combineReducers({
  userReducer,
  dashboardReducer,
  itemReducer,
});

export const createReduxStore = (initialState: RootState = {} as RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
};

const store = createReduxStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
