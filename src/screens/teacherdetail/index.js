import React, { useEffect, useState, useContext, useRef } from 'react';
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
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { ScrollView } from 'react-native-virtualized-view';
import { ListTag } from '../../components/list-tag/ListTag';
import CommentCard from '../../components/comment-card/CommentCard';
import { Video } from 'expo-av';
import { IMGS } from '../../constants';
import { Modal, Portal, Provider, TextInput } from 'react-native-paper';
import { round } from 'lodash';
import { mappingLanguage, mappingSpecialties } from '../../utils/mapping';
//import TimeTable from '@mikezzb/react-native-timetable';
import { Rating } from 'react-native-ratings';
import { GetFeedBack, GetTuTorbyID } from '../../services/tutorAPI';
import AvatarContext from '../../context/AvatarProvider';
import { getSchedule } from '../../services/schedule';
import { formatTimestampToTimeZone, getDayOfWeek } from '../../utils/func';

export const TeacherDetail = (props) => {
  const id = props.route?.params?.id;
  const { avatar } = useContext(AvatarContext);
  const [data, setData] = useState({});
  const [review, setReview] = useState([]);
  const [schedule, setSchedule] = React.useState([]);
  const [isBookedSchedule, setIsBookedSchedule] = useState([]);
  const fetchData = async () => {
    const response = await GetTuTorbyID(id);
    const mappingSpecialtiesTag = (value) => {
      return mappingSpecialties.find((item) => item?.value === value)?.label;
    };
    const mappedSpecialties = response?.specialties
      .split(',')
      .map(mappingSpecialtiesTag);

    const mappingLanguageTag = (value) => {
      return mappingLanguage.find((item) => item?.value === value)?.label;
    };
    const mappedLanguage = response?.languages
      .split(',')
      .map(mappingLanguageTag);
    const listLanguages = mappedLanguage.map((item) => ({
      label: item,
      status: 'active'
    }));
    const listSpecialties = mappedSpecialties.map((item) => ({
      label: item,
      status: 'active'
    }));
    setData({
      ...response,
      listLanguages: listLanguages,
      listSpecialties: listSpecialties
    });
    const response_feedback = await GetFeedBack(id);
    setReview(response_feedback?.data?.rows);
    //schedule
    const { scheduleOfTutor } = await getSchedule({
      tutorId: id,
      page: 0
    });
    console.log(scheduleOfTutor, 'scheduleOfTutor');
    let getSchedules = scheduleOfTutor.filter((item) => !item.isBooked);
    setSchedule([...schedule, ...getSchedules]);
  };
  useEffect(() => {
    fetchData();
  }, [avatar]);

  const video = React.useRef(null);
  const [value, setValue] = useState(round(data?.rating || 0));
  const [visible, setVisible] = useState(false);
  const [report, setReport] = useState('');
  const [liked, setLiked] = useState(false);
  const [followStatus, setFollowStatus] = useState(data?.isFavorite);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const listRating = [1, 2, 3, 4, 5];
  const sentReport = () => {
    hideModal();
  };

  const handleSchedule = () => {
    const data = schedule.map((item) => ({
      courseId: 'Đã đặt',
      day: getDayOfWeek(),
      startTime: formatTimestampToTimeZone(item?.startTimestamp),
      endTime: formatTimestampToTimeZone(item?.endTimestamp),
      color: 'rgb(46, 204, 113)'
    }));
    console.log(data);
    setIsBookedSchedule(data);
  };

  useEffect(() => {
    handleSchedule();
  }, [schedule]);

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
                <View
                  style={{
                    padding: 20,
                    flexDirection: 'row'
                  }}
                >
                  <Image
                    style={styles.avtimg}
                    source={{ uri: data?.User?.avatar }}
                  />

                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>{data?.User?.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Rating
                        startingValue={data?.rating}
                        style={styles.rating}
                        imageSize={20}
                        readonly
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
                    <Text
                      style={{
                        color: followStatus ? 'red' : 'blue',
                        marginVertical: 5
                      }}
                    >
                      Yêu thích
                    </Text>
                  </Pressable>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Pressable
                    onPress={showModal}
                    style={{ alignItems: 'center' }}
                  >
                    <AntDesign name='message1' size={24} color='blue' />
                    <Text style={{ color: 'blue', marginVertical: 5 }}>
                      Nhắn tin
                    </Text>
                  </Pressable>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end'
                  }}
                >
                  <Pressable
                    onPress={showModal}
                    style={{ alignItems: 'center' }}
                  >
                    <AntDesign name='warning' size={24} color='blue' />
                    <Text style={{ color: 'blue', marginVertical: 5 }}>
                      Báo cáo
                    </Text>
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
                <Text style={styles.paragraph}>{data?.education}</Text>
                <Text style={styles.headingParagraph}>Ngôn ngữ</Text>
                <View style={styles.tagItem}>
                  <ListTag tags={data?.listLanguages} />
                </View>
                <Text style={styles.headingParagraph}>Chuyên ngành</Text>
                <View style={styles.tagItem}>
                  <ListTag tags={data?.listSpecialties} />
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
                  data={review}
                  renderItem={({ item }) => <CommentCard item={item} />}
                  style={styles.commentList}
                  keyExtractor={(item, index) => index}
                />
              </View>
              <Text style={styles.headingParagraph}>Thời khóa biểu</Text>
              {/* <TimeTable
                events={[
                  {
                    courseId: 'Đã đặt',
                    day: 3,
                    startTime: '14:30',
                    endTime: '16:15',
                    color: 'rgb(46, 204, 113)'
                  },
                  {
                    courseId: 'Đã đặt',
                    day: 3,
                    startTime: '10:30',
                    endTime: '12:15',
                    color: 'rgb(46, 204, 113)'
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
    marginTop: -150,
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
    paddingHorizontal: 20,
    marginVertical: 20
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
    marginRight: 30,
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
