import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Button, Grid, IconButton, Toolbar } from '@mui/material';
export const Header = () => {
  return (
    <View style={styles.header}>
      <Grid container>
        <Grid item xs={6} md={6}>
          <Image
            source={require('../../../assets/img/logo.svg')} // Replace with your logo image
            style={styles.logo}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <TouchableOpacity style={styles.button}></TouchableOpacity>
        </Grid>
      </Grid>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    position: 'fixed',
    height: 70,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 1,
    shadowRadius: 3
  },
  logo: {
    height: 39, // Set width to 100% to make it follow the height
    aspectRatio: 1
  },
  label: {
    fontSize: 18, // Customize the label's font size
    color: 'white' // Customize the label's text color
  },
  button: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    backgroundColor: '#E4E6EB'
  }
});
