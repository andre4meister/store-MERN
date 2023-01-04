import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import store from 'store/store';
import { dispatchLoginFailure, loginFailure } from 'store/user/user';

const tokenFromLocalStorage = localStorage.getItem('token');
const token = tokenFromLocalStorage && (JSON.parse(tokenFromLocalStorage) as string);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.headers) {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
      config.headers['Access-Control-Allow-Origin'] = 'http://localhost:5000';
    }

    return config;
  },
  (error: AxiosError) => error,
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      dispatchLoginFailure('expire token');
    }
  },
);

export default axiosInstance;
