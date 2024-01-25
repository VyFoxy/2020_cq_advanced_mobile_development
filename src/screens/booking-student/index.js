import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList
} from 'react-native';
import { COLORS } from '../../constants';
import { BookingCard } from '../../components/booking-card/BookingCard';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AvatarContext from '../../context/AvatarProvider';
import { getUpcomingBooking } from '../../services/tutorAPI';
import { ceil } from 'lodash';
import Pagination from '../../components/pagination/Pagination';

export const BookingStudentScreen = () => {
  const { avatar } = useContext(AvatarContext);
  const [upComingClass, setUpcomingBookingClass] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const scrollRef = useRef();
  const [totalPages, setTotalPages] = useState(0);
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
  return (
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
        <Text style={styles.headingParagraph}>Lịch đã đặt</Text>
        <View style={styles.blockquote}>
          <Text style={styles.paragraph}>
            Đây là danh sách những khung giờ bạn đã đặt
          </Text>
          <Text style={styles.paragraph}>
            Bạn có thể theo dõi khi nào buổi học bắt đầu, tham gia buổi học bằng
            một cú nhấp chuột hoặc có thể hủy buổi học trước 2 tiếng.
          </Text>
        </View>
      </View>
      <View>
        <FlatList
          data={upComingClass}
          renderItem={({ item }) => <BookingCard item={item} />}
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
  registerText: {
    flexDirection: 'row',
    alignSelf: 'center'
  }
});
