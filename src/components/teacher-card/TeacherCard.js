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
import { Rating } from 'react-native-ratings';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { isEmpty, round } from 'lodash';
import { favorAction } from '../../services/tutorAPI';
import { useContext } from 'react';
import AvatarContext from '../../context/AvatarProvider';
import LocalizationContext from '../../context/LocalizationProvider';

export default function TeacherCard(props) {
  const { item } = props;
  const { i18n } = useContext(LocalizationContext);
  const { setAvatar } = useContext(AvatarContext);
  const navigation = useNavigation();
  const [value, setValue] = useState(round(item?.rating) || null);
  const [itemState, setItemState] = useState(item || []);
  const listSpecialties = item?.specialties?.map((item) => ({
    label: item,
    status: 'active'
  }));
  const handleFavorAction = async () => {
    setItemState({
      ...itemState,
      isFavoriteTutor: !itemState?.isFavoriteTutor
    });
    await favorAction(item?.id);
    setAvatar((prev) => !prev);
  };
  return (
    <View style={styles.outerContainer}>
      <Pressable
        onPress={() => {
          navigation.navigate(ROUTES.TEACHER_DETAIL, { id: item?.id });
        }}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image style={styles.avtimg} source={{ uri: item?.avatar || '' }} />
          </View>

          <View style={styles.header}>
            <View style={styles.HeaderRight}>
              <View style={styles.nameContainer}>
                {!isEmpty(item?.name) && (
                  <Text style={styles.name}>{item?.name || ''}</Text>
                )}

                <Rating
                  startingValue={item?.rating || 0}
                  onFinishRating={(event, newValue) => {
                    setValue(newValue);
                  }}
                  style={styles.rating}
                  imageSize={20}
                  readonly
                />
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={styles.flag}
                    source={{
                      uri: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/tw.svg'
                    }}
                  />
                  {!isEmpty(item?.country) && (
                    <Text style={styles.textDescript}>
                      {item?.country || ''}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.HeaderLeft}>
              <Pressable
                style={styles.btnFollow}
                onPress={() => handleFavorAction()}
              >
                <AntDesign
                  name={itemState?.isFavoriteTutor ? 'heart' : 'hearto'}
                  size={24}
                  color={itemState?.isFavoriteTutor ? 'red' : 'blue'}
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.tagItem}>
            <ListTag tags={listSpecialties || []} />
          </View>
          <View style={styles.descript}>
            {!isEmpty(item?.bio) && (
              <Text numberOfLines={4} style={styles.textDescript}>
                {item?.bio || ''}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            navigation.navigate(ROUTES.TEACHER_DETAIL, { id: item?.id });
          }}
        >
          <MaterialIcons
            name='event-note'
            size={24}
            style={{ color: COLORS.primary }}
          />
          <Text style={styles.ButtonText}>{i18n.t('Book')}</Text>
        </TouchableOpacity>
      </View>
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
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 1,
    // shadowColor: '#CCC',
    borderWidth: 0.8,
    borderColor: '#CCC',
    shadowRadius: 5,
    backgroundColor: COLORS.white,
    marginVertical: 15,
    borderRadius: 16,
    marginHorizontal: 16,
    minHeight: 500
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
    marginLeft: 12,
    marginVertical: 10,
    flex: 1
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
    width: 100,
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
