import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { COLORS, ROUTES } from '../../constants';

export const ForgotPassWordScreen = () => {
  const [mail, setMail] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [forgotPassState, setForgotPassState] = useState();
  const [successState, setSuccessState] = useState(false);

  const handleForgotPass = () => {
    setForgotPassState(null);
    if (email === '') setEmailError('Email không được để trống');
    else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(email) === false) setEmailError('Email không đúng');
    }

    if (emailError === '') {
      setSuccessState(true);
      //forgotPassword({ email });
      navigation.navigate(ROUTES.LOGIN);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đặt lại mật khẩu</Text>
      {!successState ? (
        <View>
          <Text style={styles.centerText}>
            Vui lòng nhập email để tìm kiếm tài khoản của bạn.
          </Text>
          <Text style={styles.leftText}>Email</Text>
          <TextInput
            value={mail}
            onChangeText={(e) => setMail(e.target.value)}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleForgotPass()}
          >
            <Text style={styles.loginButtonText}> Xác nhận </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.centerText}>
            Kiểm tra email của bạn để thực hiện thay đổi mật khẩu
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  header: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700'
  },
  centerText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14
  },
  leftText: {
    marginVertical: 10
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: 35,
    backgroundColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2
    },
    marginTop: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: 5,
    alignSelf: 'center'
  },
  loginButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15
  }
});
