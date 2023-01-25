import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { UserAPI } from 'services/userAPI';
import { toggleIsLoading } from 'store/app/app';
import { WithToken } from 'store/commonTypes';
import {
  UserReducerStateType,
  login,
  logout,
  loginFailure,
  UpdateUserType,
  WithIdType,
  LoginFormWithNavigate,
  RegistrationFormWithNavigate,
} from './user';
import { UserType } from './user-types';

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
      thunkAPI.dispatch(dispatchLogout());
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

export const dispatchLogout = createAsyncThunk<void, void>('user/dispatch-logout', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(logout());
    UserAPI.logout();
  } catch (e) {
    console.log(e);
  }
});

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
