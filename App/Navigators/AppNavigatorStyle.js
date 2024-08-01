import {StyleSheet} from 'react-native';
import Colors from '../theme';

export default StyleSheet.create({
  headerTitleMargin: {marginLeft: 30},
  mainTitle: {
    color: Colors.white,
    // fontFamily: 'Roboto-Regular',
    fontSize: 24,
    letterSpacing: 2,
    textAlign: 'left',
  },
  rightImage: {
    borderRadius: 15,
    height: 50,
    width: 50,
  },
});
