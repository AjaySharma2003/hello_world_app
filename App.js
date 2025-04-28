import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoveKeyScreen from './src/screens/LoveKeyScreen';
import LoveTreasure from './src/screens/LoveTreasure';
import PoemScreen from './src/screens/PoemScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoveKey"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LoveKey" component={LoveKeyScreen} />
        <Stack.Screen name="LoveTreasure" component={LoveTreasure} />
        <Stack.Screen name="PoemScreen" component={PoemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
