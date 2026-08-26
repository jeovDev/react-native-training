import axios from 'axios';
import { API } from '../../Config/api';
// import { mmkvStorage } from '../storage/mmkv-storage';
// import { USER } from '../../config/constant/user';
import { USER } from '../../Config/constant/user';
import { mmkvStorage } from '../../Storage/mmkv';

const api = axios.create({
  baseURL: API.API_URL, // replace with your API
  timeout: 10000,
});

// Example: request interceptor for token
api.interceptors.request.use(
  async config => {
    const token = mmkvStorage.getString(USER.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default api;
