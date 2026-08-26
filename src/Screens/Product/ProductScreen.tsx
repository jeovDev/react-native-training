import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Nav } from '../../Lib/Nav';
export default function ProductScreen() {
  const navigation = useNavigation<Nav>();
  const products = [
    {
      prod: 'Keyboard',
      price: '300',
    },
    {
      prod: 'Mouse',
      price: '100',
    },
    {
      prod: 'Monitor',
      price: '10',
    },
    {
      prod: 'Video Card',
      price: '10',
    },
    {
      prod: 'RAM',
      price: '10',
    },
    {
      prod: 'SSD',
      price: '10',
    },
  ];
  return (
    <View style={{ flex: 1, padding: 10, paddingTop: 50 }}>
      <View
        style={{
          paddingBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Product List</Text>
        <TouchableOpacity
          // style={{ backgroundColor: 'red' }}
          onPress={() => {
            navigation.navigate('AddProductScreen', {});
          }}
        >
          <MaterialIcon name="add" size={24} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.prod}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              {
                padding: 15,
                borderBottomWidth: 1,
                borderColor: '#ddd',

                backgroundColor: pressed ? '#f0f0f0' : 'white',
              },
            ]}
            onPress={() =>
              navigation.navigate('ProductDetailScreen', {
                product: item.prod,
                price: item.price,
              })
            }
          >
            <Text
              style={{ fontWeight: 'bold', fontSize: 16, color: '#3b3b3b' }}
            >
              {item.prod}
            </Text>
            <Text>₱{item.price}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
