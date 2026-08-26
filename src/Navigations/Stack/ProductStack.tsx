import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddProductScreen from '../../Screens/Product/AddProductScreen';
import ProductScreen from '../../Screens/Product/ProductScreen';
import ProductDetailScreen from '../../Screens/Product/ProductDetailScreen';

const Product = createNativeStackNavigator();
export default function ProductStack() {
  return (
    <>
      <Product.Navigator initialRouteName="ProductScreen">
        <Product.Screen
          name="ProductScreen"
          component={ProductScreen}
          options={{ headerShown: false }}
        />
        <Product.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
          options={{ title: 'Product' }}
          // options={{ headerShown: false }}
        />
        <Product.Screen
          options={{ title: 'Create Product' }}
          name="AddProductScreen"
          component={AddProductScreen}
          // options={{  }}
        />
      </Product.Navigator>
    </>
  );
}
