import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../Screens/Home/Home';
import ProductScreen from '../../Screens/Product/ProductScreen';
import ProfileScreen from '../../Screens/Profile/ProfileScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Product from '../Stack/ProductStack';
import ProductStack from '../Stack/ProductStack';
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: '#9ea1e4',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="home"
              size={size}
              color={focused ? '#9ea1e4' : 'black'}
            />
          ),
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialIcons name="home" size={size} color={'black'} />
          // ),
        }}
      />
      <Tab.Screen
        name="ProductScreen"
        component={ProductStack}
        options={{
          title: 'Product',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="category"
              size={size}
              color={focused ? '#9ea1e4' : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="person"
              size={size}
              color={focused ? '#9ea1e4' : 'black'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
