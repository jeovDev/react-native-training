import {
  View,
  Text,
  Button,
  ActivityIndicator,
  TextInput,
  TouchableHighlight,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { mmkvStorage } from '../../Storage/mmkv';
import { USER } from '../../Config/constant/user';
import { useAuth } from '../../Services/UseAuth';
import { z } from 'zod';
import { useNavigation } from '@react-navigation/native';
import { Nav } from '../../Lib/Nav';
import { useProfile } from '../../Services/useProfile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFocused } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import ProfileScreenStyle from './profilescreen-style';

const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be at most 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be at most 50 characters'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[0-9\s\-()]+$/, 'Please enter a valid phone number'),
});
type ProfileForm = z.infer<typeof profileSchema>;

// import FastImage from 'react-native-fast-image';
export default function ProfileScreen() {
  const { me, updateProfile } = useProfile();
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [image, setImage] = useState(null);
  const navigation = useNavigation<Nav>();
  const userData = mmkvStorage.getString(USER.USER_DATA)
    ? JSON.parse(mmkvStorage.getString(USER.USER_DATA) || '')
    : null;
  const { logout } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
  });
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    const data = await me();
    console.log('Profile data:', data);
    if (data) {
      reset({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phoneNumber: data.phoneNumber || '',
      });
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  useEffect(() => {
    if (isFocused) {
      fetchProfile();
    }
  }, [isFocused, fetchProfile]);

  const onSubmit = async (data: ProfileForm) => {
    const response = await updateProfile(data);
    if (response) {
      reset(data);
    }
  };

  console.log(userData);

  const handleLogout = async () => {
    const result = await logout();
    console.log(result);
    if (result.success) {
      navigation.navigate('SplashScreen', {});
      // mmkvStorage.clearAll();
      mmkvStorage.remove(USER.ACCESS_TOKEN);
      mmkvStorage.remove(USER.USER_DATA);
    }
  };
  if (loading) {
    return (
      <View style={ProfileScreenStyle.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  const handleUpload = async () => {};
  return (
    <View style={ProfileScreenStyle.container}>
      <Text style={ProfileScreenStyle.title}>Profile</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          borderRadius: 16,
          backgroundColor: '#FFFFFF',
          gap: 16,
          marginBottom: 20,
        }}
      >
        {/* Avatar */}
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            overflow: 'hidden',
            borderWidth: 3,
            borderColor: '#E5E7EB',
          }}
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              source={require('../../assets/images/avatar.jpg')}
              style={{ width: 100, height: 100 }}
            />
          </View>
        </View>

        {/* Actions */}
        <View style={{ flex: 1, gap: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#111827',
              // marginBottom: 1,
              textTransform: 'uppercase',
            }}
          >
            {firstName} {lastName}
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: '#6B7280',
              marginBottom: 4,
            }}
          >
            Upload or take a new photo
          </Text>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#2563EB',
                paddingHorizontal: 14,
                paddingVertical: 9,
                borderRadius: 8,
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: '600',
                }}
              >
                Upload
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                paddingHorizontal: 14,
                paddingVertical: 9,
                borderRadius: 8,
                backgroundColor: '#FFFFFF',
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  color: '#374151',
                  fontSize: 13,
                  fontWeight: '600',
                }}
              >
                Take Picture
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* First Name */}
      <Text style={ProfileScreenStyle.label}>First Name</Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              ProfileScreenStyle.input,
              errors.firstName && ProfileScreenStyle.inputError,
            ]}
            placeholder="Enter your first name"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {errors.firstName && (
        <Text style={ProfileScreenStyle.error}>{errors.firstName.message}</Text>
      )}

      {/* Last Name */}
      <Text style={ProfileScreenStyle.label}>Last Name</Text>
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              ProfileScreenStyle.input,
              errors.lastName && ProfileScreenStyle.inputError,
            ]}
            placeholder="Enter your last name"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {errors.lastName && (
        <Text style={ProfileScreenStyle.error}>{errors.lastName.message}</Text>
      )}

      {/* Phone Number */}
      <Text style={ProfileScreenStyle.label}>Phone Number</Text>
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              ProfileScreenStyle.input,
              errors.phoneNumber && ProfileScreenStyle.inputError,
            ]}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {errors.phoneNumber && (
        <Text style={ProfileScreenStyle.error}>
          {errors.phoneNumber.message}
        </Text>
      )}

      {/* Submit */}
      <TouchableHighlight
        style={[
          ProfileScreenStyle.button,
          isSubmitting && ProfileScreenStyle.buttonDisabled,
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        <Text style={ProfileScreenStyle.buttonText}>
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={{
          padding: 15,
          marginTop: 10,
          borderWidth: 1,
          borderColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}
        onPress={handleLogout}
        // disabled={isSubmitting}
      >
        <Text style={{ color: 'red' }}>Sign-Out</Text>
      </TouchableHighlight>
    </View>
  );
}
