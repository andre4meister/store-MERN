import { LoginFormType, RegistrationFormType, UserAPI } from './../../services/userAPI';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from './user-types';
import { NavigateFunction } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { WithToken } from 'store/commonTypes';
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

interface LoginFormWithNavigate extends NavigateType {
  values: LoginFormType;
}

interface RegistrationFormWithNavigate extends NavigateType {
  values: RegistrationFormType;
}
interface UserReducerStateType {
  isAuth: boolean;
  error: string;
  isLoading: boolean;
  userData: UserType;
}

const initialState: Omit<UserReducerStateType, 'password'> = {
  userData: {} as UserType,
  isLoading: false,
  error: '',
  isAuth: false,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserType>) {
      state.userData = action.payload;
      state.isAuth = true;
    },
    logout(state, action: PayloadAction) {
      state = { ...initialState };
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.userData = {} as UserType;
      state.isAuth = false;
      state.error = action.payload;
    },
    toggleIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const fetchLogin = createAsyncThunk('user/login', async (args: LoginFormWithNavigate, thunkAPI) => {
  try {
    const { navigateFromLogin, values } = args;
    thunkAPI.dispatch(toggleIsLoading(true));
    const response = (await UserAPI.login(values)) as AxiosResponse<Pick<UserReducerStateType, 'userData'> & WithToken>;
    if (response?.status === 200) {
      thunkAPI.dispatch(login(response.data.userData));

      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('userData', JSON.stringify(response.data.userData));
      localStorage.setItem('isAuth', JSON.stringify(true));

      if (navigateFromLogin) {
        navigateFromLogin('/');
      }
    } else {
      thunkAPI.dispatch(loginFailure('Incorrect email or password'));
    }
    thunkAPI.dispatch(toggleIsLoading(false));
  } catch (error) {
    //  WIP alert here
    thunkAPI.dispatch(loginFailure('Something went wrong Thunk'));
  }
});

export const fetchRegister = createAsyncThunk(
  'user/registration',
  async (args: RegistrationFormWithNavigate, thunkAPI) => {
    try {
      const { navigateFromLogin, values } = args;

      thunkAPI.dispatch(toggleIsLoading(true));
      const response = (await UserAPI.register(values)) as AxiosResponse<UserType>;
      if (response?.status === 201) {
        thunkAPI.dispatch(
          fetchLogin({
            values: { email: values.email, password: values.password },
            navigateFromLogin: navigateFromLogin,
          }),
        );
      } else {
        // WIP read error
        thunkAPI.dispatch(loginFailure('Incorrect values or user with this email/userName already exists'));
      }
      thunkAPI.dispatch(toggleIsLoading(false));
    } catch (error) {
      //  WIP alert here
      thunkAPI.dispatch(loginFailure('Something is wrong Thunk'));
    }
  },
);

export const fetchUpdatePersonalInfo = createAsyncThunk<void, UpdateUserType>(
  'user/update-info',
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(toggleIsLoading(true));
      const response = (await UserAPI.updatePersonalInfo(data)) as AxiosResponse<UserType>;
      if (response?.status === 200) {
        // WIP alert thunkAPI.dispatch();
        thunkAPI.dispatch(login(response.data));
      } else {
        // WIP read error
        thunkAPI.dispatch(loginFailure('expire token'));
      }
      thunkAPI.dispatch(toggleIsLoading(false));
    } catch (error) {
      //  WIP alert here
      thunkAPI.dispatch(loginFailure('Something is wrong Thunk'));
    }
  },
);

export const fetchUpdatePassword = createAsyncThunk<void, UpdateUserType>(
  'user/change-password',
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(toggleIsLoading(true));
      const response = (await UserAPI.updatePassword(data)) as AxiosResponse<UserType>;

      if (response?.status === 200) {
        // WIP alert thunkAPI.dispatch();
        thunkAPI.dispatch(login(response.data));
      } else {
        // WIP read error
        thunkAPI.dispatch(loginFailure('Incorrect values or user with this email/userName already exists'));
      }
      thunkAPI.dispatch(toggleIsLoading(false));
    } catch (error) {
      //  WIP alert here
      thunkAPI.dispatch(loginFailure('Something is wrong Thunk'));
    }
  },
);

export const fetchDeleteAccount = createAsyncThunk<void, WithIdType>('user/delete-account', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(toggleIsLoading(true));
    const response = (await UserAPI.deleteAccount(data)) as AxiosResponse<UserType>;
    if (response?.status === 200) {
      // WIP alert thunkAPI.dispatch();
      thunkAPI.dispatch(logout());
      window.location.reload();
    } else {
      // WIP read error
      thunkAPI.dispatch(loginFailure('Couldn`t delete your account, try again'));
    }
    thunkAPI.dispatch(toggleIsLoading(false));
  } catch (error) {
    //  WIP alert here
    thunkAPI.dispatch(loginFailure('Something is wrong Thunk'));
  }
});

export const dispatchLoginFailure = createAsyncThunk<void, string>(
  'user/dispatch-login-failure',
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(loginFailure(data));
    } catch (e) {
      console.log(e);
    }
  },
);

export const fetchGetProfile = createAsyncThunk<void, void>('user/get-profile', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(toggleIsLoading(true));
    const stringifyUserData = localStorage.getItem('userData') || 'null';
    const userData: UserType = JSON.parse(stringifyUserData);

    if (userData) {
      const response = (await UserAPI.getUserById(userData._id)) as AxiosResponse<UserType>;
      if (response.status === 200) {
        thunkAPI.dispatch(login(response.data));
      } else {
        thunkAPI.dispatch(loginFailure('expire token'));
      }
    }
    thunkAPI.dispatch(toggleIsLoading(false));
  } catch (e) {
    console.log(e);
  }
});

export const { login, loginFailure, logout, toggleIsLoading } = userReducer.actions;

export default userReducer.reducer;
