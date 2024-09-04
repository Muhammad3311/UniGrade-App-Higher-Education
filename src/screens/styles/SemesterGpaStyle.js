import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  buttonContainerStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderRadius: responsiveWidth(2),
    elevation: 5,
    justifyContent: 'center',
    // width: responsiveWidth(40),
    // height: responsiveHeight(5.5),
    width: '40%',
    height: 50,
  },
  container: {
    flex: 1,
    padding: responsiveWidth(2),
    paddingTop: 10,
  },
  contentContainerStyle: {
    backgroundColor: Colors.transparent,
    overflow: 'hidden',
    padding: 5,
  },
  contentContainerStyleToast: {paddingHorizontal: responsiveWidth(4)},
  creditView: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.transparent,
    borderRadius: 5,
    borderWidth: 1,
    // flex: 1,
    marginVertical: 10,
    overflow: 'hidden',
    paddingVertical: 10,
  },
  gradeText: {
    color: Colors.primary,
    flex: 0.5,
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(2.2),
    textAlign: 'center',
  },
  iconStyle: {flex: 0.3, overflow: 'hidden'},
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(2),
    height: 40,
    opacity: 1,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  labelStyle: {
    color: Colors.white,
    fontSize: responsiveFontSize(2.3),
    fontFamily: 'Roboto-Medium',
  },
  mainContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(1),
    width: '100%',
  },
  middleContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingHorizontal: responsiveWidth(1),
    width: '100%',
  },
  picker: {
    width: '100%',
  },
  pickerContainer: {
    borderColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    width: '50%',
    overflow: 'hidden',
  },
  pickerItem: {
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(1.8),
  },
  pickerItemPrimary: {
    color: Colors.primary,
    fontFamily: 'Roboto-Bold',
    fontSize: responsiveFontSize(2),
  },
  scrollView: {
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderRadius: 8,
    flexGrow: 1,
  },
  subjectContainer: {
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingVerticalVertical: 10,
    paddingHorizontal: 8,
    width: '100%', // Fixed width for each item
  },
});
