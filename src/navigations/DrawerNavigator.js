import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HistoryScreen } from '../screens/history';
import { BookingStudentScreen } from '../screens/booking-student';
import { Tutor } from '../screens/tutor';
import { CoursesSreeen } from '../screens/courses';
import { CourseDetail } from '../screens/courses/detail';
import { ROUTES, COLORS } from '../constants';
import { Profile } from '../screens/profile';
import { Settings } from '../screens/setting';
import { PDFView } from '../screens/pdf-reader';
import { Video } from '../screens/video-call';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={ROUTES.HOME}
        component={Tutor}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={ROUTES.VIDEO_CALL}
        component={Video}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={ROUTES.HISTORY}
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={ROUTES.BOOKINGSTUDENT}
        component={BookingStudentScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={ROUTES.COURSE}
        component={CoursesSreeen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={ROUTES.COURSE_DETAIL}
        component={CourseDetail}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={ROUTES.PDF_VIEW}
        component={PDFView}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={ROUTES.PROFILE}
        component={Profile}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={ROUTES.SETTINGS}
        component={Settings}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
