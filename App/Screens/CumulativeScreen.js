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
  Switch,
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
  const [showCreditHours, setShowCreditHours] = useState(true);

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
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
          width: '100%',
        }}>
        <TouchableOpacity
          style={styles.pickerContainer}
          activeOpacity={0.8}
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 8,
            borderColor: Colors.primary,
            height: 50,
            padding: 10,
            paddingRight: 0,
            // marginVertical: 20,
          }}>
          <Text style={{fontSize: 16, marginRight: 5, color: theme.textColor}}>
            Show Cr Hrs
          </Text>
          <Switch
            trackColor={{false: Colors.lightGray, true: Colors.primary}}
            thumbColor={showCreditHours ? Colors.white : Colors.darkGray}
            onValueChange={() => setShowCreditHours(prev => !prev)}
            value={showCreditHours}
          />
        </View>
      </View>

      <FlatList
        data={entries}
        style={{marginVertical: 10}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.entry}>
            <View style={styles.semesterContainer}>
              <Text style={[styles.semesterText, {color: theme.textColor}]}>
                Semester {item.semester}
              </Text>
            </View>
            <View style={{alignItems: 'center', alignSelf: 'center', flex: 1}}>
              <TextInput
                style={[styles.input, {color: theme.textColor}]}
                cursorColor={Colors.primary}
                placeholder="SGPA"
                placeholderTextColor={theme.placeholderColor}
                keyboardType="numeric"
                value={item.sgpa}
                onChangeText={text => handleInputChange(index, 'sgpa', text)}
                maxLength={5}
              />
            </View>
            {showCreditHours && (
              <View style={{flex: 0.7, right: 5}}>
                <TextInput
                  style={[
                    styles.input,
                    {color: theme.textColor, textAlign: 'right'},
                  ]}
                  placeholder="Cr Hrs"
                  placeholderTextColor={theme.placeholderColor}
                  multiline={false}
                  numberOfLines={1}
                  scrollEnabled={false}
                  keyboardType="numeric"
                  value={item.creditHours}
                  onChangeText={text =>
                    handleInputChange(index, 'creditHours', text)
                  }
                  maxLength={3}
                />
              </View>
            )}
          </View>
        )}
      />

      <Button title="Calculate CGPA" onPress={calculateCgpa} />
      {cgpa !== null && <Text style={styles.result}>Your CGPA: {cgpa}</Text>}

      <Modal
        isVisible={isSemesterModalVisible}
        onBackdropPress={() => setSemesterModalVisible(false)}>
        <View
          style={[
            styles.modalContent,
            {backgroundColor: theme.backgroundColorHome},
          ]}>
          <TouchableOpacity
            onPress={() => {
              setNumberOfSemesters(null);
              setEntries([]);
              setSemesterModalVisible(false);
            }}></TouchableOpacity>
          {Array.from({length: 10}, (_, i) => i + 1).map(num => (
            <TouchableOpacity
              key={num}
              onPress={() => {
                setNumberOfSemesters(num);
                initializeEntries(num);
                setSemesterModalVisible(false);
              }}>
              <Text style={[styles.modalItem, {color: theme.textColor}]}>
                Semester {num}
              </Text>
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
    // marginBottom: 20,
    alignSelf: 'flex-start',
    padding: 15,
  },
  pickerText: {
    color: '#fff',
  },
  input: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    margin: 0,
    padding: 0,
  },
  entry: {
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 8,
    width: '100%',
  },
  semesterContainer: {alignItems: 'flex-start', flex: 1},
  semesterText: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  creditHoursContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  result: {
    color: '#fff',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContent: {
    // backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalItem: {
    paddingVertical: 10,
    fontSize: 18,
  },
});

export default CumulativeScreen;
