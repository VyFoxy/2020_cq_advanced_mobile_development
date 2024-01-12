import React, { useState, useContext, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  Button,
  FlatList,
  Pressable
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { ScrollView } from 'react-native-virtualized-view';
import { ListTag } from '../../components/list-tag/ListTag';
import CommentCard from '../../components/comment-card/CommentCard';
import { Video } from 'expo-av';
import { IMGS } from '../../constants';
import { Modal, Portal, Provider, TextInput } from 'react-native-paper';
import { round } from 'lodash';
import { FontAwesome } from '@expo/vector-icons';
import { mappingLanguage, mappingSpecialties } from '../../utils/mapping';
//import TimeTable from '@mikezzb/react-native-timetable';\
import { Rating } from 'react-native-ratings';

export const TeacherDetail = () => {
  const data = {
    // video:
    //   'https://api.app.lettutor.com/video/4d54d3d7-d2a9-42e5-97a2-5ed38af5789avideo1627913015871.mp4',
    // bio: 'I am passionate about running and fitness, I often compete in trail/mountain running events and I love pushing myself. I am training to one day take part in ultra-endurance events. I also enjoy watching rugby on the weekends, reading and watching podcasts on Youtube. My most memorable life experience would be living in and traveling around Southeast Asia.',
    // education: 'BA',
    // experience: 'I have more than 10 years of teaching english experience',
    // profession: 'English teacher',
    // accent: null,
    // targetStudent: 'Advanced',
    // interests:
    //   ' I loved the weather, the scenery and the laid-back lifestyle of the locals.',
    // languages: 'en',
    // specialties:
    //   'business-english,conversational-english,english-for-kids,ielts,starters,movers,flyers,ket,pet,toefl,toeic',
    // rating: 4.101449275362318,
    // isNative: null,
    // youtubeVideoId: null,
    // User: {
    //   id: '4d54d3d7-d2a9-42e5-97a2-5ed38af5789a',
    //   level: 'HIGHER_BEGINNER',
    //   avatar:
    //     'https://sandbox.api.lettutor.com/avatar/4d54d3d7-d2a9-42e5-97a2-5ed38af5789aavatar1684484879187.jpg',
    //   name: 'Keegan',
    //   country: 'TN',
    //   language: 'Ukrainian',
    //   isPublicRecord: false,
    //   caredByStaffId: null,
    //   zaloUserId: null,
    //   studentGroupId: null,
    //   courses: [
    //     {
    //       id: '46972669-1755-4f27-8a87-dc4dd2630492',
    //       name: 'Basic Conversation Topics',
    //       TutorCourse: {
    //         UserId: '4d54d3d7-d2a9-42e5-97a2-5ed38af5789a',
    //         CourseId: '46972669-1755-4f27-8a87-dc4dd2630492',
    //         createdAt: '2022-01-10T02:34:41.861Z',
    //         updatedAt: '2022-01-10T02:34:41.861Z'
    //       }
    //     },
    //     {
    //       id: '964bed84-6450-49ee-92d5-e8c565864bd9',
    //       name: 'Life in the Internet Age',
    //       TutorCourse: {
    //         UserId: '4d54d3d7-d2a9-42e5-97a2-5ed38af5789a',
    //         CourseId: '964bed84-6450-49ee-92d5-e8c565864bd9',
    //         createdAt: '2022-01-10T02:34:56.399Z',
    //         updatedAt: '2022-01-10T02:34:56.399Z'
    //       }
    //     },
    //     {
    //       id: 'ad318948-4e5c-48b3-8cd5-613327b65bd5',
    //       name: 'IELTS Speaking Part 3',
    //       TutorCourse: {
    //         UserId: '4d54d3d7-d2a9-42e5-97a2-5ed38af5789a',
    //         CourseId: 'ad318948-4e5c-48b3-8cd5-613327b65bd5',
    //         createdAt: '2023-11-13T03:13:08.677Z',
    //         updatedAt: '2023-11-13T03:13:08.677Z'
    //       }
    //     },
    //     {
    //       id: '33f2ac3a-9c72-4df6-82b9-0d5a1f726746',
    //       name: 'Movies and Television',
    //       TutorCourse: {
    //         UserId: '4d54d3d7-d2a9-42e5-97a2-5ed38af5789a',
    //         CourseId: '33f2ac3a-9c72-4df6-82b9-0d5a1f726746',
    //         createdAt: '2023-11-13T03:13:24.395Z',
    //         updatedAt: '2023-11-13T03:13:24.395Z'
    //       }
    //     }
    //   ]
    // },
    // isFavorite: true,
    // avgRating: 4.101449275362318,
    // totalFeedback: 138
  };

  const mappingSpecialtiesTag = (value) => {
    return mappingSpecialties.find((item) => item?.value === value)?.label;
  };
  const mappedSpecialties = data?.specialties
    .split(',')
    .map(mappingSpecialtiesTag);
  const mappingLanguageTag = (value) => {
    return mappingLanguage.find((item) => item?.value === value)?.label;
  };
  const mappedLanguage = data?.languages.split(',').map(mappingLanguageTag);
  const video = React.useRef(null);
  const [value, setValue] = useState(round(data?.rating || 0));
  const [visible, setVisible] = useState(false);
  const [report, setReport] = useState('');
  const [liked, setLiked] = useState(false);
  const [followStatus, setFollowStatus] = useState(data?.isFavorite);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const listLanguages = mappedLanguage.map((item) => ({
    label: item,
    status: 'active'
  }));
  const listSpecialties = mappedSpecialties.map((item) => ({
    label: item,
    status: 'active'
  }));
  console.log(listSpecialties, 'listSpecialties');
  const listRating = [1, 2, 3, 4, 5];
  const sentReport = () => {
    console.log(report);
    hideModal();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Provider>
        {/* Report Modal */}

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalStyle}
          >
            <TextInput
              mode='outlined'
              style={styles.input}
              value={report}
              onChangeText={setReport}
              name='Report'
              label='Report'
              defaultValue=''
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity
              style={{
                ...styles.interactButton,
                backgroundColor: 'white',
                borderWidth: 2,
                borderColor: COLORS.danger
              }}
              onPress={sentReport}
            >
              <Text
                style={{ ...styles.interactButtonText, color: COLORS.danger }}
              >
                Sent
              </Text>
            </TouchableOpacity>
          </Modal>
        </Portal>

        <ScrollView showsVerticalScrollIndicator={false}>
          <>
            <View style={styles.profileContainer}>
              {/* Profile Details */}
              <View style={styles.container}>
                <View style={{ padding: 20 }}>
                  <Image style={styles.avtimg} source={data?.User?.avatar} />

                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>Keegan</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Rating
                        name='simple-controlled'
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        style={styles.rating}
                      />
                      <Rating
                        showRating
                        onFinishRating={this.ratingCompleted}
                        style={styles.rating}
                      />
                      <Text style={styles.textDescript}>
                        {`(${data?.totalFeedback})`}
                      </Text>
                    </View>

                    <Image style={styles.flag} source={IMGS.vi}></Image>
                  </View>
                </View>
                <View style={styles.descript}>
                  <Text numberOfLines={4} style={styles.textDescript}>
                    {data?.bio || ''}
                  </Text>
                </View>
              </View>

              {/* Interact Buttons View */}
              <View style={styles.interactButtonsView}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                  }}
                >
                  <Pressable
                    onPress={() => {
                      setFollowStatus(!followStatus);
                    }}
                    style={{ alignItems: 'center' }}
                  >
                    <AntDesign
                      name={followStatus ? 'heart' : 'hearto'}
                      size={24}
                      color={followStatus ? 'red' : 'blue'}
                    />
                    <Text style={{ color: followStatus ? 'red' : 'blue' }}>
                      Yêu thích
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                  }}
                >
                  <Pressable
                    onPress={showModal}
                    style={{ alignItems: 'center' }}
                  >
                    <FontAwesome name='info-circle' size={24} color='blue' />
                    <Text style={{ color: 'blue' }}>Báo cáo</Text>
                  </Pressable>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Video
                  source={{
                    uri: data?.video
                  }}
                  style={styles.video}
                  useNativeControls
                  isLooping
                />
              </View>
              {/* Video */}

              {/* Profile Content */}
              <View style={styles.profileContent}>
                <Text style={styles.headingParagraph}>Học vấn</Text>
                <Text style={styles.paragraph}>BA</Text>
                <Text style={styles.headingParagraph}>Ngôn ngữ</Text>
                <View style={styles.tagItem}>
                  <ListTag tags={listLanguages} />
                </View>
                <Text style={styles.headingParagraph}>Chuyên ngành</Text>
                <View style={styles.tagItem}>
                  <ListTag tags={listSpecialties} />
                </View>
                <Text style={styles.headingParagraph}>Khóa học tham khảo</Text>
                <Text style={styles.paragraph}>No Data</Text>
                <Text style={styles.headingParagraph}>Sở thích</Text>
                <Text style={styles.paragraph}>{data?.interests}</Text>
                <Text style={styles.headingParagraph}>
                  Kinh nghiệm giảng dạy
                </Text>
                <Text style={styles.paragraph}>{data?.experience}</Text>
                <Text style={styles.headingParagraph}>Người khác đánh giá</Text>
                <FlatList
                  data={listRating}
                  renderItem={CommentCard}
                  style={styles.commentList}
                />
              </View>
              {/* <TimeTable
                events={[
                  {
                    courseId: 'CSCI2100',
                    title: 'Data Structures',
                    section: 'A - LEC',
                    day: 3,
                    startTime: '14:30',
                    endTime: '16:15',
                    location: 'Online Teaching',
                    color: 'rgba(241,153,40,1)'
                  }
                ]}
                eventOnPress={(event) =>
                  Alert.alert(`${JSON.stringify(event)}`)
                }
              /> */}
            </View>
          </>
        </ScrollView>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  coverImage: { height: 200, width: '100%' },
  profileContainer: {
    // height: 1000,
    backgroundColor: '#fff',
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  commentList: {
    marginTop: 5,
    marginHorizontal: 30
  },
  profileImageView: { alignItems: 'center', marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff'
  },
  nameAndBioView: { alignItems: 'center', marginTop: 10 },
  userFullName: { fontSize: 26 },
  userBio: {
    fontSize: 18,
    color: '#333',
    marginTop: 4
  },
  countsView: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'space-between',
    width: '100%',
    marginBottom: 10
  },
  countView: { flex: 1, alignItems: 'center' },
  countNum: { fontSize: 20 },
  countText: { fontSize: 18, color: '#333', justifyContent: 'flex-start' },
  interactButtonsView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20
  },
  interactButton: {
    flex: 2,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b7bec',
    margin: 5,
    borderRadius: 4
  },
  interactButtonText: {
    color: '#fff',
    fontSize: 18,
    paddingVertical: 6
  },
  profileContentButtonsView: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#f1f3f6'
  },
  showContentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#000'
  },
  showContentButtonText: {
    fontSize: 18
  },
  headingParagraph: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
    marginLeft: 30,
    marginVertical: 15
  },
  paragraph: {
    fontSize: 15,
    marginHorizontal: 45,
    marginVertical: 5,
    opacity: 0.6
  },
  tagItem: {
    marginVertical: 5,
    marginHorizontal: 35,
    marginLeft: 50
  },
  video: {
    width: '100%',
    aspectRatio: 1
  },
  modalStyle: {
    backgroundColor: 'white',
    padding: 20,
    height: 200
  },
  container: {
    backgroundColor: COLORS.white,
    marginTop: 180
  },

  HeaderRight: {
    flex: 4,
    marginTop: 20,
    marginLeft: 20
  },
  HeaderLeft: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 20
  },
  avtimg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: 'gray'
  },
  name: {
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 10
  },
  ensign: {
    width: 40,
    height: 30,
    marginRight: 10
  },
  labelCountry: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 5
  },
  nonrating: {
    fontStyle: 'italic',
    opacity: 0.6
  },
  tagItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 45,
    marginVertical: 10
  },
  descript: {
    marginHorizontal: 20,
    marginBottom: 15,
    paddingRight: 50
  },
  textDescript: {
    color: COLORS.black,
    opacity: 0.6
  },
  nameContainer: {
    flexDirection: 'column',
    marginLeft: 10
  },
  flag: {
    width: 30,
    height: 20
  }
});
