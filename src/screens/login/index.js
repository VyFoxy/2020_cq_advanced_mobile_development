import React, { useState, useContext, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AuthContext from '../../context/AuthContext';
import { Login } from '../../services/authentication';
import LocalizationContext from '../../context/LocalizationProvider';
WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = () => {
  const { setAuth } = useContext(AuthContext);
  const { i18n } = useContext(LocalizationContext);
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
        navigation.navigate(ROUTES.HOME_DRAWER);
      }
    }
    getAccessToken();
  }, []);

  useEffect(() => {
    async function ggLogin() {
      if (response?.type === 'success') {
        const { authentication } = response;
        if (authentication?.accessToken) {
          try {
            const loginResponse = await googleLoginAuth({
              accessToken: authentication.accessToken
            });
            setAuth(loginResponse.data);
            navigation.navigate(ROUTES.HOME);
          } catch (error) {
            console.log(error);
            setloginError('Đăng nhập thất bại');
          }
        }
      }
    }

    ggLogin();
  }, [response?.type]);

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

          navigation.navigate(ROUTES.HOME_DRAWER);
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
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.authentication}>
          <View style={styles.content}>
            <Image
              source={require('../../../assets/img/login.8d01124a.png')}
              style={styles.image}
            />
            <Text style={styles.loginText}> {i18n.t('Login')} </Text>
            <View style={styles.loginArea}>
              <Text style={styles.textIntro}>{i18n.t('IntroLogin')}</Text>
              <View style={styles.formLogin}>
                <Text style={styles.label}>{i18n.t('Email')}</Text>
                <TextInput
                  style={styles.input}
                  placeholder='mail@example.com'
                  value={username || ''}
                  onChangeText={setUsername}
                />
                {emailError !== '' && (
                  <Text style={styles.error}>{emailError}</Text>
                )}
                <Text style={styles.label}>{i18n.t('Password')}</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  name='password'
                  label='MẬT KHẨU '
                  secureTextEntry={passwordVisible}
                />
                {passwordError !== '' && (
                  <Text style={styles.error}>{passwordError}</Text>
                )}
                <TouchableOpacity
                  style={styles.forgotPass}
                  onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
                >
                  <Text style={styles.forgotPassText}>
                    {i18n.t('ForgotPass')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                >
                  <Text style={styles.loginButtonText}>{i18n.t('LOGIN')}</Text>
                </TouchableOpacity>
                {loginError !== '' && (
                  <Text style={styles.error}>{loginError}</Text>
                )}
              </View>

              <View style={styles.otherLogin}>
                <Text>{i18n.t('OrContinueWith')}</Text>
                <View style={styles.otherLoginIcons}>
                  <TouchableOpacity style={styles.otherLoginIcon}>
                    <Image
                      style={styles.flagIcon}
                      source={require('../../../assets/img/facebookLogo.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.otherLoginIcon}
                    onPress={() => googleLogin()}
                  >
                    <Image
                      style={styles.flagIcon}
                      source={require('../../../assets/img/googleLogo.png')}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.registerText}>
                  <Text>{i18n.t('NotAMember')}</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.REGISTER)}
                  >
                    <Text style={styles.forgotPassText}>
                      {i18n.t('Register')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30
  },
  image: {
    width: 350,
    height: 350,
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
    height: 50,
    width: 50
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
