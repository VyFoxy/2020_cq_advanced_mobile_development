import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable
} from 'react-native';
import React, { useState } from 'react';
import { ListTag } from '../list-tag/ListTag';
import { AntDesign } from '@expo/vector-icons';
import { COLORS, IMGS, ROUTES } from '../../constants';
import { Rating } from '@mui/material';
//import { Rating } from 'react-native-elements';
//import { useNavigation } from '@react-navigation/native';

export default function TeacherCard({ isLiked }) {
  //const navigation = useNavigation();
  const navigation = '';
  const [value, setValue] = useState(5);
  const [followStatus, setFollowStatus] = useState(isLiked);
  const listSpecialies = [
    'English',
    'Math',
    'Physics',
    'IEOS',
    'FES',
    'FESe',
    'FEsssS'
  ];
  return (
    <View style={styles.outerContainer}>
      <Pressable
        onPress={() => {
          navigation.navigate(ROUTES.TEACHER_DETAIL);
        }}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.HeaderRight}>
              <Image style={styles.avtimg} source={IMGS.user} />
              <View style={styles.nameContainer}>
                <Text style={styles.name}>Keegan</Text>
                <Rating
                  name='simple-controlled'
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <Image style={styles.flag} source={IMGS.vi} />
              </View>
            </View>
            <View style={styles.HeaderLeft}>
              <Pressable
                style={styles.btnFollow}
                onPress={() => {
                  setFollowStatus(!followStatus);
                }}
              >
                <AntDesign
                  name={followStatus ? 'heart' : 'hearto'}
                  size={24}
                  color='blue'
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.tagItem}>
            <ListTag tags={listSpecialies} />
          </View>
          <View style={styles.descript}>
            <Text numberOfLines={4} style={styles.textDescript}>
              I am passionate about running and fitness, I often compete in
              trail/mountain running events and I love pushing myself. I am
              training to one day take part in ultra-endurance events. I also
              enjoy watching rugby on the weekends, reading and watching
              podcasts on Youtube. My most memorable life experience would be
              living in and traveling around Southeast Asia.
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity style={styles.Button}>
              {/* <OndemandVideoOutlinedIcon/> */}
              <Text style={styles.ButtonText}>Đặt lịch</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white
  },

  outerContainer: {
    flex: 1,
    height: 465,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: COLORS.white,
    marginVertical: 5,
    borderRadius: 16,
    marginHorizontal: 16
  },
  header: {
    flexDirection: 'row'
  },
  HeaderRight: {
    flexDirection: 'column',
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
    fontWeight: '400'
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
    marginBottom: 15
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
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
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
    margin: 30,
    borderColor: COLORS.primary,
    borderWidth: 1
  },
  ButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary
  }
});
