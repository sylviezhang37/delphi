import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import CameraScreen from './src/screens/CameraScreen';

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
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="Camera" component={CameraScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
