import { View, Text, TextInput } from 'react-native';
import React from 'react';
type fieldProps = {
  label: String;
  value: String;
  setValue: (value: string) => {};
};
export default function Field({ label, value, setValue }: fieldProps) {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput onChange={() => setValue} />
    </View>
  );
}
