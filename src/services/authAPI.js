import api from './api';
const PATH = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  GOOGLE_LOGIN: '/auth/google',
  FORGOT_PASSWORD: '/user/forgotPassword'
};
export const login = async ({ email, password }) => {
  try {
    const response = await api.post(PATH.LOGIN, { email, password });
    return response;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};
export const register = async ({ email, password }) => {
  try {
    const response = await api.post(PATH.REGISTER, { email, password });
    return response;
  } catch (error) {
    throw Error(error);
  }
};

export const forgotPassword = async ({ email }) => {
  try {
    const response = await api.post(PATH.FORGOT_PASSWORD, { email });
    return response;
  } catch (error) {
    throw Error(error);
  }
};

export const googleLoginAuth = async ({ accessToken }) => {
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
