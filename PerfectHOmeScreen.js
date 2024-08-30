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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  commonGPAConfigScale4,
  commonGPAConfigScale5,
  kustGPAConfig,
} from './src/constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';

const GPAApp = ({navigation}) => {
  const [gpaConfig, setGpaConfig] = useState(commonGPAConfigScale4);
  const [subjects, setSubjects] = useState([{name: 'Subject 1', score: ''}]);
  const [gpa, setGpa] = useState(0);
  const [grade, setGrade] = useState('');
  const [customConfigs, setCustomConfigs] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState('Default');
  const [subjectCount, setSubjectCount] = useState(1);
  const [selectedTab, setSelectedTab] = useState('SGPA');

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

  const renderContent = () => {
    if (selectedTab === 'SGPA') {
      return (
        <ScrollView style={styles.scrollView}>
          {subjects.map((subject, index) => (
            <View key={index} style={styles.subjectContainer}>
              <Picker
                selectedValue={subject.creditHours || 3}
                onValueChange={value => handleCreditHourChange(index, value)}
                style={{height: 50, width: 90}}>
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
              </Picker>

              <TextInput
                style={styles.input}
                placeholder={`Score for Subject ${index + 1}`}
                keyboardType="numeric"
                value={subject.score}
                onChangeText={text => handleScoreChange(index, text)}
                allowFontScaling={false}
              />
              <Text
                allowFontScaling={false}
                style={{fontSize: 16, marginLeft: 10, color: '#000'}}>
                {subject.grade}
              </Text>
              <TouchableOpacity
                onPress={() => removeSubject(index)}
                style={styles.removeButton}>
                <Entypo
                  allowFontScaling={false}
                  name="trash"
                  color={'red'}
                  size={18}
                />
              </TouchableOpacity>
            </View>
          ))}
          <Button title="Calculate GPA" onPress={handleCalculate} />
          <Text allowFontScaling={false} style={styles.result}>
            GPA: {gpa}
          </Text>
          <Button title="Clear All Subjects" onPress={clearAllSubjects} />
        </ScrollView>
      );
    } else if (selectedTab === 'CGPA') {
      return (
        <View style={styles.cgpaContainer}>
          <Text allowFontScaling={false} style={styles.cgpaText}>
            Cumulative GPA Screen
          </Text>
          <Button
            title="Go to CGPA Screen"
            onPress={() => navigation.navigate('CumulativeScreen')}
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Picker
        selectedValue={subjectCount}
        onValueChange={setSubjectCount}
        style={styles.picker}>
        {Array.from({length: 10}, (_, i) => (
          <Picker.Item key={i} label={`Subjects: ${i + 1}`} value={i + 1} />
        ))}
      </Picker>
      <Button
        title="Custom Config"
        onPress={() => {
          navigation.navigate('CreateCustomScale');
        }}
      />
      <Picker
        selectedValue={selectedConfig}
        onFocus={loadConfigs}
        onValueChange={handleConfigChange}
        style={styles.picker}>
        <Picker.Item label="Scale-4 (Standard Worldwide)" value="scale-4" />
        <Picker.Item label="Scale-5 (Standard Worldwide)" value="scale-5" />
        <Picker.Item label="─── Custom Scales ───" enabled={false} />
        <Picker.Item label="HEC Kp Grading System (Pakistan)" value="kust" />
        {customConfigs.map((config, index) => (
          <Picker.Item key={index} label={config.name} value={config.name} />
        ))}
      </Picker>

      <ScrollView style={styles.scrollView}>
        {subjects.map((subject, index) => (
          <View key={index} style={styles.subjectContainer}>
            {/* <TextInput
              style={styles.input}
              placeholder={`Subject ${index + 1} Name`}
              value={subject.name}
              onChangeText={text => handleNameChange(index, text)}
            /> */}
            <Picker
              selectedValue={subject.creditHours || 3}
              onValueChange={value => handleCreditHourChange(index, value)} // Update the subject's credit hours
              style={{height: 50, width: 90}}>
              <Picker.Item label="1" value={1} />
              <Picker.Item label="2" value={2} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="4" value={4} />
              <Picker.Item label="5" value={5} />
            </Picker>

            <TextInput
              style={styles.input}
              placeholder={`Score for Subject ${index + 1}`}
              keyboardType="numeric"
              value={subject.score}
              allowFontScaling={false}
              onChangeText={text => handleScoreChange(index, text)}
            />
            <Text
              allowFontScaling={false}
              style={{fontSize: 16, marginLeft: 10, color: '#000'}}>
              {subject.grade}
            </Text>
            {/* Display grade */}
            <TouchableOpacity
              onPress={() => removeSubject(index)}
              style={styles.removeButton}>
              <Entypo
                allowFontScaling={false}
                name="trash"
                color={'red'}
                size={18}
              />
            </TouchableOpacity>
          </View>
        ))}
        <Button title="Calculate GPA" onPress={handleCalculate} />
        <Text allowFontScaling={false} style={styles.result}>
          GPA: {gpa}
        </Text>
        <Text allowFontScaling={false} style={styles.result}>
          Grade: {grade}
        </Text>
        <Button title="Clear All Subjects" onPress={clearAllSubjects} />
        <Button
          title="CGPA Screen"
          onPress={() => navigation.navigate('CumulativeScreen')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  result: {
    fontSize: 18,
    marginVertical: 8,
  },
  scrollView: {
    flex: 1,
  },
  subjectContainer: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  removeButton: {
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
  },
});

export default GPAApp;
