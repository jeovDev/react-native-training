import { View, Text, Button } from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { mmkvStorage } from '../../Storage/mmkv';
import { USER } from '../../Config/constant/user';
import { useAuth } from '../../Services/UseAuth';
import { useNavigation } from '@react-navigation/native';
import { Nav } from '../../Lib/Nav';
export default function ProfileScreen() {
  const navigation = useNavigation<Nav>();
  const userData = JSON.parse(mmkvStorage.getString(USER.USER_DATA) || '');
  const { logout } = useAuth();
  console.log(userData);
  const handleLogout = async () => {
    const result = await logout();
    console.log(result);
    if (result.success) {
      navigation.navigate('SplashScreen', {});
    }
  };
  return (
    <View style={{ paddingTop: 30, padding: 10, flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {/* <MaterialIcon name="person" /> */}
        <Text>{userData.user_metadata.name}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}
