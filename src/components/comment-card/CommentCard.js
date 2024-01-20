import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS, IMGS, ROUTES } from '../../constants';
import { Rating } from 'react-native-ratings';
import { isEmpty } from 'lodash';

export default function CommentCard(props) {
  const { item } = props;
  return (
    <View style={styles.container}>
      <Image style={styles.avtimg} source={{ uri: item?.firstInfo.avatar }} />
      <View style={styles.innnerContainer}>
        {!isEmpty(item?.firstInfo?.name) && (
          <Text style={styles.name}>{item?.firstInfo?.name} </Text>
        )}

        <Rating startingValue={item?.rating} imageSize={15} readonly />
        {!isEmpty(item?.content) && (
          <Text style={styles.name}>{item?.content} </Text>
        )}
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
    width: 35,
    height: 35,
    borderRadius: 50
  },
  innnerContainer: {
    flex: 1,
    marginLeft: 10
  },
  name: {
    fontSize: 15,
    color: 'gray'
  },
  comment: {
    fontSize: 15,
    color: 'gray'
  }
});
