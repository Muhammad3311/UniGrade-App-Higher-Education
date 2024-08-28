// ThemeContext.js
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Load theme from AsyncStorage on mount
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setIsDarkTheme(savedTheme === 'dark');
        }
      } catch (error) {
        console.log('Failed to load theme:', error);
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
      console.log('Failed to save theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{isDarkTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

// import React, {createContext, useState, useEffect} from 'react';
// import {useColorScheme} from 'react-native';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({children}) => {
//   const systemTheme = useColorScheme(); // Detect system theme (light/dark)
//   const [isDarkTheme, setIsDarkTheme] = useState(systemTheme === 'dark');

//   const toggleTheme = () => {
//     setIsDarkTheme(prevTheme => !prevTheme);
//   };

//   // Update theme when the system theme changes
//   useEffect(() => {
//     setIsDarkTheme(systemTheme === 'dark');
//   }, [systemTheme]);

//   return (
//     <ThemeContext.Provider value={{isDarkTheme, toggleTheme}}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// import React, {createContext, useState, useEffect} from 'react';
// import {useColorScheme} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({children}) => {
//   const systemTheme = useColorScheme();
//   const [isDarkTheme, setIsDarkTheme] = useState(systemTheme === 'dark');

//   const loadTheme = async () => {
//     try {
//       const savedTheme = await AsyncStorage.getItem('theme');
//       if (savedTheme !== null) {
//         setIsDarkTheme(savedTheme === 'dark');
//       } else {
//         setIsDarkTheme(systemTheme === 'dark');
//       }
//     } catch (error) {
//       console.error('Failed to load theme', error);
//     }
//   };

//   const saveTheme = async theme => {
//     try {
//       await AsyncStorage.setItem('theme', theme ? 'dark' : 'light');
//     } catch (error) {
//       console.error('Failed to save theme', error);
//     }
//   };

//   const toggleTheme = () => {
//     const newTheme = !isDarkTheme;
//     setIsDarkTheme(newTheme);
//     saveTheme(newTheme);
//   };

//   useEffect(() => {
//     loadTheme();
//   }, []);

//   useEffect(() => {
//     const handleSystemThemeChange = async () => {
//       const savedTheme = await AsyncStorage.getItem('theme');
//       if (savedTheme === null) {
//         setIsDarkTheme(systemTheme === 'dark');
//       }
//     };
//     handleSystemThemeChange();
//   }, [systemTheme]);

//   return (
//     <ThemeContext.Provider value={{isDarkTheme, toggleTheme}}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
