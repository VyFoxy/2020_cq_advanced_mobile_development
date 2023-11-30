import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, ROUTES } from '../../constants';
import { isEmpty } from 'lodash';
export const RegisterScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (username && password) {
      const existingUser = await AsyncStorage.getItem(username);
      let usernames = await AsyncStorage.getItem('usernames');
      if (isEmpty(usernames)) {
        usernames = [];
      }
      if (existingUser) {
        Alert.alert('Username already exists');
      } else {
        // Store user information locally
        await AsyncStorage.setItem(username, JSON.stringify({ password }));

        await AsyncStorage.setItem(
          'usernames',
          JSON.stringify([...usernames, username])
        );
        console.log(123);
        Alert.alert('Registration Successful');
        navigation.navigate(ROUTES.LOGIN);
      }
    } else {
      Alert.alert('Please enter a username and password');
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.header}></View>

        <View style={styles.authentication}>
          <View style={styles.content}>
            <Image
              source={require('../../../assets/img/login.8d01124a.png')}
              style={styles.image}
            />
            <Text style={styles.loginText}> Đăng ký </Text>
            <View style={styles.loginArea}>
              <Text style={styles.textIntro}>
                Phát triển kỹ năng tiếng Anh nhanh nhất bằng cách học 1 kèm 1
                trực tuyến theo mục tiêu và lộ trình dành cho riêng bạn
              </Text>
              <View style={styles.formLogin}>
                <Text style={styles.label}>ĐỊA CHỈ EMAIL</Text>
                <TextField
                  style={styles.input}
                  size='small'
                  name='email'
                  placeholder='mail@example.com'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Text style={styles.label}>MẬT KHẨU</Text>
                <TextField
                  style={styles.input}
                  name='password'
                  type={passwordVisible ? 'password' : null}
                  size='small'
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          edge='end'
                        >
                          {passwordVisible ? (
                            <VisibilityOffOutlinedIcon />
                          ) : (
                            <VisibilityOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                {/* 
                <TouchableOpacity
                  style={styles.forgotPass}
                  onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
                >
                  <Text style={styles.forgotPassText}> Quên mật khẩu? </Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => handleSignUp()}
                >
                  <Text style={styles.loginButtonText}> ĐĂNG KÝ </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.otherLogin}>
                <Text>Hoặc tiếp tục với</Text>
                <View style={styles.otherLoginIcons}>
                  <TouchableOpacity>
                    <Image
                      style={styles.otherLoginIcon}
                      source={require('../../../assets/img/facebookLogo.png')}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      style={styles.otherLoginIcon}
                      source={require('../../../assets/img/googleLogo.png')}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.registerText}>
                  <Text>Đã có tài khoản? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.LOGIN)}
                  >
                    <Text style={styles.forgotPassText}>Đăng nhập</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 30
  },
  error: {
    color: 'red'
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
    color: COLORS.primary,
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
    color: COLORS.primary
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary,
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
    fontSize: 15,
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
    borderColor: COLORS.primary,
    alignItems: 'center'
  },
  registerText: {
    flexDirection: 'row',
    alignSelf: 'center'
  }
});
