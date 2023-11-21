import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HistoryScreen } from '../screens/history';
import { BookingStudentScreen } from '../screens/booking-student';
import { Tutor } from '../screens/tutor';
import { ScreenStackNavigator } from './ScreenStackNavigator';
import { ROUTES, COLORS } from '../constants';
// import CustomDrawer from '../components/CustomDrawer';
// import ThemeContext from '../context/ThemeProvider';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  //const { themeData } = useContext(ThemeContext);
  return (
    <Drawer.Navigator
    //   drawerContent={(props) => <CustomDrawer {...props} />}
    //   screenOptions={{
    //     headerTitleAlign: 'center',
    //     headerTintColor: themeData.color,
    //     drawerActiveBackgroundColor: COLORS.primary,
    //     drawerActiveTintColor: COLORS.white,
    //     drawerInactiveTintColor: themeData.color,
    //     headerStyle: {
    //       backgroundColor: COLORS.primary
    //     },
    //     drawerStyle: {
    //       backgroundColor: themeData.backgroundColor,
    //       borderColor: COLORS.white,
    //       borderWidth: 1
    //     }
    //   }}
    >
      <Drawer.Screen name={ROUTES.HOME} component={Tutor} />
      <Drawer.Screen name={ROUTES.HISTORY} component={HistoryScreen} />
      <Drawer.Screen
        name={ROUTES.BOOKINGSTUDENT}
        component={BookingStudentScreen}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
