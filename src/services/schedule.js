import api from './api';
const PATH = {
  GET_SCHEDULE: '/schedule/'
};
export async function getSchedule({ tutorId, page }) {
  try {
    const res = await api.get(PATH.GET_SCHEDULE, {
      params: {
        tutorId: tutorId,
        page: page
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}
