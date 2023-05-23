import React from 'react';
import { StatusBar, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <HomeScreen />
    </View>
  );
}