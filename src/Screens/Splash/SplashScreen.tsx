import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Nav } from '../../Lib/Nav';
export default function SplashScreen() {
  const navigation = useNavigation<Nav>();
  setTimeout(() => {
    navigation.navigate('AuthStack', {});
  }, 2000);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome </Text>
    </View>
  );
}
