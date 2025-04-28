import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrackPlayer from 'react-native-track-player';
import LoveKeyScreen from './src/screens/LoveKeyScreen';
import LoveTreasure from './src/screens/LoveTreasure';
import PoemScreen from './src/screens/PoemScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    async function setupPlayer() {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: 'background-music',
        url: 'https://raw.githubusercontent.com/AjaySharma2003/files/main/background.mp3',  // Your MP3 link
        title: 'Background Music',
        artist: 'Ajay',
        artwork: 'https://dummyimage.com/600x400/000/fff&text=Love', // Optional
      });
      await TrackPlayer.play();
    }

    setupPlayer();

    return () => {
      TrackPlayer.destroy();  // Clean up when app exits
    };
  }, []);

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
