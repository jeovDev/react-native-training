import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Entry from './Stack/Entry';

const RouterStack = createNativeStackNavigator();

const MainRouter = () => {
  return (
    <NavigationContainer>
      <RouterStack.Navigator>
        <RouterStack.Screen
          name="Entry"
          component={Entry}
          options={{ headerShown: false }}
        />
      </RouterStack.Navigator>
    </NavigationContainer>
  );
};
export default MainRouter;
