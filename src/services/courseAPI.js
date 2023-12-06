import api from './api';
const PATH = {
  GET_COURSE: '/course',
  TOTAL: '/call/total'
};
export const getListCourse = async ({ page, search }) => {
  try {
    if (search) {
      const response = await api.get(
        PATH.GET_COURSE + `?page=${page}&size=10&q=${search}`
      );
      return response;
    } else {
      const response = await api.get(PATH.GET_COURSE + `?page=${page}&size=6`);
      return response;
    }
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};
export const getTotalCourse = async () => {
  try {
    const response = await api.get(PATH.TOTAL);
    return response.data.total;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};
