import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import styles from './Home-style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function Main() {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');

  const handleSubmit = () => {
    setDisplayText(inputText);
  };
  return (
    <View style={styles.container}>
      <View>
        <MaterialIcons name="home" size={50} color={'red'} />
        <Text style={{ fontSize: 50, color: '#232323', fontWeight: 'bold' }}>
          Hello World!
        </Text>
      </View>
      {/* <View style={styles.textContainer}>
        <Text style={styles.text}>Username</Text>
      </View>

      <TextInput style={styles.input} onChangeText={setInputText} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Password</Text>
      </View>
      <TextInput style={styles.input} onChangeText={setInputText} />
      <View style={styles.button}>
        <Button title="Submit" onPress={handleSubmit} />
      </View> */}
    </View>
  );
}
