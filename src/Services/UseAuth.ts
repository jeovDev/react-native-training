// import { API } from '../lib/config/api';
import Toast from 'react-native-simple-toast';
// import api from '../lib/axios';
import api from '../Lib/axios/axios';
// import { mmkvStorage } from '../lib/storage/mmkv';
// import { USER } from '../lib/config/user';
import { API } from '../Config/api';
import { mmkvStorage } from '../Storage/mmkv';
import { USER } from '../Config/constant/user';

export function useAuth() {
  // login
  const signin = async (payload: { email: string; password: string }) => {
    try {
      const response = await api.post(`${API.API_URL}/auth/signin`, payload);
      return response.data;
    } catch (error: any) {
      Toast.showWithGravity(
        error?.response?.data?.message || 'an error occured',
        Toast.LONG,
        Toast.CENTER,
      );
    }
  };

  // register
  const register = async ({
    first_name,
    last_name,
    email,
  }: {
    first_name: string;
    last_name: string;
    email: string;
  }) => {
    try {
      const response = await api.post(`${API.API_URL}/employee/register`, {
        first_name,
        last_name,
        email,
      });
      return response.data;
    } catch (error: any) {
      console.log('error', error.response.status);
      if (error.response.status === 404) {
        return Toast.showWithGravity(
          error.response.data.error,
          Toast.LONG,
          Toast.CENTER,
        );
      }
      Toast.showWithGravity(
        error.response.data.message,
        Toast.LONG,
        Toast.CENTER,
      );
    }
  };

  const me = async () => {
    try {
      const response = await api.get(`${API.API_URL}/employee/me`);
      return response.data;
    } catch (error: any) {
      console.log('error', error.response);
      if (error.response.status === 400) {
        return Toast.showWithGravity(
          error?.response?.data?.error,
          Toast.LONG,
          Toast.CENTER,
        );
      }
      if (error.response.status === 401) {
        const keysToRemove = [
          USER.ACCESS_TOKEN,
          USER.FCM_TOKEN,
          USER.USER_DATA,
        ];
        await keysToRemove.forEach(key => mmkvStorage.delete(key));
        return Toast.showWithGravity(
          error?.response?.data?.error,
          Toast.LONG,
          Toast.CENTER,
        );
      }
      Toast.showWithGravity(
        error?.response?.data?.error,
        Toast.LONG,
        Toast.CENTER,
      );
    }
  };

  // Logout
  const logout = async () => {
    try {
      const response = await api.get(`${API.API_URL}/auth/logout`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      Toast.showWithGravity(
        error.response.data.message,
        Toast.LONG,
        Toast.CENTER,
      );
    }
  };

  return {
    signin,
    register,
    me,
    logout,
  };
}
