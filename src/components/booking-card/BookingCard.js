import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Pressable
} from 'react-native';
import { ROUTES, COLORS } from '../../constants';
import {
  formatTimestampToTimeZone,
  formatTimestampToVietnamese,
  isWithinTwoHours
} from '../../utils/func';
import { Feather } from '@expo/vector-icons';
import { isEmpty, isNil, times } from 'lodash';
import CollapseComponent from '../collapse/Collapse';
import { useContext } from 'react';
import LocalizationContext from '../../context/LocalizationProvider';

export const BookingCard = ({ item, setCancleBooking, setVisible }) => {
  const { createdAtTimeStamp, scheduleDetailInfo, studentRequest } = item;
  const { i18n } = useContext(LocalizationContext);
  const { scheduleInfo } = scheduleDetailInfo;
  const text = i18n.t('NoRequestSchedule');
  const items = {
    key: '1',
    label: '',
    children: (
      <Text style={{ lineHeight: 22, color: '#8399a7' }}>
        {!isEmpty(studentRequest) ? studentRequest : text}
      </Text>
    )
  };

  return (
    <>
      {!isNil(scheduleDetailInfo) && (
        <View style={styles.container}>
          <View style={styles.margin}>
            <Text style={styles.headingParagraph}>
              {formatTimestampToVietnamese(
                scheduleDetailInfo?.startPeriodTimestamp
              )}
            </Text>

            <Text style={styles.paragraph}>{`1 ${i18n.t('Lesson')}`}</Text>
          </View>
          <View style={styles.contentProfile}>
            <Image
              style={styles.avtimg}
              source={{
                uri: scheduleInfo?.tutorInfo?.avatar
              }}
            />
            <View>
              {!isEmpty(scheduleInfo?.tutorInfo?.name) && (
                <Text style={styles.teacherName}>
                  {scheduleInfo?.tutorInfo?.name}
                </Text>
              )}

              <View style={styles.row}>
                <Image
                  source={{
                    uri: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/tn.svg'
                  }}
                  style={styles.flagIcon}
                />
                {!isEmpty(scheduleInfo?.tutorInfo?.country) && (
                  <Text>{scheduleInfo?.tutorInfo?.country}</Text>
                )}

                <TouchableOpacity></TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.containerContent}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              {!isNil(scheduleInfo?.startTimestamp) && (
                <Text
                  style={{ fontSize: 20, marginBottom: 20 }}
                >{`${formatTimestampToTimeZone(
                  scheduleInfo?.startTimestamp
                )} - ${formatTimestampToTimeZone(
                  scheduleInfo?.endTimestamp
                )}`}</Text>
              )}
              {!isWithinTwoHours(scheduleDetailInfo?.startPeriodTimestamp) && (
                <Pressable
                  style={styles.ButtonCancle}
                  onPress={() => {
                    setVisible(true);
                    setCancleBooking(item);
                  }}
                >
                  <Feather name='x-square' size={20} color='red' />
                  <Text style={{ color: 'red', marginLeft: 5 }}>
                    {i18n.t('Cancel')}
                  </Text>
                </Pressable>
              )}
            </View>
            <CollapseComponent
              title={i18n.t('RequestForLesson')}
              children={items.children}
            />
          </View>

          <View xs={12} style={styles.buttonContainer}>
            <View />
            <Button
              disabled={true}
              title={i18n.t('EnterLessionRoom')}
              onPress={() => Alert.alert('Cannot press this one')}
              style={styles.buttonIn}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    marginVertical: 24,
    padding: 16
  },
  headingParagraph: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.black
  },
  paragraph: {
    fontSize: 17
  },
  containerContent: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 20
  },
  containerContentCol: {
    backgroundColor: '#FFF',
    marginVertical: 20
  },
  contentProfile: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 20
  },
  avtimg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 10
  },
  teacherName: {
    fontSize: 20,
    fontWeight: 700,
    color: COLORS.black,
    marginBottom: 5
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5
  },
  flagIcon: {
    opacity: 1,
    width: 20,
    aspectRatio: 1,
    overflow: 'hidden',
    marginRight: 5
  },
  rowDescription: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1
  },
  buttonText: {
    color: COLORS.primary
  },
  margin: {
    marginVertical: 20
  },
  buttonIn: {
    backgroundColor: '#1890ff',
    height: 40,
    width: 70,
    borderRadius: 10
  },
  ButtonCancle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 30,
    backgroundColor: COLORS.white,
    elevation: 2,
    marginHorizontal: 5,
    borderColor: 'red',
    borderWidth: 1,
    flexDirection: 'row'
  }
});
