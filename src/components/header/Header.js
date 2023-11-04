import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Button, Grid, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { IMGS } from '../../constants';
export const Header = () => {
  return (
    <View style={styles.header}>
      <Grid container>
        <Grid item xs={6} md={6}>
          <Image
            source={require('../../../assets/img/logo.svg')}
            style={styles.logo}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <div style={styles.headerRight}>
            <TouchableOpacity style={styles.button}>
              <Image source={IMGS.vi} style={styles.flagIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuIcon}>
              <MenuIcon></MenuIcon>
            </TouchableOpacity>
          </div>
        </Grid>
      </Grid>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    position: 'fixed',
    width: '100%',
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
    shadowRadius: 3,
    paddingLeft: 18,
    paddingRight: 10,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px -1px 13px 2px'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  logo: {
    maxHeight: 44,
    height: '100%',
    width: 'auto',
    overflow: 'none',
    position: 'relative'
  },
  label: {
    fontSize: 18, // Customize the label's font size
    color: 'white' // Customize the label's text color
  },
  button: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    backgroundColor: '#E4E6EB',
    marginLeft: 'auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  flagIcon: {
    opacity: 1,
    width: 20,
    height: 20,
    borderRadius: '50%',
    overflow: 'hidden'
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    backgroundColor: '#E4E6EB',
    marginLeft: 'auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  }
});
