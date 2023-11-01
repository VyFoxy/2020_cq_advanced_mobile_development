import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LoginScreen } from './src/screens/login';
import { Header } from './src/components/header/Header';
import { Grid } from '@mui/material';

export default function App() {
  return (
    <View style={styles.container}>
      <Header></Header>
      <Grid container>
        <Grid item xs={12} md={6}>
          <LoginScreen />
        </Grid>

        <Grid item xs={12} md={6}>
          <LoginScreen />
        </Grid>
      </Grid>

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
