import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HistoryScreen } from '../screens/history';
import { BookingStudentScreen } from '../screens/booking-student';
import { Tutor } from '../screens/tutor';
import { CoursesSreeen } from '../screens/courses';
import { ROUTES, COLORS } from '../constants';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={ROUTES.HOME} component={Tutor} />
      <Drawer.Screen name={ROUTES.HISTORY} component={HistoryScreen} />
      <Drawer.Screen
        name={ROUTES.BOOKINGSTUDENT}
        component={BookingStudentScreen}
      />
      <Drawer.Screen name={ROUTES.COURSE} component={CoursesSreeen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
