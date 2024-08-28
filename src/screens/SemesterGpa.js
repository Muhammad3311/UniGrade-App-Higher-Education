import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {
  commonGPAConfigScale4,
  commonGPAConfigScale5,
  kustGPAConfig,
  darkTheme,
  lightTheme,
  Colors,
} from '../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '../config';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {TextButton} from '../components';
import Style from './styles/SemesterGpaStyle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SemesterGpa = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const [gpaConfig, setGpaConfig] = useState(commonGPAConfigScale4);
  const [subjects, setSubjects] = useState([{name: 'Subject 1', score: ''}]);
  const [gpa, setGpa] = useState(0);
  const [grade, setGrade] = useState('');
  const [customConfigs, setCustomConfigs] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState('Default');
  const [subjectCount, setSubjectCount] = useState(5);
  const [selectedTab, setSelectedTab] = useState('SGPA');
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleOptionSelect = (index, value) => {
    handleCreditHourChange(index, value);
    setSelectedIndex(null);
  };

  const loadConfigs = async () => {
    const savedConfigs = await AsyncStorage.getItem('customConfigs');
    if (savedConfigs) {
      setCustomConfigs(JSON.parse(savedConfigs));
    }
  };

  useEffect(() => {
    loadConfigs();
  }, []);

  useEffect(() => {
    const newSubjects = Array.from({length: subjectCount}, (_, i) => ({
      name: i === 0 ? 'Subject 1' : `Subject ${i + 1}`,
      score: '',
    }));
    setSubjects(newSubjects);
  }, [subjectCount]);

  const handleConfigChange = async itemValue => {
    setSelectedConfig(itemValue);

    let newConfig;
    if (itemValue === 'scale-4') {
      newConfig = commonGPAConfigScale4;
    } else if (itemValue === 'scale-5') {
      newConfig = commonGPAConfigScale5;
    } else if (itemValue === 'kust') {
      newConfig = kustGPAConfig;
    } else {
      const savedConfigs = await AsyncStorage.getItem('customConfigs');
      if (savedConfigs) {
        const configs = JSON.parse(savedConfigs);
        const selected = configs.find(config => config.name === itemValue);
        newConfig = selected?.gpaConfig || gpaConfig;
      }
    }

    setGpaConfig(newConfig);
    updateGrades(newConfig);
  };

  const updateGrades = config => {
    const updatedSubjects = subjects.map(subject => {
      const numericScore = parseFloat(subject.score);
      if (!isNaN(numericScore)) {
        const result = config.find(item => {
          const [min, max] = item.marksRange.split('-').map(Number);
          return numericScore >= min && numericScore <= max;
        });
        return {
          ...subject,
          grade: result ? result.letterGrade : 'N/A',
        };
      }
      return subject;
    });
    setSubjects(updatedSubjects);
  };

  const handleScoreChange = (index, value) => {
    const newSubjects = [...subjects];
    newSubjects[index].score = value;

    const numericScore = parseFloat(value);
    if (!isNaN(numericScore)) {
      const result = gpaConfig.find(item => {
        const [min, max] = item.marksRange.split('-').map(Number);
        return numericScore >= min && numericScore <= max;
      });
      if (result) {
        newSubjects[index].grade = result.letterGrade;
      } else {
        newSubjects[index].grade = 'N/A';
      }
    } else {
      newSubjects[index].grade = '';
    }

    setSubjects(newSubjects);
  };

  const handleNameChange = (index, value) => {
    const newSubjects = [...subjects];
    newSubjects[index].name = value;
    setSubjects(newSubjects);
  };
  const removeSubject = index => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const calculateGPA = (score, config) => {
    const result = config.find(item => {
      const [min, max] = item.marksRange.split('-').map(Number);
      return score >= min && score <= max;
    });
    if (result) {
      const [minGPA, maxGPA] = result.gpa.split('-').map(Number);
      return (minGPA + (maxGPA || minGPA)) / 2; // Return average if range exists
    }
    return 0.0; // Default GPA if not found
  };

  const handleCalculate = () => {
    let configToUse =
      selectedConfig === 'Default' ? commonGPAConfigScale4 : gpaConfig;
    const totalCreditHours = subjects.reduce(
      (sum, subject) => sum + (subject.creditHours || 3),
      0,
    );

    let totalGpa = 0;
    let count = 0;

    subjects.forEach(subject => {
      const numericScore = parseFloat(subject.score);
      if (!isNaN(numericScore)) {
        totalGpa += calculateGPA(numericScore, configToUse);
        count += 1;
      }
    });

    const calculatedGpa = count > 0 ? (totalGpa / count).toFixed(2) : 0;
    setGpa(calculatedGpa);
    const data = {
      totalSum: calculatedGpa,
      newChPoints: totalCreditHours,
    };
    navigation.navigate('ChartScreen', {data: data});
  };

  const clearAllSubjects = () => {
    setSubjects([{name: 'Subject 1', score: ''}]);
    setSubjectCount(1);
  };

  const handleCreditHourChange = (index, value) => {
    const newSubjects = [...subjects];
    newSubjects[index].creditHours = value; // Add credit hours to the subject
    setSubjects(newSubjects);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundColor,
          height: responsiveHeight(100),
          paddingBottom: insets.bottom + 20,
          // width: responsiveWidth(100),
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          // backgroundColor: 'gray',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'center',
          paddingHorizontal: responsiveWidth(1),
        }}>
        <View
          style={{
            backgroundColor: theme.backgroundColor,
            borderRadius: 10, // Round borders
            borderColor: Colors.primary, // Border color
            borderWidth: 1, // Border width
            width: '50%',
            overflow: 'hidden', // Ensures the picker respects the rounded border
          }}>
          <Picker
            selectedValue={selectedConfig}
            onFocus={loadConfigs}
            dropdownIconColor={Colors.primary}
            dropdownIconRippleColor={Colors.primary}
            selectionColor={Colors.primary}
            mode="dropdown"
            onValueChange={handleConfigChange}
            style={{
              backgroundColor: theme.backgroundColor,
              color: theme.textColor,
              fontFamily: 'Roboto-Regular',
              fontSize: 16,
              width: '100%',
            }}>
            <Picker.Item
              label="Scale-4 (Standard Worldwide)"
              value="scale-4"
              style={{
                fontFamily: 'Roboto-Regular',
                fontSize: 16,
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
                margin: 0,
                padding: 0,
              }}
            />
            <Picker.Item
              label="Scale-5 (Standard Worldwide)"
              value="scale-5"
              style={{
                fontFamily: 'Roboto-Regular',
                fontSize: 16,
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
              }}
            />
            <Picker.Item
              label="─── Custom Scales ───"
              enabled={false}
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: 16,
                backgroundColor: theme.backgroundColor,
                color: Colors.primary,
              }}
            />
            <Picker.Item
              label="HEC Kp Grading System (Pakistan)"
              value="kust"
              style={{
                fontFamily: 'Roboto-Regular',
                fontSize: 16,
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
              }}
            />
            {customConfigs.map((config, index) => (
              <Picker.Item
                key={index}
                label={config.name}
                value={config.name}
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: 16,
                  backgroundColor: theme.backgroundColor,
                  color: theme.textColor,
                }}
              />
            ))}
          </Picker>
        </View>
        <TextButton
          label={'Create My Scale'}
          onPress={() => navigation.navigate('CreateCustomScale')}
          labelStyle={Style.labelStyle}
          buttonContainerStyle={Style.buttonContainerStyle}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          // backgroundColor: 'gray',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'center',
          paddingHorizontal: responsiveWidth(1),
          marginVertical: 15,
        }}>
        <View
          style={{
            backgroundColor: theme.backgroundColor,
            borderRadius: 10, // Round borders
            borderColor: Colors.primary, // Border color
            borderWidth: 1, // Border width
            width: '50%',
            overflow: 'hidden', // Ensures the picker respects the rounded border
          }}>
          <Picker
            selectedValue={subjectCount}
            mode="dropdown"
            dropdownIconColor={Colors.primary}
            dropdownIconRippleColor={Colors.primary}
            selectionColor={Colors.primary}
            onValueChange={setSubjectCount}
            style={styles.picker}>
            {Array.from({length: 10}, (_, i) => (
              <Picker.Item
                key={i}
                label={`Subject : ${i + 1}`}
                value={i + 1}
                style={{
                  backgroundColor: theme.backgroundColor,
                  color: theme.textColor,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 16,
                }}
              />
            ))}
          </Picker>
        </View>
        <TextButton
          label={'Reset Subjects'}
          onPress={clearAllSubjects}
          labelStyle={Style.labelStyle}
          buttonContainerStyle={Style.buttonContainerStyle}
        />
      </View>
      <KeyboardAwareScrollView
        style={{
          ...styles.scrollView,
          flexGrow: 0.8,
          backgroundColor: theme.backgroundColor,
          borderWidth: 1,
          borderColor: Colors.primary,
        }}
        contentContainerStyle={{
          backgroundColor: Colors.transparent,
          // borderRadius: 20,
          padding: 5,
          overflow: 'hidden',
        }}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={200}
        bounces={false}
        keyboardOpeningTime={0}>
        {subjects.map((subject, index) => (
          <View key={index} style={styles.subjectContainer}>
            {/* Display grade */}
            <Entypo
              allowFontScaling={false}
              name="trash"
              color={Colors.redColor}
              size={18}
              onPress={() => removeSubject(index)}
              style={{overflow: 'hidden', flex: 0.3}}
            />
            <TextInput
              style={{...styles.input, color: theme.textColor}}
              placeholder={`Score for Subject ${index + 1}`}
              placeholderTextColor={theme.placeholderTextColor}
              keyboardType="numeric"
              value={subject.score}
              allowFontScaling={false}
              onChangeText={text => handleScoreChange(index, text)}
            />
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 18,
                // marginLeft: 10,
                color: Colors.primary,
                flex: 0.8,
                textAlign: 'center',
              }}>
              {subject.grade}
            </Text>
            <View
              style={{
                borderColor: Colors.transparent, // Your desired border color
                borderWidth: 1, // Border width
                borderRadius: 5, // Optional: to make the corners rounded
                overflow: 'hidden', // Ensures the picker is fully contained within the border
                flex: 0.8, // Keep the same flex value
                // backgroundColor: Colors.placeholder,
                backgroundColor: Colors.transparent,
                marginVertical: 10,
                paddingVertical: 10,
              }}>
              <Picker
                selectedValue={subject.creditHours || 3}
                mode="dropdown"
                dropdownIconColor={Colors.primary}
                dropdownIconRippleColor={Colors.transparent}
                onValueChange={value => handleCreditHourChange(index, value)} // Update the subject's credit hours
                style={{
                  height: 20,
                  flex: 0.8,
                  // backgroundColor: Colors.placeholder,
                  // overflow: 'hidden',
                  color: Colors.primary,
                }}>
                <Picker.Item
                  label="1"
                  value={1}
                  style={{
                    backgroundColor: theme.backgroundColor,
                    color: theme.textColor,
                  }}
                />
                <Picker.Item
                  label="2"
                  value={2}
                  style={{
                    backgroundColor: theme.backgroundColor,
                    color: theme.textColor,
                  }}
                />
                <Picker.Item
                  label="3"
                  value={3}
                  style={{
                    backgroundColor: theme.backgroundColor,
                    color: theme.textColor,
                  }}
                />
                <Picker.Item
                  label="4"
                  value={4}
                  style={{
                    backgroundColor: theme.backgroundColor,
                    color: theme.textColor,
                  }}
                />
                <Picker.Item
                  label="5"
                  value={5}
                  style={{
                    backgroundColor: theme.backgroundColor,
                    color: theme.textColor,
                  }}
                />
              </Picker>
            </View>
          </View>
        ))}
      </KeyboardAwareScrollView>
      <TextButton
        label={'Calculate GPA'}
        onPress={handleCalculate}
        labelStyle={Style.labelStyle}
        buttonContainerStyle={{...Style.buttonContainerStyle, marginTop: 5}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 16,
    backgroundColor: '#fff',
    padding: responsiveWidth(2),
    paddingTopTop: 10,
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    height: 40,
    opacity: 1,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    // paddingHorizontal: 8,
    // flex: 1,
    // padding: 0,
    // margin: 0,
    // textAlign: 'center',
  },
  result: {
    fontSize: 18,
    marginVertical: 8,
  },
  scrollView: {
    // flex: 1,
    // backgroundColor: Colors.placeholder,
    borderRadius: 8,
    // marginVertical: 20,
    // flexGrow: 1,
    // overflow: 'hidden',
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', // Fixed width for each item
    paddingVerticalVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: Colors.transparent,
    overflow: 'hidden',
  },
  removeButton: {
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  picker: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // height: 50,
    width: '100%',
  },
  dropdownButton: {
    alignItems: 'center',
    // flex: 0.8,
    flexDirection: 'row',
    borderColor: '#007BFF',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.transparent,
    marginVertical: 10,
    width: '20%',
  },
  dropdownText: {
    color: '#007BFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  optionButton: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#007BFF',
    textAlign: 'center',
  },
});

export default SemesterGpa;

/////////////////////////////////////
////////////////////////////////////////////

// import {Picker} from '@react-native-picker/picker';
// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Modal from 'react-native-modal';
// import {
//   commonGPAConfigScale4,
//   commonGPAConfigScale5,
//   kustGPAConfig,
//   darkTheme,
//   lightTheme,
//   Colors,
// } from '../constants';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
// import {ThemeContext} from '../config';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import {TextButton} from '../components';
// import Style from './styles/SemesterGpaStyle';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// const SemesterGpa = ({navigation}) => {
//   const insets = useSafeAreaInsets();
//   const {isDarkTheme} = React.useContext(ThemeContext);
//   const theme = isDarkTheme ? darkTheme : lightTheme;
//   const [gpaConfig, setGpaConfig] = useState(commonGPAConfigScale4);
//   const [subjects, setSubjects] = useState([{name: 'Subject 1', score: ''}]);
//   const [gpa, setGpa] = useState(0);
//   const [grade, setGrade] = useState('');
//   const [customConfigs, setCustomConfigs] = useState([]);
//   const [selectedConfig, setSelectedConfig] = useState('Default');
//   const [subjectCount, setSubjectCount] = useState(1);
//   const [selectedTab, setSelectedTab] = useState('SGPA');
//   const [selectedIndex, setSelectedIndex] = useState(null);

//   const handleOptionSelect = (index, value) => {
//     handleCreditHourChange(index, value);
//     setSelectedIndex(null);
//   };

//   const loadConfigs = async () => {
//     const savedConfigs = await AsyncStorage.getItem('customConfigs');
//     if (savedConfigs) {
//       setCustomConfigs(JSON.parse(savedConfigs));
//     }
//   };

//   useEffect(() => {
//     loadConfigs();
//   }, []);

//   useEffect(() => {
//     const newSubjects = Array.from({length: subjectCount}, (_, i) => ({
//       name: i === 0 ? 'Subject 1' : `Subject ${i + 1}`,
//       score: '',
//     }));
//     setSubjects(newSubjects);
//   }, [subjectCount]);

//   const handleConfigChange = async itemValue => {
//     setSelectedConfig(itemValue);

//     let newConfig;
//     if (itemValue === 'scale-4') {
//       newConfig = commonGPAConfigScale4;
//     } else if (itemValue === 'scale-5') {
//       newConfig = commonGPAConfigScale5;
//     } else if (itemValue === 'kust') {
//       newConfig = kustGPAConfig;
//     } else {
//       const savedConfigs = await AsyncStorage.getItem('customConfigs');
//       if (savedConfigs) {
//         const configs = JSON.parse(savedConfigs);
//         const selected = configs.find(config => config.name === itemValue);
//         newConfig = selected?.gpaConfig || gpaConfig;
//       }
//     }

//     setGpaConfig(newConfig);
//     updateGrades(newConfig);
//   };

//   const updateGrades = config => {
//     const updatedSubjects = subjects.map(subject => {
//       const numericScore = parseFloat(subject.score);
//       if (!isNaN(numericScore)) {
//         const result = config.find(item => {
//           const [min, max] = item.marksRange.split('-').map(Number);
//           return numericScore >= min && numericScore <= max;
//         });
//         return {
//           ...subject,
//           grade: result ? result.letterGrade : 'N/A',
//         };
//       }
//       return subject;
//     });
//     setSubjects(updatedSubjects);
//   };

//   const handleScoreChange = (index, value) => {
//     const newSubjects = [...subjects];
//     newSubjects[index].score = value;

//     const numericScore = parseFloat(value);
//     if (!isNaN(numericScore)) {
//       const result = gpaConfig.find(item => {
//         const [min, max] = item.marksRange.split('-').map(Number);
//         return numericScore >= min && numericScore <= max;
//       });
//       if (result) {
//         newSubjects[index].grade = result.letterGrade;
//       } else {
//         newSubjects[index].grade = 'N/A';
//       }
//     } else {
//       newSubjects[index].grade = '';
//     }

//     setSubjects(newSubjects);
//   };

//   const handleNameChange = (index, value) => {
//     const newSubjects = [...subjects];
//     newSubjects[index].name = value;
//     setSubjects(newSubjects);
//   };
//   const removeSubject = index => {
//     setSubjects(subjects.filter((_, i) => i !== index));
//   };

//   const calculateGPA = (score, config) => {
//     const result = config.find(item => {
//       const [min, max] = item.marksRange.split('-').map(Number);
//       return score >= min && score <= max;
//     });
//     if (result) {
//       const [minGPA, maxGPA] = result.gpa.split('-').map(Number);
//       return (minGPA + (maxGPA || minGPA)) / 2; // Return average if range exists
//     }
//     return 0.0; // Default GPA if not found
//   };

//   const handleCalculate = () => {
//     let configToUse =
//       selectedConfig === 'Default' ? commonGPAConfigScale4 : gpaConfig;
//     const totalCreditHours = subjects.reduce(
//       (sum, subject) => sum + (subject.creditHours || 3),
//       0,
//     );

//     let totalGpa = 0;
//     let count = 0;

//     subjects.forEach(subject => {
//       const numericScore = parseFloat(subject.score);
//       if (!isNaN(numericScore)) {
//         totalGpa += calculateGPA(numericScore, configToUse);
//         count += 1;
//       }
//     });

//     const calculatedGpa = count > 0 ? (totalGpa / count).toFixed(2) : 0;
//     setGpa(calculatedGpa);
//     const data = {
//       totalSum: calculatedGpa,
//       newChPoints: totalCreditHours,
//     };
//     navigation.navigate('ChartScreen', {data: data});
//   };

//   const clearAllSubjects = () => {
//     setSubjects([{name: 'Subject 1', score: ''}]);
//     setSubjectCount(1);
//   };

//   const handleCreditHourChange = (index, value) => {
//     const newSubjects = [...subjects];
//     newSubjects[index].creditHours = value; // Add credit hours to the subject
//     setSubjects(newSubjects);
//   };

//   return (
//     <SafeAreaView
//       style={[
//         styles.container,
//         {
//           backgroundColor: theme.backgroundColorHome,
//           paddingBottom: insets.bottom + responsiveHeight(10),
//         },
//       ]}>
//       <View
//         style={{
//           flexDirection: 'row',
//           width: '100%',
//           // backgroundColor: 'gray',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           alignSelf: 'center',
//           paddingHorizontal: responsiveWidth(1),
//         }}>
//         {/* <Text
//           style={{
//             color: theme.textColor,
//             fontFamily: 'Roboto-Medium',
//             fontSize: 18,
//             marginLeft: 5,
//           }}>
//           Select GPA Scale
//         </Text> */}
//         <Picker
//           selectedValue={selectedConfig}
//           onFocus={loadConfigs}
//           onValueChange={handleConfigChange}
//           style={styles.picker}>
//           <Picker.Item
//             label="Scale-4 (Standard Worldwide)"
//             value="scale-4"
//             style={{
//               fontFamily: 'Roboto-Regular',
//               fontSize: 16,
//             }}
//           />
//           <Picker.Item label="Scale-5 (Standard Worldwide)" value="scale-5" />
//           <Picker.Item label="─── Custom Scales ───" enabled={false} />
//           <Picker.Item label="HEC Kp Grading System (Pakistan)" value="kust" />
//           {customConfigs.map((config, index) => (
//             <Picker.Item key={index} label={config.name} value={config.name} />
//           ))}
//         </Picker>
//         <TextButton
//           label={'Create My Scale'}
//           onPress={() => navigation.navigate('CreateCustomScale')}
//           labelStyle={Style.labelStyle}
//           buttonContainerStyle={Style.buttonContainerStyle}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           width: '100%',
//           // backgroundColor: 'gray',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           alignSelf: 'center',
//           paddingHorizontal: responsiveWidth(1),
//           marginVertical: 5,
//           marginBottom: 10,
//         }}>
//         {/* <Text
//           style={{
//             color: theme.textColor,
//             fontFamily: 'Roboto-Medium',
//             fontSize: 18,
//             marginLeft: 5,
//           }}>
//           Select Subjects
//         </Text> */}
//         <Picker
//           selectedValue={subjectCount}
//           mode="dropdown"
//           dropdownIconColor={Colors.primary}
//           dropdownIconRippleColor={Colors.primary}
//           selectionColor={Colors.primary}
//           onValueChange={setSubjectCount}
//           style={styles.picker}>
//           {Array.from({length: 10}, (_, i) => (
//             <Picker.Item
//               key={i}
//               label={`Subject : ${i + 1}`}
//               value={i + 1}
//               style={{
//                 backgroundColor: theme.backgroundColorHome,
//                 color: theme.textColor,
//                 fontFamily: 'Roboto-Regular',
//                 fontSize: 16,
//               }}
//             />
//           ))}
//         </Picker>

//         <TextButton
//           label={'Reset Subjects'}
//           onPress={clearAllSubjects}
//           labelStyle={Style.labelStyle}
//           buttonContainerStyle={Style.buttonContainerStyle}
//         />
//       </View>
//       {/* <View
//         style={{
//           alignItems: 'center',
//           alignSelf: 'center',
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           width: '100%',
//           paddingHorizontal: responsiveWidth(3),
//           marginBottom: 10,
//         }}>
//         <TextButton
//           label={'Clear All'}
//           onPress={clearAllSubjects}
//           labelStyle={Style.labelStyle}
//           buttonContainerStyle={Style.buttonContainerStyle}
//         />

//         <TextButton
//           label={'Create My Scale'}
//           onPress={() => navigation.navigate('CreateCustomScale')}
//           labelStyle={Style.labelStyle}
//           buttonContainerStyle={Style.buttonContainerStyle}
//         />
//       </View> */}
//       <KeyboardAwareScrollView
//         style={styles.scrollView}
//         // showsVerticalScrollIndicator={false}
//         // keyboardShouldPersistTaps="always"
//         // extraHeight={-64}
//         // enableResetScrollToCoords={false}
//         // enableOnAndroid={true}
//         // enableResetScrollToCoords={false}
//         // keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
//         enableOnAndroid={true}
//         enableResetScrollToCoords={false}
//         bounces={false}
//         contentInsetAdjustmentBehavior="always"
//         overScrollMode="always"
//         showsVerticalScrollIndicator={true}>
//         {subjects.map((subject, index) => (
//           <View key={index} style={styles.subjectContainer}>
//             <TextInput
//               style={styles.input}
//               textAlign="center"
//               textAlignVertical="center"
//               placeholder={`Score for Subject ${index + 1}`}
//               keyboardType="numeric"
//               value={subject.score}
//               textContentType="oneTimeCode"
//               allowFontScaling={false}
//               onChangeText={text => handleScoreChange(index, text)}
//               numberOfLines={1}
//             />
//             <Text
//               allowFontScaling={false}
//               style={{
//                 fontFamily: 'Roboto-Medium',
//                 fontSize: 18,
//                 // marginLeft: 10,
//                 color: Colors.primary,
//                 flex: 0.8,
//                 textAlign: 'center',
//               }}>
//               {subject.grade}
//             </Text>
//             {/* <TouchableOpacity
//               onPress={() => setSelectedIndex(index)}
//               style={styles.dropdownButton}>
//               <Text style={styles.dropdownText}>
//                 {subject.creditHours || 3}
//               </Text>
//               <Entypo name="chevron-down" size={18} color={Colors.primary} />
//             </TouchableOpacity> */}

//             <View
//               style={{
//                 borderColor: Colors.transparent, // Your desired border color
//                 borderWidth: 1, // Border width
//                 borderRadius: 5, // Optional: to make the corners rounded
//                 overflow: 'hidden', // Ensures the picker is fully contained within the border
//                 flex: 0.8, // Keep the same flex value
//                 backgroundColor: Colors.placeholder,
//                 marginVertical: 10,
//                 paddingVertical: 10,
//               }}>
//               <Picker
//                 selectedValue={subject.creditHours || 3}
//                 mode="dropdown"
//                 dropdownIconColor={Colors.primary}
//                 dropdownIconRippleColor={Colors.transparent}
//                 onValueChange={value => handleCreditHourChange(index, value)} // Update the subject's credit hours
//                 style={{
//                   height: 20,
//                   flex: 0.8,
//                   backgroundColor: Colors.placeholder,
//                 }}>
//                 <Picker.Item
//                   label="1"
//                   value={1}
//                   style={{backgroundColor: Colors.placeholder, width: '100%'}}
//                 />
//                 <Picker.Item
//                   label="2"
//                   value={2}
//                   style={{backgroundColor: Colors.placeholder}}
//                 />
//                 <Picker.Item
//                   label="3"
//                   value={3}
//                   style={{backgroundColor: Colors.placeholder}}
//                 />
//                 <Picker.Item
//                   label="4"
//                   value={4}
//                   style={{backgroundColor: Colors.placeholder}}
//                 />
//                 <Picker.Item
//                   label="5"
//                   value={5}
//                   style={{backgroundColor: Colors.placeholder}}
//                 />
//               </Picker>
//             </View>

//             {/* Display grade */}
//             {/* <TouchableOpacity
//               onPress={() => removeSubject(index)}
//               style={styles.removeButton}> */}
//             <Entypo
//               allowFontScaling={false}
//               name="trash"
//               color={'red'}
//               size={18}
//               onPress={() => removeSubject(index)}
//             />
//             {/* {selectedIndex === index && (
//               <Modal
//                 isVisible={true}
//                 onBackdropPress={() => setSelectedIndex(null)}>
//                 <View style={styles.modalContent}>
//                   {[1, 2, 3, 4, 5].map(value => (
//                     <TouchableOpacity
//                       key={value}
//                       style={styles.optionButton}
//                       onPress={() => handleOptionSelect(index, value)}>
//                       <Text style={styles.optionText}>{value}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </Modal>
//             )} */}
//             {/* </TouchableOpacity> */}
//           </View>
//         ))}
//       </KeyboardAwareScrollView>
//       <TextButton
//         label={'Calculate GPA'}
//         onPress={handleCalculate}
//         labelStyle={Style.labelStyle}
//         buttonContainerStyle={Style.buttonContainerStyle}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // padding: 16,
//     backgroundColor: '#fff',
//     padding: responsiveWidth(2),
//   },
//   input: {
//     fontFamily: 'Roboto-Regular',
//     fontSize: 16,
//     height: 40,
//     borderBottomColor: Colors.primary,
//     borderBottomWidth: 1,
//     // paddingHorizontal: 8,
//     flex: 1,
//     padding: 0,
//     margin: 0,
//     textAlign: 'center',
//   },
//   result: {
//     fontSize: 18,
//     marginVertical: 8,
//   },
//   scrollView: {
//     // flex: 1,
//     backgroundColor: Colors.placeholder,
//     borderRadius: 20,
//     padding: 5,
//     marginVertical: 20,
//     // flexGrow: 1,
//     // zIndex: -1,
//   },
//   subjectContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%', // Fixed width for each item
//     paddingVerticalVertical: 10,
//     paddingHorizontal: 8,
//     backgroundColor: 'transparent',
//   },
//   removeButton: {
//     borderRadius: 5,
//   },
//   removeButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   picker: {
//     // alignItems: 'center',
//     // justifyContent: 'center',
//     // height: 50,
//     width: '50%',
//   },
//   dropdownButton: {
//     alignItems: 'center',
//     // flex: 0.8,
//     flexDirection: 'row',
//     borderColor: '#007BFF',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     backgroundColor: Colors.transparent,
//     marginVertical: 10,
//     width: '20%',
//   },
//   dropdownText: {
//     color: '#007BFF',
//     fontFamily: 'Roboto-Regular',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//   },
//   optionButton: {
//     paddingVertical: 10,
//   },
//   optionText: {
//     fontSize: 16,
//     color: '#007BFF',
//     textAlign: 'center',
//   },
// });

// export default SemesterGpa;

/////////////////////////////////////
////////////////////////////////////////////
