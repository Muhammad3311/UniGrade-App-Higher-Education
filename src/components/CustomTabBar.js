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

const CustomTabBar = ({state, descriptors, navigation}) => {
  const {isDarkTheme} = React.useContext(ThemeContext);
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
            <Icon
              name={iconName}
              size={isFocused ? 26 : 24}
              color={isFocused ? theme.iconSelectedColor : theme.iconColor}
              onPress={onPress}
              style={isFocused ? Style.iconSelected : null}
            />
          </Animatable.View>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
