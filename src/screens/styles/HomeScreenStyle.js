import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  border: {
    borderColor: Colors.white,
    borderWidth: 0.5,
    flexDirection: 'row',
    marginTop: 10,
    width: responsiveWidth(100),
  },
  btnView: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    flex: 1,
    marginTop: responsiveHeight(1),
  },
  button: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    borderRadius: responsiveWidth(2),
    elevation: 5,
    // height: responsiveWidth(12),
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    // width: responsiveWidth(40),
    padding: responsiveWidth(2.5),
  },
  buttonText: {
    color: Colors.white,
    fontSize: responsiveFontSize(2.2),
    fontFamily: 'Roboto-Medium',
  },
  buttonView: {
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: responsiveWidth(100),
  },
  cgpaButton: {
    marginTop: responsiveHeight(3),
  },
  configText: {
    fontFamily: 'Roboto-Light',
    fontSize: responsiveFontSize(2),
    color: Colors.white,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    marginTop: responsiveHeight(3),
  },
  contentStyle: {paddingHorizontal: 15},
  flexStyle: {flex: 1},
  flexStyleView: {flex: 1},
  input: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderWidth: 0,
    fontFamily: 'Roboto-Regular',
    height: responsiveHeight(6),
    // padding: 5,
    width: responsiveWidth(22),
  },
  inputContainer: {
    alignItems: 'center',
    flex: 1,
  },
  keyboardViewStyle: {
    backgroundColor: Colors.secondaryLight, //#363c4c
    borderBottomLeftRadius: responsiveWidth(6.5),
    borderBottomRightRadius: responsiveWidth(6.5),
    marginBottom: responsiveHeight(-1),
  },
  mainContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  mainView: {backgroundColor: Colors.secondary, flex: 1},
  primaryButton: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    borderRadius: responsiveWidth(2),
    elevation: 5,
    // height: responsiveWidth(12),
    // marginTop: responsiveHeight(4),
    // width: responsiveWidth(30),
    padding: responsiveWidth(2.5),
  },
  result: {
    color: Colors.white,
    fontWeight: 'Roboto-Medium',
    // width: '100%',
  },
  resultContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // width: '100%',
  },
  resultTextView: {alignItems: 'center', flex: 1, left: 10},
  resultView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scrollView: {
    height: responsiveHeight(55),
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 10,
    marginLeft: responsiveWidth(6.5),
    paddingVertical: 5,
    width: responsiveWidth(100),
  },
  tag: {
    color: Colors.white,
    flex: 1,
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(2.2),
    textAlign: 'center',
  },
});
