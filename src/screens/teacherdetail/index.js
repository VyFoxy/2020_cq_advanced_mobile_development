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
  Pressable,
  Alert
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { ScrollView } from 'react-native-virtualized-view';
import { ListTag } from '../../components/list-tag/ListTag';
import CommentCard from '../../components/comment-card/CommentCard';
import { Video } from 'expo-av';
import { IMGS } from '../../constants';
import { Modal, Portal, Provider, TextInput } from 'react-native-paper';
import { isEmpty, round } from 'lodash';
import { mappingLanguage, mappingSpecialties } from '../../utils/mapping';
//import TimeTable from '@mikezzb/react-native-timetable';
import { Rating } from 'react-native-ratings';
import {
  GetFeedBack,
  GetTuTorbyID,
  bookTutor,
  reportAction
} from '../../services/tutorAPI';
import AvatarContext from '../../context/AvatarProvider';
import { getSchedule } from '../../services/schedule';
import {
  formatTimestampRange,
  formatTimestampToTimeZone,
  getDayOfWeek
} from '../../utils/func';

export const TeacherDetail = (props) => {
  const id = props.route?.params?.id;
  const { setAvatar } = useContext(AvatarContext);
  const [data, setData] = useState({});
  const [review, setReview] = useState([]);
  const [schedule, setSchedule] = React.useState([]);
  const [isBookedSchedule, setIsBookedSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleBooking, setScheduleBooking] = useState({});
  const [isOpenBooking, setIsOpenBooking] = useState(false);
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
    setSchedule([...schedule, ...scheduleOfTutor]);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [visible, setVisible] = useState(false);
  const [report, setReport] = useState('');
  const [followStatus, setFollowStatus] = useState(data?.isFavorite);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const sentReport = async () => {
    const response = await reportAction(report, id);
    if (response.message == 'Report successfully') {
      alert('Báo cáo thành công');
    }
    setReport('');
    hideModal();
  };

  const handleSchedule = () => {
    const currentTimestamp = new Date().getTime();

    const data = schedule.map((item) =>
      item?.isBooked
        ? {
            courseId: 'Đã đặt',
            day: getDayOfWeek(item?.startTimestamp),
            startTime: formatTimestampToTimeZone(item?.startTimestamp),
            endTime: formatTimestampToTimeZone(item?.endTimestamp),
            color: 'rgb(46, 204, 113)',
            canBook: false
          }
        : {
            courseId: 'Đặt lịch',
            eventId: item?.scheduleDetails?.[0]?.id,
            day: getDayOfWeek(item?.startTimestamp),
            startTime: formatTimestampToTimeZone(item?.startTimestamp),
            endTime: formatTimestampToTimeZone(item?.endTimestamp),
            endTimestamp: item?.endTimestamp,
            startTimestamp: item?.startTimestamp,
            color:
              currentTimestamp >= item?.startTimestamp
                ? COLORS.gray
                : COLORS.primary,
            canBook: currentTimestamp >= item?.startTimestamp ? false : true,
            note: ''
          }
    );
    setIsBookedSchedule(data);
  };

  const handleBookingSchedule = (event) => {
    if (event.canBook == false) {
      Alert.alert('Không thể đặt lịch học này');
    } else {
      setScheduleBooking(event);
      setIsOpenBooking(true);
    }
  };

  const sentBooking = async () => {
    try {
      const response = await bookTutor({
        scheduleDetailIds: scheduleBooking.eventId,
        note: scheduleBooking.note
      });
      if (response.message == 'Book successful') {
        alert('Đặt lịch thành công');
        setAvatar((prev) => !prev);
        setIsOpenBooking(false);
      }
    } catch (error) {
      alert('Đặt lịch thất bại');
    }
  };
  useEffect(() => {
    handleSchedule();
  }, [schedule]);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          size='large'
          color={COLORS.primary}
          style={styles.centerLoading}
        />
      ) : (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <Provider>
            {/* Report Modal */}

            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.modalStyle}
              >
                <View
                  style={{
                    flex: 1,
                    alignContent: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <View
                    style={{
                      borderBottomColor: COLORS.grayLight,
                      borderBottomWidth: 0.3
                    }}
                  >
                    {!isEmpty(data?.User?.name) && (
                      <Text style={styles.titleParagraph}>{`Báo cáo ${
                        data?.User?.name || ''
                      }`}</Text>
                    )}
                  </View>

                  <TextInput
                    mode='outlined'
                    style={styles.input}
                    value={report}
                    onChangeText={setReport}
                    name='Report'
                    placeholder='Vui lòng điền chi tiết vấn đề bạn gặp phải'
                    //multiline={true}
                    //numberOfLines={4}
                  />
                  <View
                    style={{ justifyContent: 'flex-end', flexDirection: 'row' }}
                  >
                    <Pressable
                      style={styles.Button}
                      onPress={() => hideModal()}
                    >
                      <Text style={styles.ButtonText}>Hủy</Text>
                    </Pressable>
                    <Pressable
                      disabled={isEmpty(report)}
                      style={
                        isEmpty(report) ? styles.ButtonDisable : styles.Button
                      }
                      onPress={() => sentReport()}
                    >
                      <Text
                        style={
                          isEmpty(report)
                            ? styles.ButtonTextDisable
                            : styles.ButtonText
                        }
                      >
                        Gửi
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              <Modal
                visible={isOpenBooking}
                onDismiss={() => setIsOpenBooking(false)}
                contentContainerStyle={styles.modalStyle}
              >
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      borderBottomColor: COLORS.grayLight,
                      borderBottomWidth: 0.3
                    }}
                  >
                    <Text style={styles.titleParagraph}>Chi tiết đặt lịch</Text>
                  </View>

                  <Text style={styles.headingParagraph}>
                    Thời gian đặt lịch
                  </Text>
                  <View style={styles.labelTime}>
                    <Text style={styles.labelTimeText}>
                      {formatTimestampRange(
                        scheduleBooking.startTimestamp,
                        scheduleBooking.endTimestamp
                      )}
                    </Text>
                  </View>
                  <Text style={styles.headingParagraph}>Notes</Text>
                  <TextInput
                    mode='outlined'
                    style={[styles.input, { marginHorizontal: 30 }]}
                    value={scheduleBooking.note}
                    onChangeText={(text) =>
                      setScheduleBooking((prevScheduleBooking) => ({
                        ...prevScheduleBooking,
                        note: text
                      }))
                    }
                  />
                  <View
                    style={{ justifyContent: 'flex-end', flexDirection: 'row' }}
                  >
                    <Pressable
                      style={styles.Button}
                      onPress={() => setIsOpenBooking(false)}
                    >
                      <Text style={styles.ButtonText}>Hủy</Text>
                    </Pressable>
                    <Pressable
                      style={styles.bookingBtn}
                      onPress={() => sentBooking()}
                    >
                      <AntDesign name='doubleright' size={18} color='white' />
                      <Text style={styles.bookingBtnText}>Đặt lịch</Text>
                    </Pressable>
                  </View>
                </View>
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
                        {!isEmpty(data?.User?.name) && (
                          <Text style={styles.name}>
                            {data?.User?.name || ''}
                          </Text>
                        )}

                        <View style={{ flexDirection: 'row' }}>
                          <Rating
                            startingValue={data?.rating}
                            style={styles.rating}
                            imageSize={20}
                            readonly
                          />
                          {!isEmpty(data?.totalFeedback) && (
                            <Text style={styles.textDescript}>
                              {`(${data?.totalFeedback || ''})`}
                            </Text>
                          )}
                        </View>

                        <Image style={styles.flag} source={IMGS.vi}></Image>
                      </View>
                    </View>
                    <View style={styles.descript}>
                      {!isEmpty(data?.bio) && (
                        <Text numberOfLines={4} style={styles.textDescript}>
                          {data?.bio || ''}
                        </Text>
                      )}
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
                    {!isEmpty(data?.education) && (
                      <Text style={styles.paragraph}>
                        {data?.education || ''}
                      </Text>
                    )}

                    <Text style={styles.headingParagraph}>Ngôn ngữ</Text>
                    <View style={styles.tagItem}>
                      <ListTag tags={data?.listLanguages} />
                    </View>
                    <Text style={styles.headingParagraph}>Chuyên ngành</Text>
                    <View style={styles.tagItem}>
                      <ListTag tags={data?.listSpecialties} />
                    </View>
                    <Text style={styles.headingParagraph}>
                      Khóa học tham khảo
                    </Text>
                    <Text style={styles.paragraph}>No Data</Text>
                    <Text style={styles.headingParagraph}>Sở thích</Text>
                    {!isEmpty(data?.interests) && (
                      <Text style={styles.paragraph}>
                        {data?.interests || ''}
                      </Text>
                    )}
                    <Text style={styles.headingParagraph}>
                      Kinh nghiệm giảng dạy
                    </Text>
                    {!isEmpty(data?.experience) && (
                      <Text style={styles.paragraph}>
                        {data?.experience || ''}
                      </Text>
                    )}
                    <Text style={styles.headingParagraph}>
                      Người khác đánh giá
                    </Text>
                    <FlatList
                      data={review}
                      renderItem={({ item }) => <CommentCard item={item} />}
                      style={styles.commentList}
                      keyExtractor={(item, index) => index}
                    />
                  </View>
                  <Text style={styles.headingParagraph}>Thời khóa biểu</Text>
                  <View style={{ overflow: 'hidden' }}>
                    {/* <TimeTable
                      events={isBookedSchedule}
                      eventOnPress={(event) => handleBookingSchedule(event)}
                    /> */}
                  </View>
                </View>
              </>
            </ScrollView>
          </Provider>
        </View>
      )}
    </>
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
  titleParagraph: {
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.black,
    marginLeft: 15,
    marginVertical: 5
  },
  headingParagraph: {
    fontSize: 16,
    fontWeight: 500,
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
    height: 430,
    borderRadius: 20
  },
  container: {
    backgroundColor: COLORS.white,
    marginTop: 180
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 40,
    backgroundColor: COLORS.white,
    elevation: 2,
    borderRadius: 10,
    marginVertical: 30,
    marginHorizontal: 5,
    borderColor: COLORS.primary,
    borderWidth: 1,
    flexDirection: 'row'
  },
  ButtonDisable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 40,
    backgroundColor: '#f5f5f5',
    elevation: 2,
    borderRadius: 10,
    marginVertical: 30,
    marginHorizontal: 5,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    flexDirection: 'row'
  },
  ButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 5
  },
  ButtonTextDisable: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#d9d9d9',
    marginLeft: 5
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
  input: { height: 150 },

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
  },
  centerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelTime: {
    backgroundColor: '#eeeaff',
    paddingHorizontal: 10,
    fontSize: 15,
    marginHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 5
  },
  labelTimeText: {
    color: '#7766c7',
    fontWeight: 'bold',
    fontSize: 13
  },
  bookingBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 40,
    backgroundColor: COLORS.primary,
    elevation: 2,
    borderRadius: 10,
    marginVertical: 30,
    marginHorizontal: 5,
    flexDirection: 'row'
  },
  bookingBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5
  }
});
