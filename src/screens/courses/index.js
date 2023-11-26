import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image
} from 'react-native';
import React from 'react';
import CourseCard from '../../components/course/course';
import { TextField } from '@mui/material';
import { COLORS } from '../../constants';

export const CoursesSreeen = () => {
  const arr = [1, 2, 3, 4, 5];

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
        <View style={styles.container}>
          <Image
            source={
              'https://sandbox.app.lettutor.com/static/media/course.0bf1bb71.svg'
            }
            style={styles.image}
          ></Image>
          <Text style={styles.headingParagraph}>Khám phá các khóa học</Text>
          {/* <View>
            <Text style={styles.headingParagraph}>Khám phá các khóa học</Text>
            <TextField size='small'></TextField>
          </View> */}
        </View>

        <View>
          <Text style={styles.paragraph}>
            LiveTutor đã xây dựng nên các khóa học của các lĩnh vực trong cuộc
            sống chất lượng, bài bản và khoa học nhất cho những người đang có
            nhu cầu trau dồi thêm kiến thức về các lĩnh vực.
          </Text>
        </View>
      </View>
      <View>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  image: {
    width: '30%',
    aspectRatio: 1
  },
  headingParagraph: {
    fontSize: 25,
    fontWeight: 600,
    color: COLORS.black,
    marginVertical: 10,
    marginLeft: 20
  },
  paragraph: {
    fontSize: 14,
    lineHeight: '1.5rem'
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
