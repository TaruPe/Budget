import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ThirdScreen({ navigation }) {
  const route = useRoute(); // Get the route object
  const [expense, setExpense] = useState('');
  const selectedOption = route.params ? route.params.selectedOption : 'Select'; // Defaults to 'Select' if no parameters const [expense, setExpense] = useState('');

  // Handler function to change the input
  const handleExpenseChange = (text) => {
    setExpense(text);
  };

  // Handler function for sending the output
  const handleExpenseSubmit = () => {
    if (!isNaN(expense) && parseFloat(expense) > 0) {
      // Create a new cost input
      const newEntry = {
        category: selectedOption, // Category for the selected option
        amount: parseFloat(expense), // Amount of input, Convert from text to float
      };
      // Go back to the home screen and send another go input
      navigation.navigate('Home', { newExpenseEntry: newEntry });
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
          <View style={styles.expense}>
            <Text style={styles.expenseTitle}>Expenditures</Text>
          </View>
        </View>
      </View>
      <View style={styles.expensesum}>
        <TextInput
          style={styles.input}
          value={expense}
          onChangeText={handleExpenseChange}
          keyboardType="numeric"
          placeholder="0,00€"
          onSubmitEditing={handleExpenseSubmit} // Called when the accept key is pressed
        />
      </View>

      {/* Left content */}
      <View style={styles.leftContent}>
        <View style={styles.row}>
          <Text style={styles.leftText}>Category</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Fifth', { selectedOption });
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
  expense: {
    marginTop: 60, // Space between "New Event" and "Expenses"
    alignItems: 'center',
  },
  expensesum: {
    marginTop: 10, // Space between "Expense" and "EUR"
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
    borderColor: '#cfa0b5', // Specify the border color
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
  expenseTitle: {
    borderColor: '#cfa0b5',
    backgroundColor: '#cfa0b5',
    borderWidth: 2,
    borderRadius: 50,
    fontSize: 16,
  },
  expenses: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 35,
  },
});