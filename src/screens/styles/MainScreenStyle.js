import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export default StyleSheet.create({
  adContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  graphText: {
    fontSize: 48, // Updated for a circle diameter of 220
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 32,
    letterSpacing: 1,
  },
  titleMsg: {
    color: Colors.white, //'#3664dc',
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    textAlign: 'center',
    // letterSpacing: 1,
  },
  titleMsgView: {paddingHorizontal: 2},
  titleView: {
    alignItems: 'center',
    // marginTop: 30,
    justifyContent: 'center',
    width: '100%',
  },
});
