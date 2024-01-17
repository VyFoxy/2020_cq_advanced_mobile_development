import React from 'react';
import { View, Text, StyleSheet, Vibration, Pressable } from 'react-native';

export default function TagItem({ item, handFilterSpecialties }) {
  return (
    <Pressable onPress={() => handFilterSpecialties(item?.value)}>
      <View>
        <Text
          style={
            item?.status === 'active' ? styles.TagItemActive : styles.TagItem
          }
        >
          {item.label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  TagItemActive: {
    backgroundColor: '#DDEAFF',
    color: '#0071F0',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 2,
    marginVertical: 5,
    overflow: 'hidden'
  },
  TagItem: {
    backgroundColor: '#E4E6EB',
    color: '#646464',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 2,
    marginVertical: 5,
    overflow: 'hidden'
  }
});
