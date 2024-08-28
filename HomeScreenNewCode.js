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
  Colors,
  commonGPAConfigScale4,
  commonGPAConfigScale5,
  kustGPAConfig,
} from '../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import CumulativeScreen from './CumulativeScreen';

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
              />
              <Text style={{fontSize: 16, marginLeft: 10, color: '#000'}}>
                {subject.grade}
              </Text>
              <TouchableOpacity
                onPress={() => removeSubject(index)}
                style={styles.removeButton}>
                <Entypo name="trash" color={'red'} size={18} />
              </TouchableOpacity>
            </View>
          ))}
          <Button title="Calculate GPA" onPress={handleCalculate} />
          <Text style={styles.result}>GPA: {gpa}</Text>
          <Button title="Clear All Subjects" onPress={clearAllSubjects} />
        </ScrollView>
      );
    } else if (selectedTab === 'CGPA') {
      return <CumulativeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'SGPA' && styles.activeTabButton,
          ]}
          onPress={() => setSelectedTab('SGPA')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'SGPA' && styles.activeTabText,
            ]}>
            SGPA
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'CGPA' && styles.activeTabButton,
          ]}
          onPress={() => setSelectedTab('CGPA')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'CGPA' && styles.activeTabText,
            ]}>
            CGPA
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render Content Based on Selected Tab */}
      {renderContent()}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
  },
  tabButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  activeTabText: {
    color: Colors.white,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  removeButton: {
    padding: 5,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
  },
  cgpaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cgpaText: {
    fontSize: 24,
  },
});

export default GPAApp;
