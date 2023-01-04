import { WithToken } from 'store/commonTypes';
import { UpdateUserType, WithIdType } from 'store/user/user';
import { UserType } from 'store/user/user-types';
import axiosInstance from './axios';

export interface LoginFormType {
  email: string;
  password: string;
}

export interface RegistrationFormType extends LoginFormType {
  confirm: string;
  userName: string;
  agreement: boolean;
  phone?: string;
}

export class UserAPI {
  static async getUserById(id: string) {
    try {
      const response = await axiosInstance.get<UserType & WithToken>(`users/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async login(data: LoginFormType) {
    try {
      const response = await axiosInstance.post<UserType & WithToken>('auth/login', JSON.stringify(data));
      return response;
    } catch (e) {
      return e;
    }
  }

  static logout() {
    localStorage.setItem('isAuth', JSON.stringify(false));
    localStorage.setItem('userData', '');
    localStorage.setItem('token', '');
    window.location.reload();
  }

  static async register(data: RegistrationFormType) {
    try {
      const { email, password, userName, phone } = data;
      const body = { email, password, userName, phone };

      const response = await axiosInstance.post<UserType>('auth/register', JSON.stringify(body));
      return response;
    } catch (e) {
      return e;
    }
  }

  static async updatePersonalInfo(data: UpdateUserType) {
    try {
      const response = await axiosInstance.put<UserType>(`users/${data._id}`, JSON.stringify(data));
      return response;
    } catch (e) {
      return e;
    }
  }

  static async updatePassword(data: UpdateUserType) {
    try {
      const response = await axiosInstance.put<UserType>(`users/change-password/${data._id}`, JSON.stringify(data));
      return response;
    } catch (e) {
      return e;
    }
  }

  static async deleteAccount(data: WithIdType) {
    try {
      const response = await axiosInstance.delete<UserType>(`users/${data._id}`);
      return response;
    } catch (e) {
      return e;
    }
  }
}
