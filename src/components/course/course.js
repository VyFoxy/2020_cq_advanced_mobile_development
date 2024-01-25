import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { ROUTES, COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

export default function CourseCard(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.gridItem}>
      <Pressable
        onPress={() => {
          navigation.navigate(ROUTES.COURSE_DETAIL);
        }}
        style={{ flex: 1 }}
      >
        <Image
          source={{
            uri: 'https://camblycurriculumicons.s3.amazonaws.com/5e0e8b212ac750e7dc9886ac?h=d41d8cd98f00b204e9800998ecf8427e'
          }}
          style={styles.courseImg}
        />
        <View style={styles.innerContainer}>{props.children}</View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  courseImg: {
    width: 330,
    height: 240
  },
  gridItem: {
    flex: 1,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.18,
    overflow: 'hidden',
    borderWidth: 0.8,
    borderColor: '#CCC',
    shadowRadius: 5,
    backgroundColor: COLORS.white,
    marginVertical: 15,
    borderRadius: 16,
    marginHorizontal: 10,
    minHeight: 450
  },
  innerContainer: {
    flex: 1,
    padding: 5,
    justifyContent: 'flex-start',
    paddingHorizontal: 20
    //alignItems: 'center'
  }
});
