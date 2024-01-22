import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { COLORS, IMGS } from '../../constants';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import LocalizationContext from '../../context/LocalizationProvider';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { getUserInfo, updateUser, uploadAvatar } from '../../services/userAPI';
import AvatarContext from '../../context/AvatarProvider';
import mime from 'mime';

const { width } = Dimensions.get('screen');

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useContext(LocalizationContext);

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [img, setImg] = useState(IMGS.user);
  const [hasImg, setHasImg] = useState(false);
  const { avatar, setAvatar } = useContext(AvatarContext);
  const [name, setName] = useState('Nguyen Van Ar');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthDate, setBirthDate] = useState(
    moment('12-25-1995', ['MM-DD-YYYY', 'YYYY-MM-DD'])
  );
  const [phone, setPhone] = useState('0123456789');

  const [openCountry, setOpenCountry] = useState(false);
  const [valueCountry, setValueCountry] = useState([]);
  const [itemsCountry, setItemsCountry] = useState([
    { label: 'VN', value: 'VN' },
    { label: 'USA', value: 'USA' }
  ]);

  const [openLevel, setOpenLevel] = useState(false);
  const [valueLevel, setValueLevel] = useState([]);
  const [itemsLevel, setItemsLevel] = useState([
    { label: i18n.t('Beginner'), value: 'BEGINNER' },
    { label: i18n.t('Intermediate'), value: 'INTERMEDIATE' },
    { label: i18n.t('Advanced'), value: 'ADVANCED' },
    { label: i18n.t('HigherBeginner'), value: 'HIGHER_BEGINNER' }
  ]);

  const [openCourses, setOpenCourses] = useState(false);
  const [valueCourses, setValueCourses] = useState([]);
  const [itemsCourses, setItemsCourses] = useState([
    { label: 'English for Kids', value: 'english-for-kids', id: '3' },
    { label: 'Business English', value: 'business-english', id: '4' },
    {
      label: 'Conversational English',
      value: 'conversational-english',
      id: '5'
    },
    { label: 'STARTERS', value: 'STARTERS' },
    { label: 'MOVERS', value: 'MOVERS' },
    { label: 'FLYERS', value: 'FLYERS' },
    { label: 'KET', value: 'KET' },
    { label: 'PET', value: 'PET' },
    { label: 'IELTS', value: 'IELTS' },
    { label: 'TOEFL', value: 'TOEFL' },
    { label: 'TOIEC', value: 'TOIEC' }
  ]);

  useEffect(() => {
    async function getUser() {
      const { data } = await getUserInfo();
      setUser(data.user);
      setValueCountry(data.user.country);
      setName(data.user.name);
      setValueLevel(data.user.level);
      setBirthDate(moment(data.user.birthday).format('YYYY-MM-DD'));
      setValueCourses(() => {
        let arr = [];
        data.user.learnTopics.map((item) => {
          arr.push(item.key);
        });
        return arr;
      });
      setIsLoading(false);
    }
    getUser();
  }, []);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setBirthDate(date);
    hideDatePicker();
  };
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(status === 'granted');
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 4],
      quality: 1
    });
    if (!result.canceled) {
      setImg(result.assets[0].uri);
      setHasImg(true);
    }
  };
  if (hasGalleryPermission === null) {
  }
  const updateInfo = async () => {
    let arrLearnTopics = [];
    for (let i = 0; i < valueCourses.length; i++) {
      arrLearnTopics.push({
        id: itemsCourses.find((item) => item.value === valueCourses[i]).id
      });
    }
    arrLearnTopics = arrLearnTopics.map((item) => {
      return item.id;
    });
    await updateUser({
      name,
      country: valueCountry,
      birthday: moment(birthDate).format('YYYY-MM-DD'),
      phone,
      level: valueLevel,
      learnTopics: arrLearnTopics
    });
    alert('Update successfully');
    if (hasImg) {
      let formData = new FormData();
      const newImageUri = 'file:///' + img.split('file:/').join('');
      formData.append('avatar', {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split('/').pop()
      });
      try {
        await uploadAvatar(formData);

        setAvatar((prev) => !prev);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          size='large'
          color={COLORS.primary}
          style={styles.centerLoading}
        />
      ) : (
        <View
          style={[
            styles.container
            //{ backgroundColor: themeData.backgroundColor }
          ]}
        >
          <View style={styles.imgContainer}>
            <TouchableOpacity onPress={() => pickImage()}>
              {hasImg ? (
                <Image source={{ uri: img }} style={styles.userImg} />
              ) : user ? (
                <Image source={{ uri: user.avatar }} style={styles.userImg} />
              ) : (
                <Image source={img} style={styles.userImg} />
              )}
            </TouchableOpacity>

            {/* <Text style={styles.userName}>Kiet Tuong</Text> */}
            <Text style={styles.userEmail}>{user?.email}</Text>
            <TextInput
              mode='outlined'
              style={styles.input}
              value={name}
              onChangeText={setName}
              name='name'
              label='Tên'
              defaultValue='Nguyen Van Ar'
              left={<TextInput.Icon icon='account' />}
            />
            <TouchableOpacity onPress={showDatePicker}>
              <TextInput
                mode='outlined'
                style={styles.input}
                value={moment(birthDate).format('DD MMMM, YYYY')}
                name='dob'
                label='Ngày sinh'
                editable={false}
                left={<TextInput.Icon icon='calendar' />}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode='date'
                onChange={(date) => setBirthDate(date)}
                value={handleConfirm}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </TouchableOpacity>
            <DropDownPicker
              placeholder={i18n.t('Country')}
              style={styles.dropdownmulti}
              open={openCountry}
              value={valueCountry}
              items={itemsCountry}
              setOpen={setOpenCountry}
              setValue={setValueCountry}
              setItems={setItemsCountry}
              theme='LIGHT'
            />
            <TextInput
              mode='outlined'
              style={styles.input}
              value={user?.phone}
              onChangeText={setPhone}
              name='SDT'
              label='SDT'
              defaultValue='Nguyen Van Ar'
              left={<TextInput.Icon icon='phone' />}
            />

            <DropDownPicker
              placeholder={i18n.t('SelectCourse')}
              style={styles.dropdownmulti}
              open={openCourses}
              value={valueCourses}
              items={itemsCourses}
              setOpen={setOpenCourses}
              setValue={setValueCourses}
              setItems={setItemsCourses}
              theme='LIGHT'
              multiple={true}
              mode='BADGE'
              badgeDotColors={[
                '#e76f51',
                '#00b4d8',
                '#e9c46a',
                '#e76f51',
                '#8ac926',
                '#00b4d8',
                '#e9c46a'
              ]}
              dropDownDirection='TOP'
            />
            <DropDownPicker
              placeholder={i18n.t('SelectLevel')}
              style={styles.dropdownmulti}
              open={openLevel}
              value={valueLevel}
              items={itemsLevel}
              setOpen={setOpenLevel}
              setValue={setValueLevel}
              setItems={setItemsLevel}
              theme='LIGHT'
              mode='BADGE'
              badgeDotColors={[
                '#e76f51',
                '#00b4d8',
                '#e9c46a',
                '#e76f51',
                '#8ac926',
                '#00b4d8',
                '#e9c46a'
              ]}
            />
            <TouchableOpacity style={styles.updateButton} onPress={updateInfo}>
              <Text style={styles.updateButtonText}> {i18n.t('Update')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  userImg: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    borderWidth: 4,
    borderColor: COLORS.white
  },
  imgContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  },
  userEmail: {
    fontSize: 15,
    fontWeight: 'italic',
    marginTop: 5,
    fontStyle: 'italic'
  },
  input: {
    width: width - 40,
    // backgroundColor: "#fff",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    marginVertical: 10
  },
  dropdownmulti: {
    marginVertical: 10,

    width: '90%',
    height: 50,
    paddingHorizontal: 18,
    alignSelf: 'center'
  },
  updateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 50,
    backgroundColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: 15,
    marginVertical: 30
  },
  updateButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  centerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
