import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../Screens/Splash/SplashScreen';
import TabNavigation from '../Tab/index';
import AddProductScreen from '../../Screens/Product/AddProductScreen';
import AuthStack from './Auth';

const EntryStack = createNativeStackNavigator();

const Entry = () => {
  return (
    <>
      <EntryStack.Navigator>
        <EntryStack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <EntryStack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <EntryStack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
      </EntryStack.Navigator>
    </>
  );
};

export default Entry;
