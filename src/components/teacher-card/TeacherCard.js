import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ListTag } from '../list-tag/ListTag';
import { AntDesign } from '@expo/vector-icons';
import { COLORS, IMGS, ROUTES } from '../../constants';
import { Grid, Rating } from '@mui/material';
import { mappingSpecialties } from '../../utils/mapping';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { useNavigation } from '@react-navigation/native';
import { round } from 'lodash';

export default function TeacherCard(props) {
  const { item } = props;
  const navigation = useNavigation();
  const [value, setValue] = useState(round(item?.rating) || null);
  const [followStatus, setFollowStatus] = useState(
    item?.isFavoriteTutor || false
  );

  return (
    <View style={styles.outerContainer}>
      <Pressable
        onPress={() => {
          navigation.navigate(ROUTES.TEACHER_DETAIL);
        }}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image style={styles.avtimg} source={item?.avatar || ''} />
          </View>

          <View style={styles.header}>
            <View style={styles.HeaderRight}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{item?.name}</Text>
                <Rating
                  name='simple-controlled'
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <View style={{ flexDirection: 'row' }}>
                  <Image style={styles.flag} source={IMGS.vi} />{' '}
                  <Text style={styles.textDescript}>{item?.country || ''}</Text>
                </View>
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
                  color={followStatus ? 'red' : 'blue'}
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.tagItem}>
            <Grid>
              <ListTag tags={item?.specialties || []} />
            </Grid>
          </View>
          <View style={styles.descript}>
            <Text numberOfLines={4} style={styles.textDescript}>
              {item?.bio || ''}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity style={styles.Button}>
              <EventNoteOutlinedIcon style={{ color: COLORS.primary }} />
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
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.18,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
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
    borderColor: 'gray',
    marginTop: 20
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
    color: COLORS.black,
    opacity: 0.6
  },
  nameContainer: {
    flexDirection: 'column'
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 5
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: 40,
    backgroundColor: COLORS.white,
    elevation: 2,
    borderRadius: 100,
    margin: 30,
    borderColor: COLORS.primary,
    borderWidth: 1,
    flexDirection: 'row'
  },
  ButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 5
  },
  btnFollow: {
    position: 'absolute',
    top: 0,
    right: 0
  }
});
