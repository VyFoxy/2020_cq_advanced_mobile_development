import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { ROUTES, COLORS } from '../../constants';
import {
  formatTimestampToTimeZone,
  formatTimestampToVietnamese
} from '../../utils/func';
import { Feather } from '@expo/vector-icons';
import { isEmpty, isNil, times } from 'lodash';
import CollapseComponent from '../collapse/Collapse';

export const BookingCard = ({ item }) => {
  const { createdAtTimeStamp, scheduleDetailInfo, studentRequest } = item;
  const { scheduleInfo } = scheduleDetailInfo;
  const text = `
  Hiện tại không có yêu cầu cho lớp học này. Xin vui lòng viết ra bất kỳ yêu cầu nào cho giáo viên nếu có.
`;
  const items = {
    key: '1',
    label: 'Yêu cầu cho buổi học',
    children: <Text>{!isEmpty(studentRequest) ? studentRequest : text}</Text>
  };

  return (
    <>
      <CollapseComponent title={items.label} children={items.children} />
      {!isNil(scheduleDetailInfo) && (
        <View style={styles.container}>
          <View style={styles.margin}>
            <Text style={styles.headingParagraph}>
              {formatTimestampToVietnamese(
                scheduleDetailInfo?.startPeriodTimestamp
              )}
            </Text>

            <Text style={styles.paragraph}>1 buổi học</Text>
          </View>
          <View style={styles.contentProfile}>
            <Image
              style={styles.avtimg}
              source={{
                uri: 'https://sandbox.api.lettutor.com/avatar/4d54d3d7-d2a9-42e5-97a2-5ed38af5789aavatar1684484879187.jpg'
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
              <TouchableOpacity style={styles.ButtonCancle}>
                <Feather name='x-square' size={20} color='red' />
                <Text style={{ color: 'red', marginRight: 5 }}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
          <CollapseComponent title={items.label} children={items.children} />
          <View xs={12} style={styles.buttonContainer}>
            <View />
            <Button
              disabled={true}
              title='Vào buổi học'
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
    fontWeight: 700,
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
