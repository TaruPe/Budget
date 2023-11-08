import React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; // Importing the HomeScreen component
import SecondScreen from './screens/SecondScreen'; // Import the SecondScreen component
import ThirdScreen from './screens/ThirdScreen'; // Import the ThirdScreen component
import FourthScreen from './screens/FourthScreen'; // Import the FourthScreen component
import FifthScreen from './screens/FifthScreen'; // Import the FifthScreen component
import Currency from './screens/Currency'; // Import the Currency component

const Stack = createNativeStackNavigator(); // Create a stack for navigation

export default function App() {
  // Load and check if the Zeyada-Regular font is available
  const [loaded] = useFonts({
    'Zeyada-Regular': require('./assets/fonts/Zeyada-Regular.ttf'),
  });

  if (!loaded) {
    // Wait until the font is loaded
    return null;
  }

  // Creates a Navigator stack 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerTitle: 'Home',
          }}
        />
        <Stack.Screen
          name="Second"
          component={SecondScreen}
          options={{
            title: 'Second',
            headerTitle: 'New Event',
          }}
        />
        <Stack.Screen
          name="Third"
          component={ThirdScreen}
          options={{
            title: 'Third',
            headerTitle: 'New Event',
          }}
        />
        <Stack.Screen
          name="Fourth"
          component={FourthScreen}
          options={{
            title: 'Fourth',
            headerTitle: 'Category',
          }}
        />
        <Stack.Screen
          name="Fifth"
          component={FifthScreen}
          options={{
            title: 'Fifth',
            headerTitle: 'Fifth',
          }}
        />
        <Stack.Screen
          name="Currency"
          component={Currency}
          options={{
            title: 'Currency',
            headerTitle: 'Currency',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
