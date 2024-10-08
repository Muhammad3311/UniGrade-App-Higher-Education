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
    height: 50,
    justifyContent: 'center',
    width: responsiveWidth(40),
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
  configMessage: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },
  configName: {
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(2.1),
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
    fontSize: responsiveFontSize(2.4),
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
    fontSize: responsiveFontSize(2),
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
    fontSize: responsiveFontSize(2.2),
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
    fontSize: responsiveFontSize(2.4),
    marginBottom: 15,
    textAlign: 'center',
  },
  modalRow: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  modalText: {
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(2),
    marginLeft: 10,
  },
  modalTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(2),
  },
  nameInput: {
    borderColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(2),
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
    paddingBottom: 10,
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
    fontSize: responsiveFontSize(3),
    fontFamily: 'Roboto-Medium',
  },
  trashIconStyle: {
    flex: 0.3,
    overflow: 'hidden',
  },
});
