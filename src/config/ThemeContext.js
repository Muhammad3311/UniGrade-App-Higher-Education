// ThemeContext.js
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Default to light theme (false)
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Load theme from AsyncStorage on mount
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setIsDarkTheme(savedTheme === 'dark');
        }
        // If savedTheme is null, it will remain false (light theme)
      } catch (error) {
        //console.log('Failed to load theme:', error);
        // In case of error, it will remain false (light theme)
      } finally {
        setIsLoading(false); // Set loading to false after attempting to load the theme
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkTheme;
      setIsDarkTheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      //console.log('Failed to save theme:', error);
    }
  };

  if (isLoading) {
    // You can return a loading indicator or null until theme is determined
    return null;
  }

  return (
    <ThemeContext.Provider value={{isDarkTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
