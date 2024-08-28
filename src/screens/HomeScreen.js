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
} from '../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CumulativeScreen, SemesterGpa} from '../screens';
import {ThemeContext} from '../config';
import {darkTheme, lightTheme, Colors} from '../constants';

const HomeScreen = ({navigation}) => {
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const [selectedTab, setSelectedTab] = useState('SGPA');

  function renderContent() {
    if (selectedTab == 'SGPA') {
      return <SemesterGpa navigation={navigation} />;
    } else {
      return <CumulativeScreen navigation={navigation} />;
    }
  }

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColorHome}]}>
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
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70,
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

export default HomeScreen;
