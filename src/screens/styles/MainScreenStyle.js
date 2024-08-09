import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  adContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    width: responsiveWidth(100),
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  containerStyle: {alignItems: 'center', padding: 10},
  graphText: {
    fontSize: responsiveFontSize(5.5), // Updated for a circle diameter of 220
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  leftComponentStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(2.7),
  },
  mainView: {
    alignItems: 'center',
    // flex: 1,
    justifyContent: 'space-around',
    height: responsiveHeight(80),
    width: responsiveWidth(100),
  },
  rightComponentStyle: {right: 10},
  subTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(3.5),
    letterSpacing: 1,
    lineHeight: 50,
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(4),
    letterSpacing: 1,
  },
  titleMsg: {
    color: Colors.white, //'#3664dc',
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(2.8),
    marginBottom: responsiveHeight(2.5),
    textAlign: 'center',
    paddingHorizontal: responsiveWidth(1.8),
  },
  titleView: {
    alignItems: 'center',
  },
});
