import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Pressable
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, IMGS } from '../../constants';
import { toTimeString, convertSecondsToTime } from '../../utils/func';

export const Video = ({ route, navigation }) => {
  const { data } = route.params;
  const { scheduleDetailInfo } = data;
  const startDate = new Date(scheduleDetailInfo.startPeriodTimestamp);
  const waitTime = startDate - Date.now();
  const [timerCount, setTimer] = useState(parseInt(waitTime / 1000));
  const [timeLearn, setTimeLearn] = useState(0);
  useEffect(() => {
    let countDown = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(countDown);
        return lastTimerCount - 1;
      });
    }, 1000);
    let countUp = setInterval(() => {
      setTimeLearn((lastTimeLearn) => {
        return lastTimeLearn + 1;
      });
    }, 1000);
    return () => {
      clearInterval(countDown);
      clearInterval(countUp);
    };
  }, []);
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.logo} source={IMGS.logo} resizeMode='contain' />
        <View style={styles.headerRight}>
          <Text style={styles.timeLearn}>
            {convertSecondsToTime(timeLearn)}
          </Text>
        </View>
      </View>
      <View style={styles.alert}>
        {waitTime > 0 && (
          <>
            <Text style={styles.title}>The lesson will be started after:</Text>
            <Text style={styles.title}>{toTimeString(timerCount)}</Text>
            <Text style={styles.title}>
              ({startDate.toUTCString().substring(0, 22)}) UTC
            </Text>
          </>
        )}
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.iconHolder}>
          <Ionicons name='mic' size={24} color='white' />
        </View>
        <View style={styles.iconHolder}>
          <MaterialIcons name='videocam-off' size={24} color='white' />
        </View>
        <View style={{ ...styles.iconHolder, backgroundColor: 'black' }}>
          <Ionicons name='hand-left' size={24} color='white' />
        </View>
        <View style={{ ...styles.iconHolder, backgroundColor: 'black' }}>
          <Ionicons name='ellipsis-horizontal' size={24} color='white' />
        </View>
        <Pressable onPress={handleBack}>
          <View style={{ ...styles.iconHolder, backgroundColor: 'red' }}>
            <Ionicons name='call' size={24} color='white' />
          </View>
        </Pressable>
      </View>

      {/* <JitsiMeetView style={styles.meetView} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    width: '50%',
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 20
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    margin: 5
  },
  meetView: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  alert: {
    backgroundColor: 'white',
    opacity: 1,
    borderRadius: 13,
    alignItems: 'center',
    padding: 10,
    margin: 10,
    zIndex: 2,
    borderColor: 'black',
    borderWidth: 0.5
  },
  iconContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    padding: 5,
    justifyContent: 'center',
    backgroundColor: 'black',
    marginBottom: 10
  },
  iconHolder: {
    padding: 5,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginHorizontal: 2
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    width: '100%'
  },
  headerRight: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 13,
    alignItems: 'flex-end',
    marginRight: 20
  },
  timeLearn: {
    color: 'white'
  }
});
