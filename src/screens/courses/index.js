import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TextInput
} from 'react-native';
import React from 'react';
import CourseCard from '../../components/course/course';
import { COLORS } from '../../constants';

export const CoursesSreeen = () => {
  const arr = [1, 2, 3, 4, 5];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 40,
        paddingHorizontal: 40
      }}
    >
      <View>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/img/course.png')}
            style={styles.image}
            resizeMode='contain'
          ></Image>
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.headingParagraph}>Khám phá các khóa học</Text>
            <TextInput
              placeholder={'Khóa học'}
              style={{
                width: 200,
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 20, // Adjust this value as needed
                paddingLeft: 10,
                marginBottom: 10
              }}
              value={searchQuery.name}
              // onChangeText={(text) =>
              //   setSearchQuery({ ...searchQuery, name: text })
              // }
              // onKeyPress={(e) => {
              //   if (e.nativeEvent.key === 'Enter') {
              //     handleSearch('name');
              //   }
              // }}
            />
          </View>
        </View>

        <View>
          <Text style={styles.paragraph}>
            LiveTutor đã xây dựng nên các khóa học của các lĩnh vực trong cuộc
            sống chất lượng, bài bản và khoa học nhất cho những người đang có
            nhu cầu trau dồi thêm kiến thức về các lĩnh vực.
          </Text>
        </View>
      </View>
      <View>
        <FlatList
          data={arr}
          renderItem={({ item }) => (
            <CourseCard>
              <Text style={styles.nameCourse}>CourseCard</Text>
              <Text style={styles.subtitle}>
                This is a subtitle pla pla pla pla pla pla pla pla pla pla
              </Text>
              <View style={styles.levelContainer}>
                <Text style={styles.levelText}>Beginner </Text>
                <Text style={styles.levelText}>9 bài học</Text>
              </View>
            </CourseCard>
          )}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    flexShrink: 1
  },
  image: {
    width: 100,
    height: 100
  },
  headingParagraph: {
    fontSize: 27,
    fontWeight: '600',
    color: COLORS.black,
    marginVertical: 10,
    marginLeft: 20,
    //flex: 1,
    flexShrink: 1
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20
  },
  blockquote: {
    borderLeftWidth: 3, // Adjust the width of the grey line as needed
    borderLeftColor: '4px solid hsla(0,0%,39.2%,.2)',
    opacity: '0.85',
    paddingLeft: 10, // Adjust the left padding for the text
    marginBottom: 10 // Adjust the margin between blockquotes
  },
  text: {
    fontSize: 25,
    fontWeight: '500'
  },
  authentication: {
    padding: 20
  },
  nameCourse: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '300',
    color: COLORS.gray
  },
  levelText: {
    fontSize: 14,
    fontWeight: '400'
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    paddingVertical: 15
  }
});
