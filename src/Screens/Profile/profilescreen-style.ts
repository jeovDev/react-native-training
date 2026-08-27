import { StyleSheet } from 'react-native';

const ProfileScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 100,
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

export default ProfileScreenStyle;
