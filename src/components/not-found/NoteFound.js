import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const NotFoundFilter = () => {
  return (
    <View style={styles.container}>
      <AntDesign name='search1' size={50} color='grey' />
      <Text style={styles.text}>
        Xin lỗi, chúng tôi không thể tìm thấy kết quả với từ khóa này.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  text: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: 'black'
  }
});

export default NotFoundFilter;
