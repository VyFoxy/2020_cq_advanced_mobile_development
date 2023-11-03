import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LoginScreen } from './src/screens/login';
import { RegisterScreen } from './src/screens/register';
import { Tutor } from './src/screens/tutor';
import { Header } from './src/components/header/Header';
import { Grid } from '@mui/material';
import TeacherDetail from './src/screens/teacher-detail';

export default function App() {
  return (
    <View style={styles.container}>
      <Header></Header>
      {/* <LoginScreen /> */}
      {/* <RegisterScreen /> */}
      {/* <Tutor /> */}
      <TeacherDetail />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
