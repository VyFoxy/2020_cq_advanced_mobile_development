import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { ROUTES, COLORS, IMGS } from '../../constants';
import {
  formatTimestampToTimeZone,
  formatTimestampToVietnamese,
  showRelativeTime
} from '../../utils/func';
import { isEmpty } from 'lodash';
import { ClassReview } from '../class-review/ClassReview';
import { Rating } from 'react-native-ratings';
import { useContext } from 'react';
import LocalizationContext from '../../context/LocalizationProvider';

export const CourseCard = ({ item }) => {
  const {
    createdAtTimeStamp,
    feedbacks,
    classReview,
    studentRequest,
    scheduleDetailInfo
  } = item;
  const { scheduleInfo } = scheduleDetailInfo;
  const { i18n } = useContext(LocalizationContext);
  return (
    <View style={styles.container}>
      <View style={styles.margin}>
        {/* {!isEmpty(createdAtTimeStamp) && (
          <View> */}
        <Text style={styles.headingParagraph}>
          {formatTimestampToVietnamese(createdAtTimeStamp)}
        </Text>
        <Text style={styles.paragraph}>
          {showRelativeTime(createdAtTimeStamp)}
        </Text>
        {/* </View>
        )} */}
      </View>
      <View style={styles.contentProfile}>
        <Image
          style={styles.avtimg}
          source={{
            uri: scheduleInfo?.tutorInfo?.avatar
          }}
        />
        <View>
          <Text style={styles.teacherName}>
            {scheduleInfo?.tutorInfo?.name}
          </Text>
          <View style={styles.row}>
            <Image style={styles.flagIcon} />
            <Text>{scheduleInfo?.tutorInfo?.country}</Text>
            <TouchableOpacity></TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.containerContent}>
        <Text style={{ fontSize: 20 }}>{i18n.t('LessonTime')}</Text>
        <Text style={{ fontSize: 20 }}>{`${formatTimestampToTimeZone(
          scheduleInfo?.startTimestamp
        )} - ${formatTimestampToTimeZone(scheduleInfo?.endTimestamp)}`}</Text>
      </View>
      <View style={styles.containerContentCol}>
        <View style={styles.rowDescription}>
          {isEmpty(studentRequest) ? (
            <Text style={styles.paragraph}>{i18n.t('NoRequest')}</Text>
          ) : (
            <View>
              <Text style={styles.paragraph}>{i18n.t('RequestForLesson')}</Text>
              <Text
                style={{
                  fontSize: 15,
                  paddingVertical: 10
                }}
              >
                {studentRequest}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.rowDescription}>
          {isEmpty(classReview) ? (
            <Text style={styles.paragraph}>{i18n.t('NoTutorReview')}</Text>
          ) : (
            <View>
              <Text style={styles.paragraph}>{i18n.t('ReviewFromTutor')}</Text>
              <ClassReview
                label={'Bahavior'}
                comment={classReview?.behaviorComment}
                ratingValue={classReview?.behaviorRating}
              />
              <ClassReview
                label={'Listening'}
                comment={classReview?.listeningComment}
                ratingValue={classReview?.listeningRating}
              />
              <ClassReview
                label={'Speaking'}
                comment={classReview?.speakingComment}
                ratingValue={classReview?.speakingRating}
              />
              <ClassReview
                label={'Vacabulary'}
                comment={classReview?.vocabularyComment}
                ratingValue={classReview?.vocabularyRating}
              />
              <ClassReview
                label={'Overal Comment'}
                comment={classReview?.overallComment}
              />
            </View>
          )}
        </View>
        {feedbacks &&
          feedbacks?.length > 0 &&
          feedbacks.map((item, index) => (
            <View style={[{ flexDirection: 'row' }, styles.rowDescription]}>
              <Text style={styles.paragraph}>{`Rating ${index + 1}:`}</Text>
              <Rating
                startingValue={item?.rating}
                style={{ marginTop: 5, marginLeft: 5 }}
                imageSize={15}
                readonly
              />
            </View>
          ))}
        {/* <View xs={12} style={styles.buttonContainer}>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Đánh giá</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.buttonText}>Báo cáo</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <View xs={12} style={styles.buttonContainer}>
        <View />
        <Button
          title={i18n.t('EnterLessionRoom')}
          onPress={() => Alert.alert('Cannot press this one')}
          style={styles.buttonIn}
        />
      </View>
    </View>
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
  }
});
