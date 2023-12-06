import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://sandbox.api.lettutor.com'
});
api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      await AsyncStorage.removeItem('accessToken');
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export const refreshAccessToken = async () => {
  const refreshTokenFromStorage = await AsyncStorage.getItem('refreshToken');
  try {
    if (refreshTokenFromStorage) {
      const response = await api.post('/auth/access-token', {
        refreshToken: refreshTokenFromStorage,
        timezone: 7
      });
      const accessToken = response.data.tokens.access.token;
      return accessToken;
    } else {
      return null;
    }
  } catch (error) {
    AsyncStorage.removeItem('refreshToken');
    return null;
  }
};
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      const config = error?.config;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        await AsyncStorage.setItem('accessToken', newAccessToken);
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${newAccessToken}`
        };
      }
      return axios(config);
    }
    return Promise.reject(error);

    // return Promise.reject(error);
  }
);

export default api;
