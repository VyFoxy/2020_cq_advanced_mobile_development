import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from './src/components/header/Header';
import { HistoryScreen } from './src/screens/history';
import ScreenStackNavigator from './src/navigations/ScreenStackNavigator';
import DrawerNavigator from './src/navigations/DrawerNavigator';
export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <ScreenStackNavigator />
    </NavigationContainer>
    // <>
    //   <Header />
    //   <HistoryScreen />
    // </>
  );
}
