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
import { LocalizationProvider } from './src/context/LocalizationProvider';
import { ThemeProvider } from './src/context/ThemeProvider';
import { AvatarProvider } from './src/context/AvatarProvider';
export default function App() {
  return (
    <LocalizationProvider>
      <AuthProvider>
        <ThemeProvider>
          <AvatarProvider>
            <NavigationContainer>
              <Header />
              {/* <CourseDetail /> */}
              {/* <CoursesSreeen /> */}
              {/* <Tutor /> */}
              <ScreenStackNavigator />
              {/* <TeacherDetail /> */}
            </NavigationContainer>
          </AvatarProvider>
        </ThemeProvider>
      </AuthProvider>
    </LocalizationProvider>
  );
}
