import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  contentContainerStyle: {paddingHorizontal: responsiveWidth(4)},
  container: {
    alignItems: 'center',
    flex: 1,
    padding: responsiveWidth(1),
  },
  pickerContainer: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: responsiveWidth(2),
    flexDirection: 'row',
    overflow: 'hidden',
    // marginBottom: 20,
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    padding: responsiveWidth(3.5),
  },
  pickerText: {
    color: Colors.white,
    fontSize: responsiveFontSize(1.8),
  },
  input: {
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(2),
    margin: 0,
    padding: 0,
  },
  entry: {
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    padding: responsiveWidth(3.5),
    marginTop: responsiveHeight(2.5),
    borderRadius: responsiveWidth(2),
    width: responsiveWidth(90),
  },
  semesterContainer: {flex: 1},
  semesterText: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(2),
  },
  modalContent: {
    // backgroundColor: '#fff',
    padding: responsiveWidth(5),
    borderRadius: responsiveWidth(2),
  },
  modalItem: {
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(2.1),
    // paddingVertical: 10,
    // marginLeft: 20,
    textAlign: 'justify',
  },
  modalTitle: {
    alignItems: 'center',
    alignSelf: 'center',
    color: Colors.primary,
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(2.6),
    marginBottom: responsiveHeight(2),
  },
  modalButton: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: responsiveWidth(2.5),
    width: responsiveWidth(75),
  },
  text1Style: {
    fontFamily: 'Roboto-Light',
    fontSize: responsiveFontSize(1.8),
  },
  titleStyle: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: 'Roboto-Regular',
  },
  leftComponentStyle: {left: responsiveWidth(3)},
  mainView: {
    flex: 1,
    padding: responsiveWidth(5),
  },
  headerView: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: responsiveHeight(2),
    width: responsiveWidth(100),
  },
  switchViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: responsiveWidth(2),
    borderColor: Colors.primary,
    padding: responsiveWidth(2.5),
  },
  switchText: {fontSize: responsiveFontSize(2)},
  keyboardScrollViewStyle: {flexGrow: 1},
  textInputViewStyle: {alignItems: 'center', alignSelf: 'center', flex: 1},
  crHrsViewStyle: {flex: 0.7, right: 5},
  labelStyle: {
    color: Colors.white,
    fontSize: responsiveFontSize(2.3),
    fontFamily: 'Roboto-Medium',
  },
  buttonContainerStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderRadius: responsiveWidth(2),
    elevation: 5,
    justifyContent: 'center',
    marginTop: responsiveHeight(3),
    padding: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(3),
  },
  modalView: {alignItems: 'center'},
  numbersViewStyle: {flex: 1, alignItems: 'flex-end'},
  viewStyle: {flex: 1},
});
