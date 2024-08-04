// CustomTabBar.js
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import Style from './CustomTabBarStyle';
import {ThemeContext} from '../../ThemeContext';
import {lightTheme, darkTheme} from '../../themes';

const CustomTabBar = ({state, descriptors, navigation}) => {
  const {isDarkTheme, toggleTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  return (
    <View style={[Style.tabBar, {backgroundColor: theme.tabBarBackground}]}>
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
          size: 24,
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
            {/* <Animatable.View
              animation={isFocused ? 'rotate' : undefined}
              duration={600}
              style={Style.iconContainer}> */}
            <Icon
              name={iconName}
              size={isFocused ? 26 : 24}
              color={isFocused ? theme.iconSelectedColor : theme.iconColor}
              onPress={onPress}
              style={isFocused ? Style.iconSelected : null}
            />
            {/* </Animatable.View> */}
          </Animatable.View>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
