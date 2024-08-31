import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  contactView: {
    borderTopLeftRadius: responsiveWidth(12),
    borderTopRightRadius: responsiveWidth(12),
    flex: 1,
    marginTop: responsiveHeight(-5),
    paddingHorizontal: responsiveWidth(4),
    paddingTop: responsiveHeight(6),
    width: responsiveWidth(100),
    zIndex: -1,
  },
  iconText: {
    color: Colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(2),
    paddingLeft: 10,
    textAlign: 'left',
  },
  iconTextView: {
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    height: responsiveHeight(25),
  },
  iconView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: responsiveWidth(100),
  },
  image: {
    borderColor: Colors.primary,
    borderRadius: responsiveWidth(25),
    borderWidth: 2,
    height: responsiveWidth(25),
    width: responsiveWidth(25),
    zIndex: 1,
  },
  linkText: {
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(1.8),
    paddingLeft: 10,
    textAlign: 'left',
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  marginTopView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  paragraphMainView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  paragraphText: {
    alignContent: 'center',
    color: Colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(1.9),
    marginTop: responsiveHeight(1),
    textAlign: 'justify',
  },
  roundView: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    width: responsiveWidth(100),
  },
  safeAreaView: {
    alignItems: 'center',
    backgroundColor: Colors.secondaryBlack,
    flex: 1,
  },
  text: {
    color: Colors.white,
    fontFamily: 'Roboto-Light',
    fontSize: responsiveFontSize(2.2),
    marginLeft: 5,
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(3),
    textAlign: 'center',
  },
});
