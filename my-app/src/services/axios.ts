import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { dispatchLoginFailure } from 'store/user/user';

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
  (error: AxiosError) => {
    const response = error.response;
    return response;
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string; error: string }>) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      dispatchLoginFailure(error.response?.data.error);
    }
    const response = error.response;
    return response;
  },
);

export default axiosInstance;
