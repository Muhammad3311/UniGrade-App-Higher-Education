// React Native Style Sheet for Text Button
import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export default StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    justifyContent: 'center',
  },
  label: {
    color: Colors.white,
  },
});
