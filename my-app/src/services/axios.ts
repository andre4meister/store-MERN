import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { dispatchLoginFailure } from 'store/user/user-thunks';
import getToken from 'utils/commonUtils/getToken';

const backendUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000/' : 'https://web-store-mern.onrender.com/';
console.log(backendUrl);
const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = getToken();

    if (config.headers) {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
      config.headers['Access-Control-Allow-Origin'] = backendUrl;
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
      dispatchLoginFailure(error.response?.data.message);
    }
    const response = error.response ? error.response : error;
    return response;
  },
);

export default axiosInstance;
