import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList
} from 'react-native';
import React, { useContext } from 'react';
import { COLORS, ROUTES } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-virtualized-view';
import { useNavigation } from '@react-navigation/native';
import CourseCard from '../../components/course/course';
export const CourseDetail = () => {
  const navigation = useNavigation();
  const arr = ['He', 'LO', 'HI', 'Ha', 'hu', 'He', 'OK', 'KO', 'SD'];
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <CourseCard style={{ marginHorizontal: 20, flex: 0 }} />
        <Text style={styles.headingTitle}>OverView</Text>
        <View style={styles.headingContainer}>
          <Icon
            name='help-circle'
            size={20}
            color={'black'}
            style={{ alignSelf: 'center' }}
          />
          <Text style={styles.headingParagraph}>
            Tại sao bạn nên học khóa học này
          </Text>
        </View>

        <Text style={styles.paragraph}>
          Our world is rapidly changing thanks to new technology, and the
          vocabulary needed to discuss modern life is evolving almost daily. In
          this course you will learn the most up-to-date terminology from
          expertly crafted lessons as well from your native-speaking tutor.
        </Text>
        <View style={styles.headingContainer}>
          <Icon
            name='help-circle'
            size={15}
            color={'black'}
            style={{ alignSelf: 'center' }}
          />
          <Text style={styles.headingParagraph}>Bạn có thể làm gì</Text>
        </View>

        <Text style={styles.paragraph}>
          You will learn vocabulary related to timely topics like remote work,
          artificial intelligence, online privacy, and more. In addition to
          discussion questions, you will practice intermediate level speaking
          tasks such as using data to describe trends.
        </Text>
        <Text style={styles.headingTitle}>Trình độ yêu cầu</Text>
        <View style={styles.headingContainer}>
          <Icon
            name='people'
            size={15}
            color={'black'}
            style={{ alignSelf: 'center' }}
          />
          <Text style={styles.headingParagraph}>Intermediate</Text>
        </View>
        <Text style={styles.headingTitle}>Thời lượng khóa học</Text>
        <View style={styles.headingContainer}>
          <Icon
            name='book'
            size={15}
            color={'black'}
            style={{ alignSelf: 'center' }}
          />
          <Text style={styles.headingParagraph}>9 buổi học</Text>
        </View>
        <Text style={styles.headingTitle}>Danh sách chủ đề</Text>
        <FlatList
          data={arr}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                navigation.navigate(ROUTES.PDF_VIEW);
              }}
            >
              <View style={styles.itemTopic}>
                <Text style={styles.headingParagraph}>
                  {index + 1}-{item}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  imgContainer: {
    margin: 5,
    height: 240,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    overflow: 'hidden'
  },
  courseImg: {
    width: '100%',
    height: '100%'
  },
  headingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 20
  },
  headingParagraph: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
    marginLeft: 10,
    marginVertical: 5
  },
  paragraph: {
    fontSize: 15,
    marginHorizontal: 20,
    marginVertical: 5
  },
  headingContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    alignContent: 'center',
    justifyContent: 'flex-start'
  },
  itemTopic: {
    marginHorizontal: 10
  }
});
