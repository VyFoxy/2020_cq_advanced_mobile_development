import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable
} from 'react-native';
import { Box, Button, Grid, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HistoryIcon from '@mui/icons-material/History';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigation } from '@react-navigation/native';
import { COLORS, IMGS, ROUTES } from '../../constants';
export const Header = () => {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <View style={styles.header}>
        <Grid container>
          <Grid item xs={6} md={6}>
            <Image
              source={require('../../../assets/img/logo.svg')}
              style={styles.logo}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <div style={styles.headerRight}>
              <TouchableOpacity style={styles.button}>
                <Image source={IMGS.vi} style={styles.flagIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuIcon}
                onPress={() => setShowMenu(!showMenu)}
              >
                <MenuIcon></MenuIcon>
              </TouchableOpacity>
            </div>
          </Grid>
        </Grid>
      </View>
      <div style={showMenu ? styles.filter : styles.jselshow}>
        <div style={styles.wrap}>
          <div style={styles.inner}>
            <div style={styles.body}>
              <TouchableOpacity style={styles.menuNav}>
                <CalendarTodayIcon style={styles.navIcon}></CalendarTodayIcon>
                <Text style={styles.navText}>Lịch học định kỳ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuNav}
                onPress={() => {
                  navigation.navigate(ROUTES.HOME);
                  setShowMenu(!showMenu);
                }}
              >
                <CastForEducationIcon
                  style={styles.navIcon}
                ></CastForEducationIcon>
                <Text style={styles.navText}>Gia sư</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuNav}
                onPress={() => {
                  navigation.navigate(ROUTES.BOOKINGSTUDENT);
                  setShowMenu(!showMenu);
                }}
              >
                <EventAvailableIcon style={styles.navIcon}></EventAvailableIcon>
                <Text style={styles.navText}>Lịch học</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuNav}
                onPress={() => {
                  navigation.navigate(ROUTES.HISTORY);
                  setShowMenu(!showMenu);
                }}
              >
                <HistoryIcon style={styles.navIcon}></HistoryIcon>
                <Text style={styles.navText}>Lịch sử</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuNav}
                onPress={() => {
                  navigation.navigate(ROUTES.COURSE);
                  setShowMenu(!showMenu);
                }}
              >
                <SchoolIcon style={styles.navIcon}></SchoolIcon>
                <Text style={styles.navText}>Khóa học</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuNav}>
                <AutoStoriesIcon style={styles.navIcon}></AutoStoriesIcon>
                <Text style={styles.navText}>Khóa học của tôi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuNav}>
                <LogoutIcon style={styles.navIcon}></LogoutIcon>
                <Text style={styles.navText}>Đăng xuất</Text>
              </TouchableOpacity>
            </div>
          </div>
        </div>
      </div>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    paddingLeft: 18,
    paddingRight: 10,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px -1px 13px 2px'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  logo: {
    maxHeight: 44,
    height: '100%',
    width: 'auto',
    overflow: 'none',
    position: 'relative'
  },
  label: {
    fontSize: 18, // Customize the label's font size
    color: 'white' // Customize the label's text color
  },
  button: {
    width: 38,
    height: 38,
    borderRadius: '50%',
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
    borderRadius: '50%',
    overflow: 'hidden'
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    backgroundColor: '#E4E6EB',
    marginLeft: 'auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  filter: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    marginTop: 70,
    zIndex: 1300
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
    paddingVertical: 30
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
    marginLeft: 30,
    marginVertical: 25,
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
