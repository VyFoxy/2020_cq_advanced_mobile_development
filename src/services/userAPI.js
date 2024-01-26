import api from './api';
const PATH = {
  USER_INFO: '/user/info',
  BECOME_TEACHER: '/tutor/register',
  UPLOAD_AVATAR: '/user/uploadAvatar'
};
export const getUserInfo = async () => {
  try {
    const response = await api.get(PATH.USER_INFO);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

export const updateUser = async (data) => {
  try {
    const response = await api.put(PATH.USER_INFO, data);
    return response;
  } catch (error) {
    throw Error(error);
  }
};

export const becomeTeacher = async (data) => {
  try {
    const response = await api.post('/tutor/register', data, {
      headers: {
        'Content-Type': 'apllication/json'
      }
    });
    return response;
  } catch (error) {
    throw Error(error);
  }
};

export const uploadAvatar = async (data) => {
  try {
    const response = await api.post(PATH.UPLOAD_AVATAR, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    throw Error(error);
  }
};
