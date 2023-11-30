import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { ROUTES, COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { Grid } from '@mui/material';

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
        <Grid container>
          <View style={styles.innerContainer}>
            <Image
              source={
                'https://camblycurriculumicons.s3.amazonaws.com/5e0e8b212ac750e7dc9886ac?h=d41d8cd98f00b204e9800998ecf8427e'
              }
              style={styles.courseImg}
            />
            {props.children}
          </View>
        </Grid>
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
  }
});
