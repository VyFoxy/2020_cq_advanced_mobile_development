import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from './src/components/header/Header';
import ScreenStackNavigator from './src/navigations/ScreenStackNavigator';
export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <ScreenStackNavigator />
    </NavigationContainer>
  );
}
