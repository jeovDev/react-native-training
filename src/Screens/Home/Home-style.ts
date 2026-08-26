import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: wp('70%'),
  },
  textContainer: {
    // backgroundColor: 'red',
    width: wp('70%'),
    // flex: 1,
    // justifyContent: 'flex-start',
  },
  text: {
    fontSize: 12,

    // alignItems: 'flex-start',
  },
  container: {
    backgroundColor: '#e4e8eb',
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#e7e7e7',
    width: wp('70%'),
  },
});

export default styles;
