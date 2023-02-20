import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ReviewApi } from 'services/reviewAPI';
import { UserAPI } from 'services/userAPI';
import { addNotification } from 'store/alert/alert';
import { toggleIsLoading } from 'store/app/app';
import { WithToken } from 'store/commonTypes';
import { ReviewType } from 'store/item/item-types';
import { RootState } from 'store/store';
import {
  UserReducerStateType,
  setUserData,
  logout,
  loginFailure,
  UpdateUserType,
  WithIdType,
  LoginFormWithNavigate,
  RegistrationFormWithNavigate,
} from './user';
import { ChangeUserCartAndWishItemsType, FetchCartItem, UserType } from './user-types';

export const fetchLogin = createAsyncThunk('user/login', async (args: LoginFormWithNavigate, thunkAPI) => {
  try {
    const { navigateFromLogin, values } = args;
    thunkAPI.dispatch(toggleIsLoading(true));
    const response = (await UserAPI.login(values)) as AxiosResponse<Pick<UserReducerStateType, 'userData'> & WithToken>;
    if (response?.status === 200) {
      thunkAPI.dispatch(addNotification({ message: 'You succesfully logged in', type: 'success' }));
      thunkAPI.dispatch(setUserData(response.data.userData));

      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('isAuth', JSON.stringify(true));

      if (navigateFromLogin) {
        navigateFromLogin('/');
      }
    } else {
      thunkAPI.dispatch(addNotification({ message: 'Incorrect email or password', type: 'error' }));
      thunkAPI.dispatch(loginFailure('Incorrect email or password'));
    }
    thunkAPI.dispatch(toggleIsLoading(false));
  } catch (error) {
    thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
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
        thunkAPI.dispatch(
          addNotification({
            message: 'Incorrect values or user with this email/userName already exists',
            type: 'error',
          }),
        );
        thunkAPI.dispatch(loginFailure('Incorrect values or user with this email/userName already exists'));
      }
      thunkAPI.dispatch(toggleIsLoading(false));
    } catch (error) {
      thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
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
        thunkAPI.dispatch(addNotification({ message: 'Your profile data was updated', type: 'info' }));
        thunkAPI.dispatch(setUserData(response.data));
      } else {
        thunkAPI.dispatch(addNotification({ message: 'Your session has expired, login again', type: 'error' }));
        thunkAPI.dispatch(loginFailure('expire token'));
      }
      thunkAPI.dispatch(toggleIsLoading(false));
    } catch (error) {
      thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
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
        thunkAPI.dispatch(addNotification({ message: 'Your password was updated', type: 'info' }));
        thunkAPI.dispatch(setUserData(response.data));
      } else {
        thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
        thunkAPI.dispatch(loginFailure('Incorrect values'));
      }
      thunkAPI.dispatch(toggleIsLoading(false));
    } catch (error) {
      thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
      thunkAPI.dispatch(loginFailure('Something is wrong Thunk'));
    }
  },
);

export const fetchDeleteAccount = createAsyncThunk<void, WithIdType>('user/delete-account', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(toggleIsLoading(true));
    const response = (await UserAPI.deleteAccount(data)) as AxiosResponse<UserType>;
    if (response?.status === 200) {
      thunkAPI.dispatch(dispatchLogout());
    } else {
      thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
      thunkAPI.dispatch(loginFailure('Couldn`t delete your account, try again'));
    }
    thunkAPI.dispatch(toggleIsLoading(false));
  } catch (error) {
    thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
    thunkAPI.dispatch(loginFailure('Something is wrong Thunk'));
  }
});

export const dispatchLoginFailure = createAsyncThunk<void, string>(
  'user/dispatch-login-failure',
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(loginFailure(data));
    } catch (e) {
      thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
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
    const stringifyUserData = localStorage.getItem('userData') || 'null';
    const userData: UserType = JSON.parse(stringifyUserData);
    console.log(userData);
    if (userData) {
      thunkAPI.dispatch(toggleIsLoading(true));
      const response = (await UserAPI.getUserById(userData._id)) as AxiosResponse<UserType>;
      if (response.status === 200) {
        thunkAPI.dispatch(setUserData(response.data));
      } else {
        thunkAPI.dispatch(loginFailure('expire token'));
      }
      thunkAPI.dispatch(toggleIsLoading(false));
    } else {
      thunkAPI.dispatch(logout());
    }
  } catch (e) {
    console.log(e);
  }
});

export const fetchAddItemToLiked = createAsyncThunk<void, ChangeUserCartAndWishItemsType>(
  'user/addUserToLikedItems',
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(toggleIsLoading(true));
      const response = (await UserAPI.addItemToLiked(data)) as AxiosResponse<UserType>;
      if (response?.status === 200) {
        const user: UserType = response.data;
        thunkAPI.dispatch(setUserData(user));
      } else {
        thunkAPI.dispatch(addNotification({ message: 'You already added this item', type: 'error' }));
      }
      thunkAPI.dispatch(toggleIsLoading(false));
    } catch (error) {
      thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
      thunkAPI.dispatch(loginFailure('Something is wrong Thunk'));
    }
  },
);

export const fetchDeleteItemFromLiked = createAsyncThunk<void, ChangeUserCartAndWishItemsType>(
  'user/deleteUserFromLikedItems',
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(toggleIsLoading(true));
      const response = (await UserAPI.deleteItemFromLiked(data)) as AxiosResponse<UserType>;
      if (response?.status === 200) {
        const user: UserType = response.data;
        thunkAPI.dispatch(setUserData(user));
      } else {
        thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
        thunkAPI.dispatch(loginFailure('Couldn`t delete item from liked items, try again'));
      }
      thunkAPI.dispatch(toggleIsLoading(false));
    } catch (error) {
      thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
      thunkAPI.dispatch(loginFailure('Something is wrong Thunk'));
    }
  },
);

export const fetchAddItemToUserCart = createAsyncThunk<void, FetchCartItem>(
  'user/addItemToUserCart',
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(toggleIsLoading(true));
      const response = (await UserAPI.addItemToUserCart(data)) as AxiosResponse<UserType>;
      if (response?.status === 200) {
        const user: UserType = response.data;
        thunkAPI.dispatch(setUserData(user));
        thunkAPI.dispatch(addNotification({ message: 'Item was added to your cart', type: 'info' }));
      } else {
        thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
        thunkAPI.dispatch(loginFailure('Couldn`t add item to cart, try again'));
      }
      thunkAPI.dispatch(toggleIsLoading(false));
    } catch (error) {
      thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
      thunkAPI.dispatch(loginFailure('Something is wrong Thunk'));
    }
  },
);

export const fetchDeleteItemFromUserCart = createAsyncThunk<void, FetchCartItem>(
  'user/deleteItemFromUserCart',
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(toggleIsLoading(true));
      const response = (await UserAPI.deleteItemFromUserCart(data)) as AxiosResponse<UserType>;
      if (response?.status === 200) {
        const user: UserType = response.data;
        thunkAPI.dispatch(setUserData(user));
        thunkAPI.dispatch(addNotification({ message: 'Item was deleted from your cart', type: 'info' }));
      } else {
        thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
        thunkAPI.dispatch(loginFailure('Couldn`t delete item from the cart, try again'));
      }
      thunkAPI.dispatch(toggleIsLoading(false));
    } catch (error) {
      thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
      thunkAPI.dispatch(loginFailure('Something is wrong Thunk'));
    }
  },
);

export const fetchReviewsByUserId = createAsyncThunk<ReviewType[] | undefined, { userId: string }>(
  'user/fetchReviewsByUserId',
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(toggleIsLoading(true));
      const response = (await ReviewApi.getReviews(data)) as AxiosResponse<ReviewType[]>;
      if (response?.status === 200) {
        return response.data;
      } else {
        thunkAPI.dispatch(
          addNotification({ message: "Couldn`t upload user's reviews, try again later", type: 'error' }),
        );
        thunkAPI.dispatch(loginFailure('Couldn`t delete item from the cart, try again'));
      }
      thunkAPI.dispatch(toggleIsLoading(false));
    } catch (error) {
      thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
      thunkAPI.dispatch(loginFailure('Something is wrong Thunk'));
    }
  },
);

export const fetchDeleteUserReview = createAsyncThunk<void, { reviewId: string }>(
  'user/fetchDeleteUserReview',
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(toggleIsLoading(true));
      const response = (await ReviewApi.deleteReview(data.reviewId)) as AxiosResponse<ReviewType>;
      if (response?.status === 200) {
        thunkAPI.dispatch(addNotification({ message: 'Review was deleted', type: 'success' }));
      } else {
        thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
        thunkAPI.dispatch(loginFailure('Couldn`t delete review, try again'));
      }
      thunkAPI.dispatch(toggleIsLoading(false));
    } catch (error) {
      thunkAPI.dispatch(addNotification({ message: 'Some error has occured, try again later', type: 'error' }));
      thunkAPI.dispatch(loginFailure('Something is wrong Thunk'));
    }
  },
);
