import React, { useState } from 'react';
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
import { COLORS, ROUTES } from '../../constants';
import { Register } from '../../services/authentication';
import { ScrollView } from 'react-native';

export const RegisterScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [username, setUsername] = useState('');
  const [emailError, setemailError] = useState('');
  const [loginError, setloginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    setemailError('');
    setPasswordError('');
    setloginError('');
    if (username === '') setemailError('Email không được để trống');
    else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(username) === false) setemailError('Email không đúng');
    }
    if (password === '') setPasswordError('Mật khẩu không được để trống');

    if (emailError === '' && passwordError === '') {
      try {
        const response = await Register({
          email: username,
          password: password
        });
        navigation.navigate(ROUTES.LOGIN);
      } catch (error) {
        setloginError('Đăng ký thất bại');
      }
    }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
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
                />
                {passwordError !== '' && (
                  <Text style={styles.error}>{passwordError}</Text>
                )}
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleSignUp}
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
    marginTop: 20,
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
