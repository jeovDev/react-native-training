import { View, Text, Button } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Nav } from '../../Lib/Nav';
import { mmkvStorage } from '../../Storage/mmkv';
import { USER } from '../../Config/constant/user';
export default function SplashScreen() {
  const navigation = useNavigation<Nav>();
  // setTimeout(() => {
  //   navigation.navigate('AuthStack', {});
  // }, 2000);
  const getToken = async () => {
    const token = await mmkvStorage.getString(USER.ACCESS_TOKEN);
    if (token) {
      navigation.navigate('TabNavigation', {});
    } else {
      navigation.navigate('AuthStack', {});
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getToken();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome </Text>
    </View>
  );
}
