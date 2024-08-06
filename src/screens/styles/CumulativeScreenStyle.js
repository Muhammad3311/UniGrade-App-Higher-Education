import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export default StyleSheet.create({
  contentContainerStyle: {paddingHorizontal: 15},
  container: {
    alignItems: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  pickerContainer: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    // marginBottom: 20,
    alignSelf: 'flex-start',
    padding: 15,
  },
  pickerText: {
    color: '#fff',
  },
  input: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    margin: 0,
    padding: 0,
  },
  entry: {
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    width: '100%',
  },
  semesterContainer: {alignItems: 'flex-start', flex: 1},
  semesterText: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  creditHoursContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  result: {
    color: '#fff',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContent: {
    // backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalItem: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    // paddingVertical: 10,
    // marginLeft: 20,
    textAlign: 'justify',
  },
  modalTitle: {
    alignItems: 'center',
    alignSelf: 'center',
    color: Colors.primary,
    fontFamily: 'Roboto-Medium',
    fontSize: 22,
    marginBottom: 20,
  },
  modalButton: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '90%',
  },
});
