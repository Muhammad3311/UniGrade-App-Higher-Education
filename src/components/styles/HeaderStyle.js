// React Native Style sheet of Header Detail
import {StyleSheet} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: responsiveHeight(7),
  },
  leftView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
  },
});
