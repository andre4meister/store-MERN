import { LoginFormType, RegistrationFormType } from './../../services/userAPI';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from './user-types';
import { NavigateFunction } from 'react-router-dom';
import { PersonalDataType } from 'components/Settings/SettingsForms/PersonalForm';
import { ChangeEmailType } from 'components/Settings/SettingsForms/ChangeLoginForm';
import { ChangePasswordType } from 'components/Settings/SettingsForms/ChangePasswordForm';
import { ContactsFormType } from 'components/Settings/SettingsForms/ContactsForm';
import { ReviewType } from 'store/item/item-types';
import { OrderType } from 'store/order/order-types';

interface NavigateType {
  navigateFromLogin?: NavigateFunction | (() => void);
}

export interface WithIdType {
  _id: string;
}

export type UpdateUserType = WithIdType & (PersonalDataType | ChangeEmailType | ChangePasswordType | ContactsFormType);

export interface LoginFormWithNavigate extends NavigateType {
  values: LoginFormType;
}

export interface RegistrationFormWithNavigate extends NavigateType {
  values: RegistrationFormType;
}
export interface UserReducerStateType {
  isAuth: boolean | undefined;
  loginError: string;
  userData: UserType;
  userReviews: ReviewType[] | null;
  userOrders: OrderType[] | null;
}

export const initialUserState: Omit<UserReducerStateType, 'password'> = {
  userData: {} as UserType,
  loginError: '',
  isAuth: undefined,
  userOrders: null,
  userReviews: null,
};

const userReducer = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUserData(state, action: PayloadAction<UserType>) {
      state.userData = action.payload;
      state.isAuth = true;
      state.loginError = '';
      localStorage.setItem('userData', JSON.stringify(action.payload));
    },
    logout(state, action: PayloadAction) {
      state.loginError = '';
      state.isAuth = false;
      state.userData = {} as UserType;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loginError = action.payload;
      state.isAuth = false;
      state.userData = {} as UserType;
    },
    setUserReviews(state, action: PayloadAction<ReviewType[]>) {
      state.userReviews = action.payload;
    },
    setUserOrders(state, action: PayloadAction<OrderType[]>) {
      state.userOrders = action.payload;
    },
  },
});

export const { setUserData, loginFailure, logout, setUserReviews, setUserOrders } = userReducer.actions;

export default userReducer.reducer;
