// PopupMenu.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const PopupMenu = ({options, onSelect, triggerStyle}) => {
  return (
    <Menu>
      <MenuTrigger style={triggerStyle}>
        <Text style={styles.triggerText}>Open Menu</Text>
      </MenuTrigger>
      <MenuOptions>
        {options.map((option, index) => (
          <MenuOption key={index} onSelect={() => onSelect(option.value)}>
            <Text style={styles.menuOptionText}>{option.label}</Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  triggerText: {
    color: '#fff',
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    textAlign: 'center',
  },
  menuOptionText: {
    padding: 10,
  },
});

export default PopupMenu;
