import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from './src/components/header/Header';
import { CoursesSreeen } from './src/screens/courses';
import ScreenStackNavigator from './src/navigations/ScreenStackNavigator';
import DrawerNavigator from './src/navigations/DrawerNavigator';
export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <CoursesSreeen />
      {/* <ScreenStackNavigator /> */}
    </NavigationContainer>
  );
}
