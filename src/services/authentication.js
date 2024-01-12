import api from './api';
const PATH = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  GOOGLE_LOGIN: '/auth/google',
  FACEBOOK_LOGIN: '/auth/facebook',
  FORGOT_PASSWORD: '/user/forgotPassword'
};
export const Login = async ({ email, password }) => {
  try {
    const response = await api.post(PATH.LOGIN, { email, password });
    return response;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};
export const Register = async ({ email, password }) => {
  try {
    const response = await api.post(PATH.REGISTER, { email, password });
    console.log({ email, password }, 'response');
    return response;
  } catch (error) {
    throw Error(error);
  }
};

export const ForgotPassword = async ({ email }) => {
  try {
    const response = await api.post(PATH.FORGOT_PASSWORD, { email });
    return response;
  } catch (error) {
    throw Error(error);
  }
};

export const GoogleLoginAuth = async ({ accessToken }) => {
  try {
    const response = await api.post(PATH.GOOGLE_LOGIN, {
      access_token: accessToken
    });
    return response;
  } catch (error) {
    console.log(error.data);
    throw Error(error);
  }
};

export const FacebookLoginAuth = async ({ accessToken }) => {
  try {
    const response = await api.post(PATH.FACEBOOK_LOGIN, {
      access_token: accessToken
    });
    return response;
  } catch (error) {
    console.log(error.data);
    throw Error(error);
  }
};
