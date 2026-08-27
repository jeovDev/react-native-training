import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { mmkvStorage } from '../../../Storage/mmkv';
import { useNavigation } from '@react-navigation/native';
import { USER } from '../../../Config/constant/user';
import { useAuth } from '../../../Services/UseAuth';
const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type SignInForm = z.infer<typeof signInSchema>;

const SigninScreen = () => {
  //   const [user, setUser] = useState('');
  const { signin } = useAuth();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'jeov@example.com',
      password: 'P@ssw0rd',
    },
  });

  const onSubmit = async (data: SignInForm) => {
    console.log('Login data:', data);

    const response = await signin(data);
    if (response) {
      mmkvStorage.set(USER.ACCESS_TOKEN, response.session.access_token);
      mmkvStorage.set(USER.USER_DATA, JSON.stringify(response.user));
      navigation.navigate('TabNavigation' as never);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {/* Email */}
      <Text style={styles.label}>Email</Text>

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Please enter a valid email',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />

      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Password */}
      <Text style={styles.label}>Password</Text>

      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Enter your password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />

      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {/* Submit */}
      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Text>
      </TouchableOpacity>
      {/* <Text>user {user}</Text> */}
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 5,
  },

  inputError: {
    borderColor: 'red',
  },

  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 15,
  },

  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    marginTop: 20,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
