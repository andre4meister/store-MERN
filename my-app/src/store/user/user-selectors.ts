import { createSelector } from 'reselect';
import { AppStateType } from 'store/store';

export const selectUserReducerState = (state: AppStateType) => state.userReducer;

export const selectUserReviews = createSelector([selectUserReducerState], (userReducer) => userReducer.userReviews);

export const selectUserOrders = createSelector([selectUserReducerState], (userReducer) => userReducer.userOrders);

export const selectIsAuth = createSelector([selectUserReducerState], (userReducer) => userReducer.isAuth);

export const selectLoginError = createSelector([selectUserReducerState], (userReducer) => userReducer.loginError);

export const selectUserData = createSelector([selectUserReducerState], (userReducer) => userReducer.userData);
