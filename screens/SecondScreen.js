import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function SecondScreen({ navigation }) {
  const route = useRoute(); // Get the route object
  const [income, setIncome] = useState('');
  const selectedOption = route.params ? route.params.selectedOption : 'Select'; // Defaults to 'Select' if no parameters const [income, setIncome] = useState('');

  // Handler function to change the input
  const handleIncomeChange = (text) => {
    setIncome(text);
  };

  // Handler function to send input
  const handleIncomeSubmit = () => {
    if (!isNaN(income) && parseFloat(income) > 0) {
      // Create a new input option
      const option = {
        category: selectedOption, // Category for the selected option
        amount: parseFloat(income), // Amount of input, Convert from text to float
      };
      // Go back to the home screen and send another input
      navigation.navigate('Home', { newIncomeEntry: option });
    }
  };

  const currentDate = new Date(); // Get the current date
  const currentDateString = currentDate.toISOString().split('T')[0]; // Convert the date to a string and extract the necessary data

  // Use useLayoutEffect to set navigation headers
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#fbecf3',
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View>
          <View style={styles.income}>
            <Text style={styles.incomeTitle}>Incomes</Text>
          </View>
        </View>
      </View>
      <View style={styles.incomesum}>
        <TextInput
          style={styles.input}
          value={income}
          onChangeText={handleIncomeChange}
          keyboardType="numeric"
          placeholder="0,00€"
          onSubmitEditing={handleIncomeSubmit} // Called when the accept key is pressed
        />
      </View>

      {/* Left content */}
      <View style={styles.leftContent}>
        <View style={styles.row}>
          <Text style={styles.leftText}>Category</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Fourth', { selectedOption });
            }}
          >
            <Text>{selectedOption} ></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>Date</Text>
          <Text style={styles.rightText}>{currentDateString}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>Account</Text>
          <Text style={styles.rightText}>Checking Account</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbecf3',
  },
  income: {
    marginTop: 60, // Space between "New Event" and "Incomes"
    alignItems: 'center',
  },
  incomesum: {
    marginTop: 10, // Space between "Incomes" and "EUR"
    alignItems: 'center',
  },
  leftContent: {
    marginTop: 20,
    marginLeft: 10, // Set the left margin
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5, // Add a border at the bottom
    borderColor: '#cfa0b5',
    padding: 20, // Add space around each row
    marginRight: 10, // Set the right margin
  },
  leftText: {
    flex: 1,
    fontSize: 16,
  },
  rightText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
  incomeTitle: {
    borderColor: '#cfa0b5',
    backgroundColor: '#cfa0b5',
    borderWidth: 2,
    borderRadius: 50,
    fontSize: 16,
  },
  input: {
    fontSize: 35,
  },
});