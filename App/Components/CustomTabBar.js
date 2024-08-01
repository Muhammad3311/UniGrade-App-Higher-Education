// CustomTabBar.js
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import Style from './CustomTabBarStyle';

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={Style.tabBar}>
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
          color: isFocused ? '#ECF0F1' : '#95A5A6',
          size: 24,
        }).props.name;

        return (
          <Animatable.View
            key={route.key}
            style={[Style.tabItem, isFocused ? Style.tabItemSelected : null]}
            animation={isFocused ? 'zoomIn' : undefined}
            duration={600}
            easing="ease-out">
            <Animatable.View
              animation={isFocused ? 'rotate' : undefined}
              duration={600}
              style={Style.iconContainer}>
              <Icon
                name={iconName}
                size={isFocused ? 26 : 24}
                color={isFocused ? '#ECF0F1' : '#95A5A6'}
                onPress={onPress}
                style={isFocused ? Style.iconSelected : null}
              />
            </Animatable.View>
          </Animatable.View>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
