import React, {useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFocusEffect} from '@react-navigation/native';
import {
  AndroidSoftInputModes,
  KeyboardController,
} from 'react-native-keyboard-controller';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ThemeContext, useToast} from '../config';
import {TextButton} from '../components';
import Style from './styles/SemesterGpaStyle';
import {
  commonGPAConfigScale4,
  commonGPAConfigScale5,
  kustGPAConfig,
  darkTheme,
  lightTheme,
  Colors,
} from '../constants';

const SemesterGpa = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const {showToast} = useToast();
  const [gpaConfig, setGpaConfig] = useState(commonGPAConfigScale4);
  const [subjects, setSubjects] = useState([{name: 'Subject 1', score: ''}]);
  const [gpa, setGpa] = useState(0);
  const [customConfigs, setCustomConfigs] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState('Default');
  const [subjectCount, setSubjectCount] = useState(5);

  useFocusEffect(
    React.useCallback(() => {
      KeyboardController.setInputMode(
        AndroidSoftInputModes.SOFT_INPUT_ADJUST_RESIZE,
      );

      return () => KeyboardController.setDefaultMode();
    }, []),
  );

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

  const getFirstGPAValue = config => {
    return config[0].gpa;
  };

  const validateInputs = () => {
    return subjects.every(subject => subject.score.trim() !== '');
  };

  const handleCalculate = () => {
    if (!validateInputs()) {
      showToast('error', 'Attempt the score fields');
      return;
    }
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
    const gpaScale = getFirstGPAValue(configToUse);
    const data = {
      totalSum: calculatedGpa,
      newChPoints: totalCreditHours,
      gpaScale: parseInt(gpaScale),
    };
    navigation.navigate('ChartScreen', {data: data, source: 'SGPA'});
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
        Style.container,
        {
          backgroundColor: theme.backgroundColor,
          paddingBottom:
            insets.bottom == 0
              ? insets.bottom + responsiveHeight(12)
              : insets.bottom + responsiveHeight(10),
        },
      ]}>
      <View style={Style.mainContainer}>
        <View
          style={{
            ...Style.pickerContainer,
            backgroundColor: theme.backgroundColor,
          }}>
          <Picker
            selectedValue={selectedConfig}
            onFocus={loadConfigs}
            dropdownIconColor={Colors.primary}
            dropdownIconRippleColor={Colors.transparent}
            selectionColor={Colors.primary}
            mode="dropdown"
            onValueChange={handleConfigChange}>
            <Picker.Item
              label="Scale-4 (Standard Worldwide)"
              value="scale-4"
              style={{
                ...Style.pickerItem,
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
              }}
            />
            <Picker.Item
              label="Scale-5 (Standard Worldwide)"
              value="scale-5"
              style={{
                ...Style.pickerItem,
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
              }}
            />
            <Picker.Item
              label="─── Custom Scales ───"
              enabled={false}
              style={{
                ...Style.pickerItemPrimary,
                backgroundColor: theme.backgroundColor,
              }}
            />
            <Picker.Item
              label="HEC Kp Grading System (Pakistan)"
              value="kust"
              style={{
                ...Style.pickerItem,
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
                  ...Style.pickerItem,
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
      <View style={Style.middleContainer}>
        <View
          style={{
            ...Style.pickerContainer,
            backgroundColor: theme.backgroundColor,
          }}>
          <Picker
            selectedValue={subjectCount}
            mode="dropdown"
            dropdownIconColor={Colors.primary}
            dropdownIconRippleColor={Colors.transparent}
            selectionColor={Colors.primary}
            onValueChange={setSubjectCount}
            style={Style.picker}>
            {Array.from({length: 10}, (_, i) => (
              <Picker.Item
                key={i}
                label={`Subject : ${i + 1}`}
                value={i + 1}
                style={{
                  ...Style.pickerItem,
                  backgroundColor: theme.backgroundColor,
                  color: theme.textColor,
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
          ...Style.scrollView,
          borderColor: Colors.primary,
        }}
        contentContainerStyle={Style.contentContainerStyle}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={100}
        bounces={false}
        keyboardOpeningTime={0}>
        {subjects.map((subject, index) => (
          <View key={index} style={Style.subjectContainer}>
            {/* Display grade */}
            <Entypo
              allowFontScaling={false}
              name="trash"
              color={Colors.redColor}
              size={responsiveWidth(4.5)}
              onPress={() => removeSubject(index)}
              style={Style.iconStyle}
            />
            <TextInput
              style={{...Style.input, color: theme.textColor}}
              placeholder={`Score for Subject ${index + 1}`}
              placeholderTextColor={theme.placeholderTextColor}
              keyboardType="numeric"
              value={subject.score}
              allowFontScaling={false}
              onChangeText={text => handleScoreChange(index, text)}
              maxLength={4}
            />
            <Text allowFontScaling={false} style={Style.gradeText}>
              {subject.grade}
            </Text>
            <View style={Style.creditView}>
              <Picker
                selectedValue={subject.creditHours || 3}
                mode="dropdown"
                dropdownIconColor={Colors.primary}
                dropdownIconRippleColor={Colors.transparent}
                onValueChange={value => handleCreditHourChange(index, value)} // Update the subject's credit hours
                style={{
                  backgroundColor: Colors.transparent,
                  color: theme.textColor,
                  height: 20,
                  width: responsiveWidth(28),
                }}>
                <Picker.Item
                  label="1"
                  value={1}
                  style={{
                    backgroundColor: Colors.transparent,
                    color: Colors.primary,
                  }}
                />
                <Picker.Item
                  label="2"
                  value={2}
                  style={{
                    backgroundColor: Colors.transparent,
                    color: Colors.primary,
                  }}
                />
                <Picker.Item
                  label="3"
                  value={3}
                  style={{
                    backgroundColor: Colors.transparent,
                    color: Colors.primary,
                  }}
                />
                <Picker.Item
                  label="4"
                  value={4}
                  style={{
                    backgroundColor: Colors.transparent,
                    color: Colors.primary,
                  }}
                />
                <Picker.Item
                  label="5"
                  value={5}
                  style={{
                    backgroundColor: Colors.transparent,
                    color: Colors.primary,
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
        buttonContainerStyle={{
          ...Style.buttonContainerStyle,
          marginVertical: 10,
        }}
      />
    </View>
  );
};

export default SemesterGpa;
