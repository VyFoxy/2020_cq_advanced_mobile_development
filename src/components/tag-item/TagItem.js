import React from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';

export default function TagItem({ item }) {
  return (
    <View>
      <Text style={styles.TagItemActive}>{item}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  TagItemActive: {
    backgroundColor: '#DDEAFF',
    color: '#0071F0',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 50,
    marginRight: 2,
    marginVertical: 5
  },
  TagItem: {
    backgroundColor: '#DDEAFF',
    color: '#0071F0',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 50,
    marginRight: 2,
    marginVertical: 5
  }
});
