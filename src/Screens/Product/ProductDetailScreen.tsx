import { View, Text } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default function ProductDetailScreen({ route }: { route: any }) {
  const { product, price } = route.params;
  // console.log(product);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: hp('50%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 50, fontWeight: 'bold' }}>{product}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Price : {price}
        </Text>
      </View>
    </View>
  );
}
