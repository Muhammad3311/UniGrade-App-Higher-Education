import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  contactView: {
    backgroundColor: Colors.secondaryLight,
    borderTopLeftRadius: responsiveWidth(12),
    borderTopRightRadius: responsiveWidth(12),
    flex: 1,
    marginTop: responsiveHeight(-5),
    width: responsiveWidth(100),
    // paddingBottom: 80,
    paddingTop: responsiveHeight(6),
    paddingHorizontal: responsiveWidth(4),
    zIndex: -1,
  },
  iconText: {
    color: Colors.white,
    fontFamily: 'Roboto-Light',
    fontSize: responsiveFontSize(2),
    paddingLeft: 10,
    // paddingTop: 5,
    textAlign: 'left',
  },
  iconTextView: {
    // flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    height: responsiveHeight(25),
    // marginTop: -10,
  },
  iconView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: responsiveWidth(100),
  },
  image: {
    borderColor: Colors.white,
    borderRadius: responsiveWidth(25),
    borderWidth: 1,
    height: responsiveWidth(25),
    width: responsiveWidth(25),
    zIndex: 1,
  },
  imageView: {
    borderRadius: 100,
    zIndex: 1,
  },
  linkText: {
    fontFamily: 'Roboto-Light',
    fontSize: responsiveFontSize(1.5),
    paddingLeft: 10,
    // paddingTop: 5,
    textAlign: 'left',
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  marginTopView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  marginView: {paddingTop: 20},
  paragraphMainView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    // width: responsiveWidth(90),
  },
  paragraphText: {
    alignContent: 'center',
    color: Colors.white,
    fontFamily: 'Roboto-Light',
    fontSize: responsiveFontSize(1.9),
    marginTop: responsiveHeight(1),
    // paddingHorizontal: 5,
    textAlign: 'justify',
  },
  roundView: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    // flex: 0.2,
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
    // textAlign: 'center',
  },
  title: {
    color: Colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(3),
    textAlign: 'center',
  },
});
