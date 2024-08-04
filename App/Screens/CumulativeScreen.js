import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modal';
import Big from 'big.js';
import Colors from '../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../ThemeContext';
import {darkTheme, lightTheme} from '../../themes';

const CumulativeScreen = ({navigation}) => {
  const {isDarkTheme, toggleTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const [numberOfSemesters, setNumberOfSemesters] = useState(null);
  const [entries, setEntries] = useState([]);
  const [cgpa, setCgpa] = useState(null);
  const [isSemesterModalVisible, setSemesterModalVisible] = useState(false);
  const [isCreditHoursModalVisible, setCreditHoursModalVisible] =
    useState(false);
  const [selectedEntryIndex, setSelectedEntryIndex] = useState(null);

  const initializeEntries = numSemesters => {
    const initialEntries = Array.from({length: numSemesters}, (_, i) => ({
      semester: i + 1,
      sgpa: '',
      creditHours: '',
    }));
    setEntries(initialEntries);
  };

  const handleInputChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  const calculateCgpa = () => {
    if (entries.length > 0) {
      const totalSemesters = entries.length;
      const totalSgpa = entries.reduce(
        (acc, entry) => acc.plus(new Big(entry.sgpa || 0)),
        new Big(0),
      );
      const calculatedCgpa = totalSgpa.div(totalSemesters);
      setCgpa(calculatedCgpa.toFixed(2));
    }
  };

  const navigationData = data => {
    navigation.navigate('ChartScreen', {data: data});
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColorHome}]}>
      {/* <StatusBar
        backgroundColor={'transparent'}
        barStyle={theme.statusContent}
      /> */}
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => setSemesterModalVisible(true)}>
        <Text style={styles.pickerText}>Add Semesters</Text>
        {/* <Text style={styles.pickerText}>
          {numberOfSemesters !== null
            ? `Semester ${numberOfSemesters}`
            : 'Add Semesters'}
        </Text> */}
        <Icon
          name="caret-down"
          size={16}
          color={Colors.white}
          style={{left: 5}}
        />
      </TouchableOpacity>

      <FlatList
        data={entries}
        style={{marginVertical: 10}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.entry}>
            <View style={styles.semesterContainer}>
              <Text style={styles.semesterText}>Semester {item.semester}</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="SGPA"
              placeholderTextColor={'silver'}
              keyboardType="numeric"
              value={item.sgpa}
              onChangeText={text => handleInputChange(index, 'sgpa', text)}
              maxLength={5}
            />
            <TouchableOpacity
              style={styles.creditHoursContainer}
              onPress={() => {
                setSelectedEntryIndex(index);
                setCreditHoursModalVisible(true);
              }}>
              <Text style={styles.pickerText}>
                {item.creditHours ? `${item.creditHours} Cr Hrs` : 'Cr Hrs'}
              </Text>
              <Icon
                name="caret-down"
                size={16}
                color={Colors.white}
                style={{left: 5}}
              />
            </TouchableOpacity>
          </View>
        )}
      />

      <Button title="Calculate CGPA" onPress={calculateCgpa} />
      {cgpa !== null && <Text style={styles.result}>Your CGPA: {cgpa}</Text>}

      <Modal
        isVisible={isSemesterModalVisible}
        onBackdropPress={() => setSemesterModalVisible(false)}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => {
              setNumberOfSemesters(null);
              setEntries([]);
              setSemesterModalVisible(false);
            }}>
            <Text style={styles.modalItem}>No Semesters</Text>
          </TouchableOpacity>
          {Array.from({length: 10}, (_, i) => i + 1).map(num => (
            <TouchableOpacity
              key={num}
              onPress={() => {
                setNumberOfSemesters(num);
                initializeEntries(num);
                setSemesterModalVisible(false);
              }}>
              <Text style={styles.modalItem}>Semester {num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <Modal
        isVisible={isCreditHoursModalVisible}
        onBackdropPress={() => setCreditHoursModalVisible(false)}>
        <View style={styles.modalContent}>
          {Array.from({length: 5}, (_, i) => i + 1).map(num => (
            <TouchableOpacity
              key={num}
              onPress={() => {
                handleInputChange(selectedEntryIndex, 'creditHours', num);
                setCreditHoursModalVisible(false);
              }}>
              <Text style={styles.modalItem}>{num} Cr Hrs</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  pickerContainer: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 20,
    alignSelf: 'flex-start',
    padding: 15,
  },
  pickerText: {
    color: '#fff',
  },
  input: {
    color: '#fff',
    borderRadius: 5,
    // textAlign: 'center',
  },
  entry: {
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    width: '100%',
  },
  semesterContainer: {},
  semesterText: {
    color: '#fff',
  },
  creditHoursContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  result: {
    color: '#fff',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalItem: {
    paddingVertical: 10,
    fontSize: 18,
  },
});

export default CumulativeScreen;
