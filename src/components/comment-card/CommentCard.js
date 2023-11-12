import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS, IMGS, ROUTES } from '../../constants';
import { Rating } from '@mui/material';

export default function CommentCard() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avtimg}
        source={
          'https://sandbox.api.lettutor.com/avatar/f569c202-7bbf-4620-af77-ecc1419a6b28avatar1686033849227.jpeg'
        }
      />
      <View style={styles.innnerContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.name}>Phhai </Text>
          <Text style={styles.comment}>4 ngày trước</Text>
        </View>
        <Rating
          name='simple-controlled'
          value={5}
          // onChange={(event, newValue) => {
          //   setRating(newValue);
          // }}
          size='small'
        />

        <Text style={styles.comment}>.......</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 4,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    marginVertical: 5,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row'
  },
  avtimg: {
    width: 25,
    height: 25,
    borderRadius: 50
  },
  innnerContainer: {
    flex: 1,
    marginLeft: 10
  },
  name: {
    fontSize: 12,
    color: 'gray'
  },
  comment: {
    fontSize: 12,
    color: 'gray'
  }
});
