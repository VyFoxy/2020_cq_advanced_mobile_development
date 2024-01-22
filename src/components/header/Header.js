import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable
} from 'react-native';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, IMGS, ROUTES } from '../../constants';
import AuthContext from '../../context/AuthContext';
import { isEmpty } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalizationContext from '../../context/LocalizationProvider';

export const Header = () => {
  const { locale, setLocale } = LocalizationContext;
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    async function getUserInfo() {
      const avatar = await AsyncStorage.getItem('avatar');
      const name = await AsyncStorage.getItem('name');
      const accessToken = await AsyncStorage.getItem('accessToken');
      setUserInfo({ avatar: avatar, name: name, accessToken: accessToken });
      console.log(userInfo);
    }
    getUserInfo();
  }, []);
  return (
    <>
      <View style={styles.header}>
        <View>
          <Image
            source={require('../../../assets/img/logo.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.button}>
            <Image source={IMGS.vi} style={styles.flagIcon} />
          </TouchableOpacity>
          {!isEmpty(userInfo?.accessToken) && (
            <TouchableOpacity
              style={styles.menuIcon}
              onPress={() => setShowMenu(!showMenu)}
            >
              <Ionicons name='menu-outline' size={26} color='black' />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={showMenu ? styles.filter : styles.jselshow}>
        <View style={styles.wrap}>
          <View style={styles.inner}>
            <View style={styles.body}>
              {!isEmpty(userInfo) && (
                <TouchableOpacity
                  style={styles.menuNav}
                  onPress={() => {
                    navigation.navigate(ROUTES.PROFILE);
                    setShowMenu(!showMenu);
                  }}
                >
                  <Image
                    style={styles.avtimg}
                    source={{ uri: userInfo?.avatar }}
                  />
                  <Text style={styles.navText}>{userInfo?.name}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.menuNav}>
                <MaterialIcons
                  name='calendar-today'
                  size={32}
                  style={styles.navIcon}
                />
                <Text style={styles.navText}>Lịch học định kỳ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuNav}
                onPress={() => {
                  navigation.navigate(ROUTES.HOME);
                  setShowMenu(!showMenu);
                }}
              >
                <MaterialIcons
                  name='cast-for-education'
                  size={32}
                  style={styles.navIcon}
                />
                <Text style={styles.navText}>Gia sư</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuNav}
                onPress={() => {
                  navigation.navigate(ROUTES.BOOKINGSTUDENT);
                  setShowMenu(!showMenu);
                }}
              >
                <MaterialIcons
                  name='event-available'
                  size={32}
                  style={styles.navIcon}
                />
                <Text style={styles.navText}>Lịch học</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuNav}
                onPress={() => {
                  navigation.navigate(ROUTES.HISTORY);
                  setShowMenu(!showMenu);
                }}
              >
                <MaterialIcons
                  name='history'
                  size={32}
                  style={styles.navIcon}
                />
                <Text style={styles.navText}>Lịch sử</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuNav}
                onPress={() => {
                  navigation.navigate(ROUTES.COURSE);
                  setShowMenu(!showMenu);
                }}
              >
                <MaterialIcons name='school' size={32} style={styles.navIcon} />
                <Text style={styles.navText}>Khóa học</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuNav}>
                <MaterialIcons
                  name='auto-stories'
                  size={32}
                  style={styles.navIcon}
                />
                <Text style={styles.navText}>Khóa học của tôi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuNav}>
                <AntDesign name='swap' size={32} style={styles.navIcon} />
                <Text style={styles.navText}>Đăng ký thành giáo viên</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuNav}
                onPress={async () => {
                  await AsyncStorage.removeItem('accessToken');
                  navigation.navigate(ROUTES.LOGIN);
                  setShowMenu(!showMenu);
                }}
              >
                <MaterialIcons name='logout' size={32} style={styles.navIcon} />
                <Text style={styles.navText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    position: 'fixed',
    width: '100%',
    height: 70,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2000,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowRadius: 3,
    paddingLeft: 18,
    paddingRight: 10,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderColor: '#CCC'
  },
  headerRight: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  avtimg: {
    width: 35,
    height: 35,
    borderRadius: 50
  },
  logo: {
    maxHeight: 44,
    height: 5,
    width: 10,
    width: 'auto',
    position: 'relative'
  },
  label: {
    fontSize: 18, // Customize the label's font size
    color: 'white' // Customize the label's text color
  },
  button: {
    width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor: '#E4E6EB',
    marginLeft: 'auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  flagIcon: {
    opacity: 1,
    width: 20,
    height: 20,
    borderRadius: 50,
    overflow: 'hidden'
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor: '#E4E6EB',
    marginLeft: 'auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  filter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    marginTop: 32,
    zIndex: 1320
  },
  wrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    maxWidth: 400,
    width: '100%',
    height: '100%',
    zIndex: 10000,
    backgroundColor: '#f0f2f5',
    paddingVertical: 20,
    paddingHorizontal: 40
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    paddingVertical: 32
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1200
  },
  jselshow: {
    display: 'none'
  },
  menuNav: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  navIcon: {
    color: COLORS.primary,
    width: 35,
    height: 35
  },
  navText: {
    fontSize: 17,
    fontWeight: 600,
    marginLeft: 15
  }
});
