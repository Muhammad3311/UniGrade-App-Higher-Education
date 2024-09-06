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
    width: responsiveWidth(100),
  },
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  containerStyle: {alignItems: 'center', paddingHorizontal: 10},
  graphText: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(5.5), // Updated for a circle diameter of 220
    textAlign: 'center',
  },
  leftComponentStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(2.8),
  },
  mainView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    width: responsiveWidth(100),
  },
  rightComponentStyle: {right: 10},
  subTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(3),
    letterSpacing: 1,
    lineHeight: 50,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(3.5),
    letterSpacing: 1,
  },
  titleMsg: {
    color: Colors.white,
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
