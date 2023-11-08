import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function CurrencyConverter({ navigation }) { // Component CurrencyConverter that handles currency conversion
  const [baseCurrency, setBaseCurrency] = useState('EUR'); // State for base currency (default 'EUR')
  const [symbols, setSymbols] = useState(''); // Mode for currency symbols
  const [exchangeRate, setExchangeRate] = useState(null); // Mode for exchange courses (initialized to null, data will be retrieved)

  const fetchExchangeRate = () => {
    // Build URL for API request based on base currency and symbols
    const apiKey = process.env.EXPO_PUBLIC_API_KEY; // Add your own API key here
    const url = `https://api.currencybeacon.com/v1/latest?api_key=${apiKey}&base=${baseCurrency}&symbols=${symbols}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.rates) {
          setExchangeRate(data.rates);
        } else {
          console.error('Exchange rate data not available in the response');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    // Don't do an automatic search, so exchangeRate is initially empty
    //fetchExchangeRate();
  }, []);

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
      <Text style={styles.currency}>Base Currency:</Text>
      <TextInput style={styles.space}
        placeholder="Enter base currency (e.g., EUR)"
        onChangeText={(text) => setBaseCurrency(text)}
      />
      <Text style={styles.symbol}>Symbols:</Text>
      <TextInput style={styles.space}
        placeholder="Enter symbols (e.g., USD,GBP)"
        onChangeText={(text) => setSymbols(text)}
      />
      <Button
        title="Fetch Exchange Rate"
        onPress={fetchExchangeRate}
        color="#cfa0b5" // Change button color
        titleStyle={{
          fontSize: 20, // Change the font size
          fontWeight: 'bold',
        }}
      />

      {exchangeRate !== null && (
        <Text>Exchange Rate: {JSON.stringify(exchangeRate)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbecf3',
  },
  currency: {
    fontFamily: 'Zeyada-Regular',
    fontSize: 35,
    backgroundColor: '#cfa0b5',
    borderColor: '#cfa0b5',
    borderRadius: 50,
    marginLeft: 10,
    marginRight: 220,
    marginTop: 20,
  },
  symbol: {
    fontFamily: 'Zeyada-Regular',
    fontSize: 35,
    backgroundColor: '#cfa0b5',
    borderColor: '#cfa0b5',
    borderRadius: 50,
    marginLeft: 10,
    marginRight: 300,
  },
  space: {
    marginBottom: 20,
    left: 10,
  },
});

