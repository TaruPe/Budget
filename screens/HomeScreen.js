import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native'; // Import useFocusEffect

export default function HomeScreen({ navigation }) {
  const route = useRoute(); // Get the route object
  const [incomeEntries, setIncomeEntries] = useState([]); // Table of incomes
  const [expenseEntries, setExpenseEntries] = useState([]); // Table of expenses

  // State variables
  const [currentMonthYear, setCurrentMonthYear] = useState(''); // Date representation "month year"
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date

  // Cases that update incomes
  useEffect(() => {
    if (route.params && route.params.newIncomeEntry) {
      const newIncomeEntry = route.params.newIncomeEntry;
      if (!isNaN(newIncomeEntry.amount) && newIncomeEntry.amount > 0) {
        setIncomeEntries([...incomeEntries, newIncomeEntry]);
      }
    }
  }, [route.params]);

  // Cases that update expenses
  useEffect(() => {
    if (route.params && route.params.newExpenseEntry) {
      const newExpenseEntry = route.params.newExpenseEntry;
      if (!isNaN(newExpenseEntry.amount) && newExpenseEntry.amount > 0) {
        setExpenseEntries([...expenseEntries, newExpenseEntry]);
      }
    }
  }, [route.params]);

  // Total incomes and total expenses are calculated
  const totalIncome = incomeEntries.reduce((acc, entry) => acc + entry.amount, 0);
  const totalExpenses = expenseEntries.reduce((acc, entry) => acc + entry.amount, 0);

  // Updating the month and year presentation to the current date
  useEffect(() => {
    setCurrentMonthYear(formatDate(currentDate));
  }, [currentDate]);

  // Formatting the date
  const formatDate = (date) => {
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleString('default', options);
  };

  // Functions for selecting the previous month
  const previousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  // Functions for selecting next month
  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Use useLayoutEffect to set navigation headers
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#fbecf3',
      },
    });
  }, []);


  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>

        {/* Display current month and year with navigation arrows */}
        <View style={styles.header}>
          <TouchableOpacity onPress={previousMonth}>
            <Text style={styles.arrow}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.currentMonthYear}>{currentMonthYear}</Text>
          <TouchableOpacity onPress={nextMonth}>
            <Text style={styles.arrow}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Display Summary with title */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary</Text>

          {/* Display "Balance," "Income," and "Expenses" side by side */}
          <View style={styles.summaryItems}>
            <View style={[styles.summaryItem, styles.divider]}>
              <Text style={styles.sum}>BALANCE</Text>
              <Text>{(totalIncome - totalExpenses).toFixed(2)}€</Text>
            </View>
            <View style={[styles.summaryItem, styles.divider]}>
              <Text style={styles.sum}>INCOME</Text>
              <Text>{totalIncome.toFixed(2)}€</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.sum}>EXPENSES</Text>
              <Text>{totalExpenses.toFixed(2)}€</Text>
            </View>
          </View>
        </View>

        {/* Display Income with title and button */}
        <View style={styles.incomeContainer}>
          <Text style={styles.incomeTitle}>Income</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigation.navigate('Second');
            }}
          >
            <View style={styles.buttonContent}>
              {incomeEntries.length === 0 ? (
                <>
                  <Text style={styles.buttonText}>There are no incomes for this period.</Text>
                  <Text style={styles.textBelow}>Tap to add incomes.</Text>
                </>
              ) : (
                <View style={styles.entry}>
                  {incomeEntries.map((entry, index) => (
                    <View key={index}>
                      <View style={styles.categoryAmount}>
                        <Text style={styles.category}>{entry.category}</Text>
                        <Text style={styles.amount}>{entry.amount.toFixed(2)}€</Text>
                      </View>
                      {index !== incomeEntries.length - 1 && <View style={styles.separator} />}
                    </View>
                  ))}
                </View>
              )}
            </View>
            <Ionicons name="md-add-circle" size={32} color="#feaded" style={styles.plusIcon} />
          </TouchableOpacity>
        </View>

        {/* Display Expenditure with title and button */}
        <View style={styles.expenditureContainer}>
          <Text style={styles.expenditureTitle}>Expenditure</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigation.navigate('Third');
            }}
          >
            <View style={styles.buttonContent}>
              {expenseEntries.length === 0 ? (
                <>
                  <Text style={styles.buttonText}>There are no expenses for this period.</Text>
                  <Text style={styles.textBelow}>Tap to add expenses.</Text>
                </>
              ) : (
                <View style={styles.entry}>
                  {expenseEntries.map((entry, index) => (
                    <View key={index}>
                      <View style={styles.categoryAmount}>
                        <Text>{entry.category}</Text>
                        <Text style={styles.amount}>{entry.amount.toFixed(2)}€</Text>
                      </View>
                      {index !== expenseEntries.length - 1 && <View style={styles.separator} />}
                    </View>
                  ))}
                </View>
              )}
            </View>
            <Ionicons name="md-add-circle" size={32} color="#e0caff" style={styles.plusIcon} />
          </TouchableOpacity>
        </View>

        {/* Display current Currency */}
        <View style={styles.currencyContainer}>
          <Text style={styles.currencyTitle}>Currency</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigation.navigate('Currency'); // Go to screen
            }}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Current Currency</Text>
              <Text style={styles.textBelow}>Tap to check current Currency.</Text>
            </View>
            <Ionicons name="md-add-circle" size={32} color="#bcaded" style={styles.plusIcon} />
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fbecf3', // Background color for the entire ScrollView
  },
  container: {
    alignItems: 'center',
    marginTop: 35,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  arrow: {
    fontSize: 24,
    marginHorizontal: 10,
    color: '#cfa0b5'
  },
  currentMonthYear: {
    fontSize: 16,
  },
  summaryContainer: {
    marginBottom: 30,
    width: '80%',
  },
  summaryTitle: {
    fontSize: 40,
    marginBottom: 5,
    fontFamily: 'Zeyada-Regular',
  },
  summaryItems: {
    flexDirection: 'row', // Display items horizontally
    justifyContent: 'space-between', // Space between items
    width: '100%',
  },
  sum: {
    borderColor: '#cfa0b5',
    backgroundColor: '#cfa0b5',
    borderWidth: 2,
    borderRadius: 50,
    fontSize: 16,
  },
  summaryItem: {
    flex: 1, // Evenly divides the space between the elements
    alignItems: 'center',
    paddingRight: 10, // Add right border spacing to all elements
  },
  divider: {
    borderRightWidth: 1, // Add a dash to the right
    borderColor: '#cfa0b5',
    borderStyle: 'dashed', // Set border style to "dashed"
  },
  incomeContainer: {
    marginBottom: 30,
    width: '80%',
  },
  incomeTitle: {
    fontSize: 40,
    marginBottom: 5,
    fontFamily: 'Zeyada-Regular',
  },
  currencyContainer: {
    marginBottom: 30,
    width: '80%',
  },
  currencyTitle: {
    fontSize: 40,
    marginBottom: 5,
    fontFamily: 'Zeyada-Regular'
  },
  expenditureContainer: {
    marginBottom: 30,
    width: '80%',
  },
  expenditureTitle: {
    fontSize: 40,
    marginBottom: 5,
    fontFamily: 'Zeyada-Regular'
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cfa0b5',
    padding: 8,
    marginBottom: 10,
  },
  incomeList: {
    width: '80%',
    maxHeight: 200,
  },
  currentMonthYear: {
    fontSize: 16,
    marginLeft: 'auto', // Align the current month and year to the left
    marginRight: 'auto', // Align the current month and year to the right
  },
  addButton: {
    backgroundColor: '#fbecf3',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Space between items
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#cfa0b5',
  },
  buttonText: {
    color: 'black',
    fontSize: 13,
  },
  textBelow: {
    color: 'black',
    fontSize: 13,
  },
  buttonContent: {
    flexDirection: 'column', // Arrange the elements vertically below each other
    alignItems: 'flex-start', // Set the elements to the left edge
    justifyContent: 'center', // Center the elements vertically
  },
  entry: {
    flexDirection: 'column', // Display items vertically
  },
  categoryAmount: {
    flexDirection: 'row', // Display category and amount side by side
    justifyContent: 'space-between', // Space between items

  },
  amount: {
    marginLeft: 145, // Add some margin between category and amount
  },
  separator: {
    height: 1,
    backgroundColor: '#cfa0b5',
    marginVertical: 5,
  },
});