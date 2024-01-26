import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity
} from 'react-native';
import React, { useContext } from 'react';
import { COLORS, ROUTES } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-virtualized-view';
import { useNavigation } from '@react-navigation/native';
import { Feather, Octicons, Foundation } from '@expo/vector-icons';
import { get, includes, isEmpty } from 'lodash';
import { mappingLevel } from '../../utils/mapping';
export const CourseDetail = (props) => {
  const item = props.route?.params?.item;
  const navigation = useNavigation();
  const arr = item?.topics.map((item) => item?.name);
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.gridItem}>
          <View style={{ flex: 1 }}>
            <Image
              source={{
                uri: item?.imageUrl
              }}
              style={styles.courseImg}
            />
            <View style={styles.innerContainer}>
              <Text style={styles.nameCourse}>{item?.name}</Text>
              <Text style={styles.subtitle}>{item?.description}</Text>
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={() => {
                    navigation.navigate(ROUTES.PDF_VIEW, {
                      id: item?.id
                    });
                  }}
                >
                  <Text style={styles.ButtonText}>Khám phá</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.headingTitle}>Tổng quan</Text>
        <View style={styles.headingContainer}>
          <Feather
            name='help-circle'
            size={24}
            color='red'
            style={{ alignSelf: 'center' }}
          />
          <Text style={styles.headingParagraph}>
            Tại sao bạn nên học khóa học này
          </Text>
        </View>
        {!isEmpty(item?.reason) && (
          <Text style={styles.paragraph}>{item?.reason}</Text>
        )}

        <View style={styles.headingContainer}>
          <Feather
            name='help-circle'
            size={24}
            color='red'
            style={{ alignSelf: 'center' }}
          />
          <Text style={styles.headingParagraph}>Bạn có thể làm gì</Text>
        </View>
        {!isEmpty(item?.purpose) && (
          <Text style={styles.paragraph}>{item?.purpose}</Text>
        )}
        <Text style={styles.headingTitle}>Trình độ yêu cầu</Text>
        <View style={styles.headingContainer}>
          <Octicons
            name='people'
            size={24}
            color='blue'
            style={{ alignSelf: 'center' }}
          />
          <Text style={styles.headingParagraph}>
            {get(mappingLevel, item?.level)}
          </Text>
        </View>
        <Text style={styles.headingTitle}>Thời lượng khóa học</Text>
        <View style={styles.headingContainer}>
          <Foundation
            name='book-bookmark'
            size={24}
            color='blue'
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
                <Text style={[styles.headingParagraph, { fontWeight: '300' }]}>
                  {index + 1} .
                </Text>
                <Text style={styles.headingParagraph}>{item}</Text>
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
    backgroundColor: COLORS.white,
    paddingHorizontal: 30
  },
  courseImg: {
    width: 360,
    height: 260
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
    minHeight: 450
  },
  innerContainer: {
    flex: 1,
    padding: 5,
    //justifyContent: 'flex-start',
    paddingHorizontal: 20
    //alignItems: 'center'
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
  headingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft: 25,
    marginVertical: 25
  },
  headingParagraph: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
    marginLeft: 10,
    marginVertical: 5
  },
  paragraph: {
    fontSize: 15,
    marginLeft: 30,
    lineHeight: 22,
    marginVertical: 5,
    color: COLORS.gray
  },
  headingContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start'
  },
  itemTopic: {
    marginHorizontal: 10,
    backgroundColor: 'rgba(232, 232, 232, 0.106)',
    borderColor: '#d7d7d7',
    borderWidth: 0.5,
    minHeight: 140,
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 9
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
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 310,
    height: 50,
    backgroundColor: COLORS.primary,
    elevation: 2,
    borderRadius: 10,
    marginTop: 20,
    borderColor: COLORS.white,
    borderWidth: 1,
    flexDirection: 'row'
  },
  ButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
    marginLeft: 5
  }
});
