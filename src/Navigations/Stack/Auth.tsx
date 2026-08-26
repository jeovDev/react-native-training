import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SigninScreen from '../../Screens/auth/signin/SigninScreen';
import SignupScreen from '../../Screens/auth/signup/SignupScreen';

const Auth = createNativeStackNavigator();
export default function AuthStack() {
  return (
    <>
      <Auth.Navigator initialRouteName="SigninScreen">
        <Auth.Screen
          name="SigninScreen"
          component={SigninScreen}
          options={{ headerShown: false }}
        />
        <Auth.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{ title: 'Signup' }}
          // options={{ headerShown: false }}
        />
      </Auth.Navigator>
    </>
  );
}
