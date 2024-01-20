import moment from 'moment';

export const getAllLabels = ({ startDate, toDate }) => {
  let _startDate = moment(startDate * 1000);
  let _toDate = moment(toDate * 1000);
  let tmp = _startDate.clone();
  let listDates = [];
  while (tmp.isSameOrBefore(_toDate)) {
    listDates.push({
      label: tmp.format('DD')
    });
    tmp.add(1, 'd');
  }

  return listDates;
};
export function getTimeForFilter() {
  let toTime = 0;
  let fromTime = 0;
  fromTime = moment().startOf('week').unix();
  toTime = moment().endOf('week').unix();
  return {
    fromTime,
    toTime,
    labels: getAllLabels({ startDate: fromTime, toDate: toTime })
  };
}

export const formatTimestampToTimeZone = (timestamp) => {
  const date = new Date(timestamp);

  // Format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat('vi-VN', {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh'
  }).format(date);

  return formattedDate;
};

export const getDayOfWeek = () => {
  const currentDate = new Date();
  const dayIndex = currentDate.getDay();
  return dayIndex;
};
