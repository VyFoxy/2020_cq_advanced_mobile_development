import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS, IMGS, ROUTES } from '../../constants';
import { Rating } from 'react-native-ratings';

export default function CommentCard(props) {
  const { item } = props;
  return (
    <View style={styles.container}>
      <Image style={styles.avtimg} source={item?.firstInfo.avatar} />
      <View style={styles.innnerContainer}>
        <Text style={styles.name}>{item?.firstInfo?.name} </Text>
        <Rating startingValue={item?.rating} imageSize={10} isDisabled={true} />

        <Text style={styles.comment}>{item?.content}</Text>
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
