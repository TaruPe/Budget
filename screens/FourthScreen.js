import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function FourthScreen({ navigation }) {
  // Function that navigates back to the second screen with the selected option
  const goBackWithSelection = (option) => {
    navigation.navigate('Second', { selectedOption: option });
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
    <View style={styles.container}>
      <View>
      </View>
      {/* Display text and icons side by side in rows */}
      <View style={styles.row}>
        <View style={styles.center}>
          <TouchableOpacity onPress={() => goBackWithSelection('Internet')}>
            <MaterialIcons name="wifi" size={24} color="lightblue" />
          </TouchableOpacity>
          <Text>Internet</Text>
        </View>

        <View style={styles.center}>
          <TouchableOpacity onPress={() => goBackWithSelection('Viihde')}>
            <MaterialIcons name="devices-other" size={24} color="lightblue" />
          </TouchableOpacity>
          <Text>Viihde</Text>
        </View>

        <View style={styles.center}>
          <TouchableOpacity onPress={() => goBackWithSelection('Lahja')}>
            <MaterialIcons name="card-giftcard" size={24} color="lightblue" />
          </TouchableOpacity>
          <Text>Lahja</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.center}>
          <TouchableOpacity onPress={() => goBackWithSelection('Urheilu')}>
            <MaterialIcons name="fitness-center" size={24} color="lightblue" />
          </TouchableOpacity>
          <Text>Urheilu</Text>
        </View>
        <View style={styles.center}>
          <TouchableOpacity onPress={() => goBackWithSelection('Ravintolat')}>
            <MaterialIcons name="restaurant-menu" size={24} color="pink" />
          </TouchableOpacity>
          <Text>Ravintolat</Text>
        </View>
        <View style={styles.center}>
          <TouchableOpacity onPress={() => goBackWithSelection('Kahvi')}>
            <MaterialIcons name="local-cafe" size={24} color="pink" />
          </TouchableOpacity>
          <Text>Kahvi</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.center}>
          <TouchableOpacity onPress={() => goBackWithSelection('Ruokaost')}>
            <MaterialIcons name="shopping-cart" size={24} color="pink" />
          </TouchableOpacity>
          <Text>Ruokaost</Text>
        </View>
        <View style={styles.center}>
          <TouchableOpacity onPress={() => goBackWithSelection('Vuokra')}>
            <MaterialIcons name="home-filled" size={24} color="violet" />
          </TouchableOpacity>
          <Text>Vuokra</Text>
        </View>
        <View style={styles.center}>
          <TouchableOpacity onPress={() => goBackWithSelection('Palkka')}>
            <MaterialIcons name="euro-symbol" size={24} color="violet" />
          </TouchableOpacity>
          <Text>Palkka</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.center}>
          <TouchableOpacity onPress={() => goBackWithSelection('Sijoitukset')}>
            <MaterialIcons name="show-chart" size={24} color="violet" />
          </TouchableOpacity>
          <Text>Sijoitukset</Text>
        </View>
        <View style={styles.center}>
          <TouchableOpacity onPress={() => goBackWithSelection('Säästötili')}>
            <MaterialIcons name="account-balance" size={24} color="violet" />
          </TouchableOpacity>
          <Text>Säästötili</Text>
        </View>
        <View style={styles.center}>
          <TouchableOpacity onPress={() => goBackWithSelection('Matkat')}>
            <MaterialIcons name="directions-bus" size={24} color="orange" />
          </TouchableOpacity>
          <Text>Matkat</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.center}>
          <TouchableOpacity onPress={() => goBackWithSelection('Loma')}>
            <MaterialIcons name="beach-access" size={24} color="orange" />
          </TouchableOpacity>
          <Text>Loma</Text>
        </View>
        <View style={styles.center}>
          <TouchableOpacity onPress={() => goBackWithSelection('Taksi')}>
            <MaterialIcons name="local-taxi" size={24} color="orange" />
          </TouchableOpacity>
          <Text>Taksi</Text>
        </View>
        <View style={styles.center}>
          <TouchableOpacity onPress={() => goBackWithSelection('Kaasu')}>
            <MaterialIcons name="local-gas-station" size={24} color="orange" />
          </TouchableOpacity>
          <Text>Kaasu</Text>
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
  row: {
    flexDirection: 'row', // Display items horizontally
    width: '100%',
    padding: 20, // Add space around each row
    justifyContent: 'space-around', // To evenly space items horizontally
    marginTop: 50,
  },
  center: {
    alignItems: 'center',
  },
});
