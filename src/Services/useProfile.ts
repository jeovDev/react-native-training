import Toast from 'react-native-simple-toast';
import api from '../Lib/axios/axios';
import { API } from '../Config/api';
import { mmkvStorage } from '../Storage/mmkv';
import { USER } from '../Config/constant/user';

export function useProfile() {
  const me = async () => {
    try {
      const response = await api.get(`/profiles/me`);
      return response.data;
    } catch (error: any) {
      Toast.showWithGravity(
        error?.response?.data?.message || 'an error occured',
        Toast.LONG,
        Toast.CENTER,
      );
    }
  };

  const updateProfile = async ({
    firstName,
    lastName,
    phoneNumber,
    avatar,
  }: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    avatar?: string;
  }) => {
    try {
      const response = await api.patch(`/profiles/me`, {
        firstName,
        lastName,
        phoneNumber,
        avatar,
      });
      Toast.showWithGravity('Updated Successfully', Toast.LONG, Toast.CENTER);
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

  return {
    me,
    updateProfile,
  };
}
