import { LoginFormType, RegistrationFormType } from './../../services/userAPI';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from './user-types';
import { NavigateFunction } from 'react-router-dom';
import { PersonalDataType } from 'components/SettingsForms/PersonalForm';
import { ChangeEmailType } from 'components/SettingsForms/ChangeLoginForm';
import { ChangePasswordType } from 'components/SettingsForms/ChangePasswordForm';
import { ContactsFormType } from 'components/SettingsForms/ContactsForm';

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
  isAuth: boolean;
  loginError: string;
  userData: UserType;
}

export const initialUserState: Omit<UserReducerStateType, 'password'> = {
  userData: {} as UserType,
  loginError: '',
  isAuth: false,
};

const userReducer = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    login(state, action: PayloadAction<UserType>) {
      state.userData = action.payload;
      state.isAuth = true;
      state.loginError = '';
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
  },
});

export const { login, loginFailure, logout } = userReducer.actions;

export default userReducer.reducer;
