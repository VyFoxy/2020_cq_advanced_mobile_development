import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import PDFReader from 'rn-pdf-reader-js';
import { useNavigation } from '@react-navigation/native';
import { COLORS, ROUTES } from '../../constants';

export const PDFView = ({ route }) => {
  const navigation = useNavigation();
  const { data, item } = route.params;
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTES.COURSE_DETAIL, { item: item });
          }}
        >
          <AntDesign name='left' size={22} color='black' />
        </TouchableOpacity>
        <Text style={styles.headingParagraph}>{data.name}</Text>
        <View style={{ width: 24 }}></View>
      </View>
      <View style={styles.container}>
        <PDFReader
          source={{
            uri: data.nameFile
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#ecf0f1'
  },
  headingParagraph: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.black,
    marginLeft: 10,
    marginVertical: 5
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 15
  }
});
