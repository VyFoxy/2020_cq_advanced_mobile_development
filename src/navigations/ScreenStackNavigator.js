import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/login';
import { RegisterScreen } from '../screens/register';
import { TeacherDetail } from '../screens/teacher-detail';
import { Tutor } from '../screens/tutor';
import { ROUTES } from '../constants';
const Stack = createStackNavigator();

function ScreenStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.REGISTER}
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.HOME}
        component={Tutor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.TEACHER_DETAIL}
        component={TeacherDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ScreenStackNavigator;
