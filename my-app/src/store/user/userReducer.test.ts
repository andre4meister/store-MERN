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
    cart: [],
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
      isAuth: undefined,
    };
    expect(userReducer(undefined, { type: '', payload: {} })).toEqual(expectedState);
  });

  it('should handle setUserData', () => {
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
      likedItems: [],
      cart: [],
      orders: [],
    };
    const expectedState = {
      userData,
      loginError: '',
      isAuth: true,
    };
    expect(userReducer(undefined, { type: 'user/setUserData', payload: userData })).toEqual(expectedState);
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
