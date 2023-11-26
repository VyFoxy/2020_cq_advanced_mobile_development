import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { ROUTES, COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

export default function CourseCard({ style }) {
  const navigation = useNavigation();
  return (
    <View style={[styles.gridItem, style]}>
      <Pressable
        onPress={() => {
          console.log('Press card');
          navigation.navigate(ROUTES.COURSE_DETAIL);
        }}
        style={{ flex: 1 }}
      >
        <View style={styles.innerContainer}>
          <Image
            source={
              'https://camblycurriculumicons.s3.amazonaws.com/5e0e8b212ac750e7dc9886ac?h=d41d8cd98f00b204e9800998ecf8427e'
            }
            style={styles.courseImg}
          />

          <Text style={styles.nameCourse}>CourseCard</Text>
          <Text style={styles.subtitle}>
            This is a subtitle pla pla pla pla pla pla pla pla pla pla
          </Text>
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>Beginner</Text>
            <Text style={styles.levelText}>9 bài học</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  courseImg: {
    width: '100%',
    height: 150
  },
  gridItem: {
    flex: 1,
    margin: 5,
    height: 240,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: COLORS.white
  },
  innerContainer: {
    flex: 1,
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  nameCourse: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '300'
  },
  levelText: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 5
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  }
});
