import React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1
  }
});
export const LoginScreen = () => {
  return (
    <>
      <Image
        source={require('../../../assets/img/login.8d01124a.png')}
        style={styles.image}
      />
    </>
  );
};
