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
import { Grid, Rating } from '@mui/material';
//import TimeTable from '@mikezzb/react-native-timetable';

export default function TeacherDetail() {
  const video = React.useRef(null);
  const sheetRef = React.useRef(null);
  const [value, setValue] = useState(5);
  const [visible, setVisible] = useState(false);
  const [report, setReport] = useState('');
  const [liked, setLiked] = useState(false);
  const [followStatus, setFollowStatus] = useState(liked);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const listLanguages = ['English'];
  const listSpecialies = ['Tiếng Anh cho công việc', 'Giao tiếp', 'IELTS'];
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
                  <Grid container>
                    <Grid item xs={3}>
                      <Image style={styles.avtimg} source={IMGS.user} />
                    </Grid>
                    <Grid item xs={9}>
                      <View style={styles.nameContainer}>
                        <Text style={styles.name}>Keegan</Text>
                        <Rating
                          name='simple-controlled'
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                          style={styles.rating}
                        />
                        <Image style={styles.flag} source={IMGS.vi}></Image>
                      </View>
                    </Grid>
                  </Grid>
                </View>
                <View style={styles.descript}>
                  <Text numberOfLines={4} style={styles.textDescript}>
                    I am passionate about running and fitness, I often compete
                    in trail/mountain running events and I love pushing myself.
                    I am training to one day take part in ultra-endurance
                    events. I also enjoy watching rugby on the weekends, reading
                    and watching podcasts on Youtube. My most memorable life
                    experience would be living in and traveling around Southeast
                    Asia.
                  </Text>
                </View>
              </View>

              {/* Interact Buttons View */}
              <View style={styles.interactButtonsView}>
                <Grid container style={{ padding: 10 }}>
                  <Grid item xs={6}>
                    <Pressable
                      onPress={() => {
                        setFollowStatus(!followStatus);
                      }}
                    >
                      <AntDesign
                        name={followStatus ? 'heart' : 'hearto'}
                        size={24}
                        color='blue'
                      />
                      <Text style={{ color: 'blue' }}>Yêu thích</Text>
                    </Pressable>
                  </Grid>
                  <Grid item xs={6}>
                    <Pressable onPress={showModal}>
                      <AntDesign name={'infocircle'} size={24} color='blue' />
                      <Text style={{ color: 'blue' }}>Báo cáo</Text>
                    </Pressable>
                  </Grid>
                </Grid>
              </View>
              <View>
                {/* Video*/}
                <Video
                  ref={video}
                  style={styles.video}
                  source={{
                    uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
                  }}
                  useNativeControls
                  resizeMode='contain'
                  isLooping
                />
              </View>
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
                  <ListTag tags={listSpecialies} />
                </View>
                <Text style={styles.headingParagraph}>Khóa học tham khảo</Text>
                <Text style={styles.paragraph}>No Data</Text>
                <Text style={styles.headingParagraph}>Sở thích</Text>
                <Text style={styles.paragraph}>
                  I loved the weather, the scenery and the laid-back lifestyle
                  of the locals.
                </Text>
                <Text style={styles.headingParagraph}>
                  Kinh nghiệm giảng dạy
                </Text>
                <Text style={styles.paragraph}>
                  I have more than 10 years of teaching english experience
                </Text>
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
}

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
    marginHorizontal: 35,
    marginVertical: 5
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
    marginBottom: 10
  },
  nonrating: {
    fontStyle: 'italic',
    opacity: 0.6
  },
  tagItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 12,
    marginVertical: 10
  },
  descript: {
    marginHorizontal: 20,
    marginBottom: 15,
    paddingRight: 50
  },
  textDescript: {
    color: COLORS.black
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
