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

export const getMinutesAgoTimestamp = (minuteago) => {
  // Get the current date and time
  var now = new Date();

  // Calculate the timestamp of 35 minutes ago
  var MinutesAgo = new Date(now.getTime() - minuteago * 60 * 1000);

  // Return the timestamp
  return MinutesAgo.getTime();
};

export const showRelativeTime = (timestamp) => {
  // Get the current timestamp
  var now = new Date().getTime();

  // Calculate the difference in milliseconds
  var difference = now - timestamp;

  // Convert the difference to minutes
  var minutes = Math.floor(difference / (60 * 1000));

  // Convert the difference to hours
  var hours = Math.floor(difference / (60 * 60 * 1000));

  // Convert the difference to days
  var days = Math.floor(difference / (24 * 60 * 60 * 1000));

  // Determine the appropriate relative time format
  if (minutes < 1) {
    return 'Just now';
  } else if (minutes < 60) {
    return minutes + ' minute(s) ago';
  } else if (hours < 24) {
    return hours + ' hour(s) ago';
  } else {
    return days + ' day(s) ago';
  }
};

export const formatTimestampToVietnamese = (timestamp) => {
  var options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: '2-digit'
  };

  var formattedDate = new Intl.DateTimeFormat('vi-VN', options).format(
    timestamp
  );

  // Adjust the format to match the provided example ('T5, 18 Thg 01 24')
  var parts = formattedDate.split(' ');

  // Add the 'T' prefix and adjust the month format
  return (
    'T' +
    parts[1] +
    ' ' +
    parts[2] +
    ' ' +
    parts[3] +
    ' ' +
    parts[4] +
    ' ' +
    parts[5]
  );
};
