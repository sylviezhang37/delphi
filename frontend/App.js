import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomePage from './components/HomePage';
import ChatScreen from './components/ChatScreen';
import ObservationScreen from './components/ObservationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // We'll handle headers in individual components
        }}
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Observation" component={ObservationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}