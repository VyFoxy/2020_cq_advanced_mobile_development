import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from './src/components/header/Header';
import { CoursesSreeen } from './src/screens/courses';
import { CourseDetail } from './src/screens/courses/detail';
import ScreenStackNavigator from './src/navigations/ScreenStackNavigator';
import { Tutor } from './src/screens/tutor';
import { TeacherDetail } from './src/screens/teacherdetail';
import { AuthProvider } from './src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  useEffect(() => {
    async function getAccessToken() {
      await AsyncStorage.setItem(
        'accessToken',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjgiLCJpYXQiOjE3MDU0Njg5MDUsImV4cCI6MTcwNTU1NTMwNSwidHlwZSI6ImFjY2VzcyJ9.nDkha0hVG972XYSAPCxKyoXVzMagwpFhb3CwEpRuXhQ'
      );
    }
    getAccessToken();
  }, []);

  useEffect(() => {
    async function getAccessToken() {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        console.log(accessToken);
        //navigation.navigate(ROUTES.HOME);
      }
    }
    getAccessToken();
  }, []);
  return (
    <AuthProvider>
      <NavigationContainer>
        <Header />
        {/* <CourseDetail /> */}
        {/* <CoursesSreeen /> */}
        {/* <Tutor /> */}
        <ScreenStackNavigator />
        {/* <TeacherDetail /> */}
      </NavigationContainer>
    </AuthProvider>
  );
}
