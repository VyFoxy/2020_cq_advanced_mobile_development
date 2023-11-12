import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/login';
import { RegisterScreen } from '../screens/register';
import { TeacherDetail } from '../screens/teacherdetail';
import { HistoryScreen } from '../screens/history';
import DrawerNavigator from './DrawerNavigator';
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
      {/* <Stack.Screen
        name={ROUTES.HOME}
        component={Tutor}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name={ROUTES.HOME_DRAWER}
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.TEACHER_DETAIL}
        component={TeacherDetail}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name={ROUTES.HISTORY}
        component={HistoryScreen}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}

export default ScreenStackNavigator;
