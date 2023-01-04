import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user';

const rootReducer = combineReducers({
  userReducer,
});

const store = configureStore({
  reducer: {
    userReducer,
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
