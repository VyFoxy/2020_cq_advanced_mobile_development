import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React from 'react';
import TeacherCard from '../../components/teacher-card/TeacherCard';
import { COLORS, ROUTES } from '../../constants';
import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { useState } from 'react';

export const Tutor = ({ navigation }) => {
  const [nation, setNation] = useState('');
  const data = [
    {
      avatar:
        'https://api.app.lettutor.com/avatar/e9e3eeaa-a588-47c4-b4d1-ecfa190f63faavatar1632109929661.jpg',
      country: 'PH',
      id: '45f8709e-2e84-46f2-b238-817a85cc2b29',
      name: 'Jill Leano',
      bio: "Hi, My name is Jill I am an experienced English Teacher from Philippine. I would like to share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy to focus on my learner's goal.",
      isNative: null,
      specialties: 'business-english,english-for-kids,toefl,toeic',
      rating: null,
      userId: '45f8709e-2e84-46f2-b238-817a85cc2b29',
      schedulesTimes: null,
      isFavoriteTutor: true,
      price: 50000
    },
    {
      avatar:
        'https://sandbox.api.lettutor.com/avatar/4d54d3d7-d2a9-42e5-97a2-5ed38af5789aavatar1684484879187.jpg',
      country: 'TN',
      id: '4d54d3d7-d2a9-42e5-97a2-5ed38af5789a',
      name: 'Keegan',
      bio: 'I am passionate about running and fitness, I often compete in trail/mountain running events and I love pushing myself. I am training to one day take part in ultra-endurance events. I also enjoy watching rugby on the weekends, reading and watching podcasts on Youtube. My most memorable life experience would be living in and traveling around Southeast Asia.',
      isNative: null,
      specialties:
        'business-english,conversational-english,english-for-kids,ielts,starters,movers,flyers,ket,pet,toefl,toeic',
      rating: 4.101449275362318,
      userId: '4d54d3d7-d2a9-42e5-97a2-5ed38af5789a',
      schedulesTimes: 69,
      isFavoriteTutor: null,
      price: 50000
    },
    {
      avatar:
        'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
      country: 'Saint Martin',
      id: 'da00e271-e849-4d2f-a365-3dbf8bfcc9ea',
      name: 'Adelia Rice',
      bio: 'Recusandae dignissimos ut commodi et iste qui eum quos.',
      isNative: null,
      specialties: 'of,ds,ds,ds,hc',
      rating: null,
      userId: 'da00e271-e849-4d2f-a365-3dbf8bfcc9ea',
      schedulesTimes: null,
      isFavoriteTutor: null,
      price: 0
    },
    {
      avatar:
        'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
      country: 'Aruba',
      id: '61f78846-e907-4be6-ad39-f343ecddeaf2',
      name: 'Allison Murray',
      bio: 'Odit est ratione et dolorem tenetur illum.',
      isNative: null,
      specialties: 'bs,mt,hc,fl,ds',
      rating: null,
      userId: '61f78846-e907-4be6-ad39-f343ecddeaf2',
      schedulesTimes: null,
      isFavoriteTutor: null,
      price: 0
    },
    {
      avatar:
        'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
      country: 'Bolivia',
      id: 'a649f315-1ca6-417f-81bb-580013495e21',
      name: 'Ana Lubowitz',
      bio: 'Debitis distinctio minus qui accusantium voluptatum.',
      isNative: null,
      specialties: 'bs,hc',
      rating: null,
      userId: 'a649f315-1ca6-417f-81bb-580013495e21',
      schedulesTimes: null,
      isFavoriteTutor: null,
      price: 0
    },
    {
      avatar:
        'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
      country: 'Hong Kong',
      id: 'f9064480-b5aa-4540-b94d-f7a4c8303c0c',
      name: 'Angus Dickinson',
      bio: 'Enim expedita explicabo saepe perferendis est et.',
      isNative: null,
      specialties: 'hc,hc,ds,fl,of',
      rating: null,
      userId: 'f9064480-b5aa-4540-b94d-f7a4c8303c0c',
      schedulesTimes: null,
      isFavoriteTutor: null,
      price: 0
    },
    {
      avatar:
        'https://api.app.lettutor.com/avatar/83802576-70fe-4394-b27a-3d9e8b50f1b7avatar1649512219387.jpg',
      country: 'PH',
      id: 'f64bca88-80fb-479d-a9d1-66fd326cfa45',
      name: 'April Baldo',
      bio: 'Hello! My name is April Baldo, you can just call me Teacher April. I am an English teacher and currently teaching in senior high school. I have been teaching grammar and literature for almost 10 years. I am fond of reading and teaching literature as one way of knowing one’s beliefs and culture. I am friendly and full of positivity. I love teaching because I know each student has something to bring on. Molding them to become an individual is a great success.',
      isNative: null,
      specialties: 'business-english,ielts,pet,ket',
      rating: 4.217391304347826,
      userId: 'f64bca88-80fb-479d-a9d1-66fd326cfa45',
      schedulesTimes: null,
      isFavoriteTutor: null,
      price: 50000
    },
    {
      avatar:
        'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
      country: 'Guernsey',
      id: '2d28e297-0123-4f92-a082-bfc919b8b691',
      name: 'Bradley Zieme',
      bio: 'Asperiores cupiditate sint et neque quasi.',
      isNative: null,
      specialties: 'ds,it',
      rating: null,
      userId: '2d28e297-0123-4f92-a082-bfc919b8b691',
      schedulesTimes: null,
      isFavoriteTutor: null,
      price: 0
    },
    {
      avatar:
        'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
      country: 'Chad',
      id: 'fe326500-f050-4539-83fa-80f58a72019f',
      name: 'Cassandre Balistreri',
      bio: 'Est et vel.',
      isNative: null,
      specialties: 'of,it,of',
      rating: null,
      userId: 'fe326500-f050-4539-83fa-80f58a72019f',
      schedulesTimes: null,
      isFavoriteTutor: null,
      price: 0
    },
    {
      avatar:
        'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
      country: 'Kiribati',
      id: 'e61012dc-cf03-46ee-9b34-a1c9e61a74cf',
      name: 'Chad Ankunding',
      bio: 'Rem neque quidem aliquam magni quasi et.',
      isNative: null,
      specialties: 'bs,bs,it,of',
      rating: null,
      userId: 'e61012dc-cf03-46ee-9b34-a1c9e61a74cf',
      schedulesTimes: null,
      isFavoriteTutor: null,
      price: 0
    },
    {
      avatar:
        'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
      country: 'Indonesia',
      id: '7214c889-a46f-44ee-b916-02dde3c81052',
      name: 'Damon Carroll',
      bio: 'Tenetur sit dolorem qui aspernatur suscipit fugit sequi facere.',
      isNative: null,
      specialties: 'of,hc,of',
      rating: null,
      userId: '7214c889-a46f-44ee-b916-02dde3c81052',
      schedulesTimes: null,
      isFavoriteTutor: null,
      price: 0
    },
    {
      avatar:
        'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
      country: 'Niue',
      id: '5a681fa4-2a31-4aa8-9d17-86a1b0f3c8c8',
      name: 'Dangelo Wehner',
      bio: 'Quibusdam nam sint in aut et eius.',
      isNative: null,
      specialties: 'ds,hc,fl',
      rating: null,
      userId: '5a681fa4-2a31-4aa8-9d17-86a1b0f3c8c8',
      schedulesTimes: null,
      isFavoriteTutor: null,
      price: 0
    }
  ];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.welcomeText}>Buổi học sắp diễn ra</Text>
        <Grid container style={{ marginTop: 20 }}>
          <Grid item xs={6} md={6} style={{ textAlign: 'center' }}>
            <Text style={styles.welcomeText}>
              T7, 04 Thg 11 23 18:00 - 18:25
            </Text>
            <Text style={styles.remainingText}>{' (còn 43:26:09)'}</Text>
          </Grid>
          <Grid item xs={6} md={6}>
            <TouchableOpacity style={styles.Button}>
              {/* <OndemandVideoOutlinedIcon/> */}
              <Text style={styles.ButtonText}>Vào lớp học</Text>
            </TouchableOpacity>
          </Grid>
        </Grid>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterHeader}>Tìm kiếm gia sư</Text>
        <TextField
          placeholder={'Nhập tên gia sư'}
          size='small'
          InputProps={{
            style: {
              borderRadius: 50
            }
          }}
          style={{ width: 200 }}
        />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <TeacherCard item={item} />}
        keyExtractor={(item) => item.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  banner: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    color: 'white',
    borderBottomLeftRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    backgroundColor:
      'linear-gradient(144deg, rgb(12, 61, 223) 0%, rgb(5, 23, 157) 100%)',
    height: 344
  },
  welcomeText: {
    fontSize: 20,
    color: 'white'
  },
  remainingText: {
    color: 'yellow',
    fontSize: 20
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: 40,
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: 100,
    marginTop: 10,
    marginLeft: 50
  },
  ButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  seeMore: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 5
  },
  filterContainer: {
    marginTop: 30,
    padding: 20
  },
  filterHeader: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 40
  },
  filerInput: {
    borderRadius: 50
  }
});
