import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export default StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSelected: {
    transform: [{scale: 1.2}],
  },
  tabBar: {
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: '#2C3E50',
    backgroundColor: '#1C1C1BFF',
    borderRadius: 30,
    bottom: 20,
    elevation: 5,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-around',
    position: 'absolute',
    width: '80%',
  },
  tabItem: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  tabItemSelected: {
    // backgroundColor: '#1ABC9C',
    // backgroundColor: '#F2AA4CFF',
    backgroundColor: Colors.primary,
    borderRadius: 100,
    bottom: 20,
    padding: 10,
  },
});
