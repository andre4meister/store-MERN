import { ItemType } from 'store/item/item-types';
import userReducer, { UserReducerStateType } from './user';
import { UserType, RoleEnum, ShipmentMethodType } from './user-types';

const initialState: UserReducerStateType = {
  userData: {
    _id: '123',
    userName: 'johndoe',
    role: RoleEnum.user,
    firstName: 'John',
    lastName: 'Doe',
    phone: '555-555-5555',
    email: 'johndoe@example.com',
    deliveryMethod: [
      {
        country: 'Ukraine',
        city: 'Kyiv',
        postMethod: ShipmentMethodType.NovaPoshta,
        chosenDepartment: 1,
      },
    ],
    likedItems: [],
    basketItems: [],
    orders: [],
  },
  loginError: '',
  isAuth: true,
};

describe('userReducer', () => {
  it('should return the initial state', () => {
    const expectedState = {
      userData: {} as UserType,
      loginError: '',
      isAuth: false,
    };
    expect(userReducer(undefined, { type: '', payload: {} })).toEqual(expectedState);
  });

  it('should handle login', () => {
    const userData: UserType = {
      _id: '123',
      userName: 'johndoe',
      role: RoleEnum.user,
      firstName: 'John',
      lastName: 'Doe',
      phone: '555-555-5555',
      email: 'johndoe@example.com',
      deliveryMethod: [
        {
          country: 'Ukraine',
          city: 'Kyiv',
          postMethod: ShipmentMethodType.NovaPoshta,
          chosenDepartment: 1,
        },
      ],
      likedItems: [] as ItemType[],
      basketItems: [] as ItemType[],
      orders: [] as [],
    };
    const expectedState = {
      userData,
      loginError: '',
      isAuth: true,
    };
    expect(userReducer(undefined, { type: 'user/login', payload: userData })).toEqual(expectedState);
  });

  it('should handle logout', () => {
    const expectedState = {
      userData: {} as UserType,
      loginError: '',
      isAuth: false,
    };
    expect(userReducer(initialState, { type: 'user/logout', payload: {} })).toEqual(expectedState);
  });

  it('should handle loginFailure', () => {
    const loginError = 'Invalid credentials';
    const expectedState = {
      userData: {} as UserType,
      loginError,
      isAuth: false,
    };
    expect(userReducer(initialState, { type: 'user/loginFailure', payload: loginError })).toEqual(expectedState);
  });
});
