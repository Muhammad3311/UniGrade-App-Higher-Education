import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
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
    width: responsiveWidth(40),
    height: responsiveHeight(5.5),
  },
  configContainer: {
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    padding: 12,
  },
  configContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    width: '100%',
  },
  configHeader: {flex: 1, marginHorizontal: 10},
  configInnerContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  configName: {
    color: Colors.textColor,
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  configRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  container: {
    paddingHorizontal: responsiveWidth(3),
  },
  containerStyle: {
    alignItems: 'center',
  },
  dateStyle: {flex: 1, flexDirection: 'row'},
  flexStyle: {flex: 1},
  header: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
  },
  horizontalText: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
  },
  input: {
    borderColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    height: 50,
    paddingHorizontal: 12,
    width: '25%',
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '100%',
  },
  labelStyle: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(2.3),
  },
  message: {
    color: Colors.primary,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
  modalContent: {
    borderRadius: 10,
    elevation: 5,
    height: '80%',
    padding: 20,
    width: '100%',
  },
  modalHeader: {
    color: Colors.primary,
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalRow: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  modalText: {
    color: Colors.textColor,
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    marginLeft: 10,
  },
  modalTitle: {
    color: Colors.black,
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
  },
  nameInput: {
    borderColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  pickerStyle: {
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    width: '30%',
    overflow: 'hidden',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  scrollViewContentContainer: {
    backgroundColor: Colors.transparent,
    overflow: 'hidden',
    // marginBottom: responsiveHeight(12),
    paddingVertical: 5,
  },
  scrollViewStyle: {
    backgroundColor: Colors.transparent,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  titleStyle: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: 'Roboto-Medium',
  },
  trashIconStyle: {
    flex: 0.3,
    overflow: 'hidden',
  },
});
