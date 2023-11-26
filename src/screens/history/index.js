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
import { CourseCard } from '../../components/course-card/CourseCard';

export const HistoryScreen = () => {
  const arr = [1, 2, 3, 4];
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
          source={
            'https://sandbox.app.lettutor.com/static/media/history.1e097d10.svg'
          }
          style={styles.image}
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
      <View>
        {/* <CourseCard /> */}
        <FlatList
          data={arr}
          renderItem={({ item }) => <CourseCard />}
          keyExtractor={(item) => item.toString()}
        />
      </View>
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
    width: '40%',
    aspectRatio: 1
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
