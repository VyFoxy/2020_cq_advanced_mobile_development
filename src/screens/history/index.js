import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { COLORS } from '../../constants';
import { CourseCard } from '../../components/course-card/CourseCard';
import { getHistoryBooking } from '../../services/tutorAPI';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../../components/pagination/Pagination';
import { ceil } from 'lodash';
import { getMinutesAgoTimestamp } from '../../utils/func';

export const HistoryScreen = () => {
  const [historyBooking, setHistoryBooking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef();
  async function fetchData(page) {
    setIsLoading(true);
    let { data } = await getHistoryBooking({
      page: page,
      perPage: 20,
      dateTimeLte: getMinutesAgoTimestamp(35)
    });
    if (data?.rows?.length > 0) {
      setHistoryBooking(data?.rows);
    }
    setTotalPages(ceil(data?.count / 20));
    setIsLoading(false);
  }
  useEffect(() => {
    fetchData(currentPage);
  }, []);

  useEffect(() => {
    fetchData(currentPage);
    scrollRef.current.scrollTo({
      y: 30,
      animated: true
    });
  }, [currentPage]);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 30,
        paddingHorizontal: 40
      }}
      ref={scrollRef}
    >
      <View>
        <Image
          source={require('../../../assets/img/history.png')}
          style={styles.image}
          resizeMode='contain'
        ></Image>
        <Text style={styles.headingParagraph}>Lịch sử các buổi học</Text>
        <View style={styles.blockquote}>
          <Text style={styles.paragraph}>
            Đây là danh sách các bài học bạn đã tham gia
          </Text>
          <Text style={styles.paragraph}>
            Bạn có thể xem lại thông tin chi tiết về các buổi học đã tham gia đã
            tham gia
          </Text>
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator
          size='large'
          color={COLORS.primary}
          style={styles.centerLoading}
        />
      ) : (
        <>
          <View>
            {/* <CourseCard /> */}
            <FlatList
              data={historyBooking}
              renderItem={({ item }) => <CourseCard item={item} />}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </View>
          {historyBooking && historyBooking?.length > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={() => {}}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150
  },
  headingParagraph: {
    fontSize: 30,
    fontWeight: 700,
    color: COLORS.black,
    marginVertical: 10
  },
  paragraph: {
    fontSize: 17
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
  header: {
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  logo: {
    width: '50%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  authentication: {
    padding: 20
  },
  content: {
    height: '100%'
  },
  loginText: {
    fontSize: 30,
    fontWeight: 'bold',
    //color: COLORS.primary,
    alignSelf: 'center'
  },
  loginArea: {
    padding: 20,
    flexDirection: 'column'
  },
  textIntro: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 500,
    color: '#2A3453'
  },

  formLogin: {
    flexDirection: 'column',
    paddingVertical: 20
  },

  input: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    marginVertical: 10,
    marginBottom: 20
  },
  label: { marginBottom: 10, color: '#A4B0BE' },
  forgotPass: {
    marginVertical: 20
  },
  forgotPassText: {
    //color: COLORS.primary
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    //backgroundColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: 5
  },
  loginButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },

  otherLogin: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20
  },

  otherLoginIcons: {
    flexDirection: 'row',
    margin: 10,
    padding: 20,
    width: '70%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  otherLoginIcon: {
    height: 50
  },
  phoneIcon: {
    width: 50,
    borderWidth: 1,
    borderRadius: 25,
    //borderColor: COLORS.primary,
    alignItems: 'center'
  },
  centerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
