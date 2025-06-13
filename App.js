// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import ProcessingScreen from './src/screens/ProcessingScreen';
import RecognitionResultScreen from './src/screens/RecognitionResultScreen';
import AddPersonScreen from './src/screens/AddPersonScreen';
import PeopleListScreen from './src/screens/PeopleListScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Processing" component={ProcessingScreen} />
          <Stack.Screen name="RecognitionResult" component={RecognitionResultScreen} />
          <Stack.Screen name="AddPerson" component={AddPersonScreen} />
          <Stack.Screen name="PeopleList" component={PeopleListScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
