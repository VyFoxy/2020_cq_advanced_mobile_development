import React, { useState, useContext, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleLoginAuth, login } from '../../services/authentication';
import AuthContext from '../../context/AuthContext';
import { Login } from '../../services/authentication';
WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = () => {
  const { setAuth } = useContext(AuthContext);
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState(null);
  const [emailError, setemailError] = useState('');
  const [loginError, setloginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      '237722397720-hkdm7tjfm427d97fnv5d9dqbrh8pgknb.apps.googleusercontent.com',
    androidClientId:
      '237722397720-49fdld1mvtihjsg044gjlheljmhgfdru.apps.googleusercontent.com'
  });
  useEffect(() => {
    async function getAccessToken() {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        navigation.navigate(ROUTES.HOME);
      }
    }
    getAccessToken();
  }, []);

  useEffect(() => {
    async function ggLogin() {
      if (response?.type === 'success') {
        const { authentication } = response;
        if (authentication?.accessToken) {
          const response = await googleLoginAuth({
            accessToken: authentication.accessToken
          });
          setAuth(response.data);
          navigation.navigate(ROUTES.HOME);
        }
      }
    }
    ggLogin();
  }, [accessToken, response]);

  const handleLogin = async () => {
    setemailError('');
    setPasswordError('');
    setloginError('');
    if (username === '') setemailError('Email không được để trống');
    else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(username) === false) setemailError('Email không đúng');
    }
    if (password === '') setPasswordError('Mật khẩu không được để trống');

    if (
      emailError === '' &&
      passwordError === '' &&
      username !== '' &&
      password !== ''
    ) {
      try {
        const response = await Login({ email: username, password: password });
        if (response.data) {
          setAuth(response.data);

          navigation.navigate(ROUTES.HOME);
        } else {
          setloginError('Đăng nhập thất bại');
        }
      } catch (error) {
        console.log(error);

        setloginError('Đăng nhập thất bại');
      }
    }
  };

  const googleLogin = () => {
    promptAsync();
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
            <Text style={styles.loginText}> Đăng nhập </Text>
            <View style={styles.loginArea}>
              <Text style={styles.textIntro}>
                Phát triển kỹ năng tiếng Anh nhanh nhất bằng cách học 1 kèm 1
                trực tuyến theo mục tiêu và lộ trình dành cho riêng bạn
              </Text>
              <View style={styles.formLogin}>
                <Text style={styles.label}>ĐỊA CHỈ EMAIL</Text>
                <TextInput
                  style={styles.input}
                  placeholder='mail@example.com'
                  value={username}
                  onChangeText={setUsername}
                />
                {emailError !== '' && (
                  <Text style={styles.error}>{emailError}</Text>
                )}
                <Text style={styles.label}>MẬT KHẨU</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  name='password'
                  label='MẬT KHẨU '
                  secureTextEntry={passwordVisible}
                  right={
                    <TextInput.Icon
                      icon={passwordVisible ? 'eye' : 'eye-off'}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                  }
                />
                {passwordError !== '' && (
                  <Text style={styles.error}>{passwordError}</Text>
                )}
                <TouchableOpacity
                  style={styles.forgotPass}
                  onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
                >
                  <Text style={styles.forgotPassText}> Quên mật khẩu? </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                >
                  <Text style={styles.loginButtonText}> ĐĂNG NHẬP </Text>
                </TouchableOpacity>
                {loginError !== '' && (
                  <Text style={styles.error}>{loginError}</Text>
                )}
              </View>

              <View style={styles.otherLogin}>
                <Text>Hoặc tiếp tục với</Text>
                <View style={styles.otherLoginIcons}>
                  <TouchableOpacity style={styles.otherLoginIcon}>
                    <Image
                      style={styles.flagIcon}
                      source={
                        'https://sandbox.app.lettutor.com/static/media/facebook-logo.3bac8064.svg'
                      }
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.otherLoginIcon}
                    onPress={() => googleLogin()}
                  >
                    <Image
                      style={styles.flagIcon}
                      source={
                        'https://sandbox.app.lettutor.com/static/media/google-logo.5f53496e.svg'
                      }
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.registerText}>
                  <Text>Chưa có tài khoản? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.REGISTER)}
                  >
                    <Text style={styles.forgotPassText}>Đăng ký</Text>
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
    borderColor: COLORS.grayLight,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    height: 40
  },
  label: { marginBottom: 10, color: '#A4B0BE', marginTop: 20 },
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
    borderColor: COLORS.primary,
    alignItems: 'center'
  },
  registerText: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  flagIcon: {
    opacity: 1,
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: 'hidden'
  }
});
