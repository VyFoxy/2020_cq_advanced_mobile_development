import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Pressable
} from 'react-native';
import { COLORS } from '../../constants';
import { BookingCard } from '../../components/booking-card/BookingCard';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AvatarContext from '../../context/AvatarProvider';
import {
  DeleteCancelBooking,
  getUpcomingBooking
} from '../../services/tutorAPI';
import { ceil, isEmpty } from 'lodash';
import Pagination from '../../components/pagination/Pagination';
import { Provider, Portal, Modal, TextInput } from 'react-native-paper';
import { formatTimestampToVietnamese } from '../../utils/func';
import DropDownPicker from 'react-native-dropdown-picker';
import { ReasonCancleBooking } from '../../utils/constant';
import LocalizationContext from '../../context/LocalizationProvider';

export const BookingStudentScreen = () => {
  const { avatar, setAvatar } = useContext(AvatarContext);
  const { i18n } = useContext(LocalizationContext);
  const [upComingClass, setUpcomingBookingClass] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const scrollRef = useRef();
  const [totalPages, setTotalPages] = useState(0);
  const [cancelBooking, setCancleBooking] = useState({});
  const [openReason, setOpenReason] = useState(false);
  const [valueReason, setValueReason] = useState([]);
  const [itemsReason, setItemsReason] = useState(ReasonCancleBooking);
  const [itemCancle, setItemCancle] = useState('');
  const fetchData = async () => {
    const reponse_upcoming = await getUpcomingBooking({
      page: currentPage,
      perPage: 20
    });
    setUpcomingBookingClass(reponse_upcoming?.rows);
    setTotalPages(ceil(reponse_upcoming?.count / 20));
  };
  useEffect(() => {
    fetchData();
  }, [avatar]);

  const handleCancleBooking = async () => {
    try {
      const response = await DeleteCancelBooking({
        id: cancelBooking?.id,
        cancelReasonId: valueReason,
        note: itemCancle
      });
      setAvatar((pre) => !pre);
      if (response.message == 'Cancel booking successful') {
        alert('Hủy thành công');

        setVisible(false);
      }
    } catch (error) {
      alert('Hủy thất bại');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={styles.modalStyle}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center'
              }}
            >
              <Image
                style={styles.avtimg}
                source={{
                  uri: cancelBooking?.scheduleDetailInfo?.scheduleInfo
                    ?.tutorInfo?.avatar
                }}
              />
              {!isEmpty(
                cancelBooking?.scheduleDetailInfo?.scheduleInfo?.tutorInfo?.name
              ) && (
                <Text style={styles.teacherName}>
                  {
                    cancelBooking?.scheduleDetailInfo?.scheduleInfo?.tutorInfo
                      ?.name
                  }
                </Text>
              )}
              <Text style={styles.paragraph}>Thời gian bài học</Text>
              <Text style={styles.teacherName}>
                {formatTimestampToVietnamese(
                  cancelBooking?.scheduleDetailInfo?.startPeriodTimestamp
                )}
              </Text>
              <View
                style={{
                  borderTopColor: COLORS.grayLight,
                  borderTopWidth: 0.3
                }}
              >
                <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                  <Text style={{ color: 'red' }}>*</Text>
                  <Text style={styles.teacherName}>
                    {i18n.t('ReasonCancel')}
                  </Text>
                </View>

                <TextInput
                  mode='outlined'
                  style={styles.input}
                  value={itemCancle}
                  onChangeText={setItemCancle}
                  name='Report'
                  placeholder={i18n.t('AdditionalNotes')}
                  //multiline={true}
                  //numberOfLines={4}
                />
                <DropDownPicker
                  style={styles.dropdownmulti}
                  open={openReason}
                  value={valueReason}
                  items={itemsReason}
                  setOpen={setOpenReason}
                  setValue={setValueReason}
                  setItems={setItemsReason}
                  theme='LIGHT'
                  placeholder=''
                />
              </View>

              <View
                style={{
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                  marginLeft: 200,
                  marginTop: 20
                }}
              >
                <Pressable
                  style={{ justifyContent: 'center' }}
                  onPress={() => setVisible(false)}
                >
                  <Text style={{ color: COLORS.gray }}>{i18n.t('Later')}</Text>
                </Pressable>
                <Pressable
                  style={styles.Button}
                  onPress={() => handleCancleBooking()}
                >
                  <Text style={styles.ButtonText}>{i18n.t('Submit')}</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </Portal>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingVertical: 40,
            paddingHorizontal: 40
          }}
        >
          <View>
            <Image
              source={require('../../../assets/img/calendar.png')}
              style={styles.image}
              resizeMode='contain'
            ></Image>
            <Text style={styles.headingParagraph}>{i18n.t('Schedule')}</Text>
            <View style={styles.blockquote}>
              <Text style={styles.paragraph}>{i18n.t('IntroSchedule1')}</Text>
              <Text style={styles.paragraph}>{i18n.t('IntroSchedule2')}</Text>
            </View>
          </View>
          <View>
            <FlatList
              data={upComingClass}
              renderItem={({ item }) => (
                <BookingCard
                  item={item}
                  setVisible={setVisible}
                  setCancleBooking={setCancleBooking}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </View>
          {upComingClass && upComingClass?.length > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={() => {}}
              setCurrentPage={setCurrentPage}
            />
          )}
        </ScrollView>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30
  },
  image: {
    width: 150,
    height: 150
  },
  headingParagraph: {
    fontSize: 30,
    fontWeight: '600',
    color: COLORS.black,
    marginVertical: 20
  },
  paragraph: {
    fontSize: 17,
    lineHeight: 25,
    color: 'rgba(0,0,0,0.85)'
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
  input: {
    height: 80,
    width: 280,
    backgroundColor: '#fff',
    zIndex: 2,
    borderBlockColor: 'blue',
    marginBottom: 12
  },
  header: {
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  modalStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    height: 450,
    borderRadius: 2
  },
  avtimg: {
    width: 70,
    height: 70,
    borderRadius: 50
  },
  teacherName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    marginVertical: 5
  },
  dropdownmulti: {
    marginBottom: 10,
    width: 280,
    height: 40,
    paddingHorizontal: 18,
    minHeight: 40,
    borderBlockColor: 'blue',
    borderRadius: 0
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 30,
    backgroundColor: COLORS.primary,
    elevation: 2,
    marginHorizontal: 5
  },
  ButtonText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white'
  }
});
