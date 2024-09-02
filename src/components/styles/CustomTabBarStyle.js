import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

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
    borderRadius: 30,
    elevation: 5,
    flexDirection: 'row',
    height: responsiveHeight(100) / 14,
    justifyContent: 'space-around',
    position: 'absolute',
    width: responsiveWidth(75),
  },
  tabItem: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  tabItemSelected: {
    backgroundColor: Colors.primary,
    borderRadius: 100,
    bottom: 20,
    padding: responsiveWidth(2.5),
  },
});
