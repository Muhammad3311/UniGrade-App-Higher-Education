// CustomTabBar.js
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
// custom imports
import Style from './styles/CustomTabBarStyle';
// Theme imports
import {ThemeContext} from '../config';
import {lightTheme, darkTheme} from '../constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const CustomTabBar = ({state, descriptors, navigation}) => {
  const insets = useSafeAreaInsets();
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <View
      style={[
        Style.tabBar,
        {
          backgroundColor: theme.tabBarBackground,
          bottom: insets.bottom + 10,
        },
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const iconName = options.tabBarIcon({
          focused: isFocused,
          color: isFocused ? theme.iconSelectedColor : theme.iconColor,
        }).props.name;

        return (
          <Animatable.View
            key={route.key}
            style={[
              Style.tabItem,
              isFocused ? Style.tabItemSelected : null,
              {
                backgroundColor: isFocused
                  ? theme.tabItemSelectedBackground
                  : null,
              },
            ]}
            animation={isFocused ? 'zoomIn' : undefined}
            duration={600}
            easing="ease-out">
            <Icon
              name={iconName}
              size={responsiveWidth(7)}
              color={isFocused ? theme.iconSelectedColor : theme.iconColor}
              onPress={onPress}
              style={isFocused ? Style.iconSelected : null}
              allowFontScaling={false}
            />
          </Animatable.View>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
