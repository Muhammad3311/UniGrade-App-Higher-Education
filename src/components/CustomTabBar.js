// CustomTabBar.js
import React from 'react';
import {View, Platform, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
// custom imports
import Style from './styles/CustomTabBarStyle';
// Theme imports
import {ThemeContext} from '../config';
import {lightTheme, darkTheme} from '../constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CustomTabBar = ({state, descriptors, navigation}) => {
  const [visible, setVisible] = React.useState(true);
  const insets = useSafeAreaInsets();
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;

  React.useEffect(() => {
    let keyboardEventListeners;
    if (Platform.OS === 'android') {
      keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', () => setVisible(false)),
        Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
      ];
    }
    return () => {
      if (Platform.OS === 'android') {
        keyboardEventListeners &&
          keyboardEventListeners.forEach(eventListener =>
            eventListener.remove(),
          );
      }
    };
  }, []);
  const render = () => {
    if (Platform.OS === 'ios') {
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
    }
    if (!visible) return null;
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

  return render();
};

export default CustomTabBar;
