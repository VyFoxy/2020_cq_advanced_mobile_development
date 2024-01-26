import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PDFReader from 'rn-pdf-reader-js';

export default function PDFView({ route }) {
  const { data } = route.params;
  return (
    <View style={styles.container}>
      <PDFReader
        source={{
          uri: data.nameFile
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#ecf0f1'
  }
});
