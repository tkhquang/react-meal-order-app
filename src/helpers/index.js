const getStringDate = (obj, str) =>
  `${obj.getDate()}${str}${obj.getMonth() + 1}${str}${obj.getFullYear()}`;

const getFormattedDate = (obj, h, m, s) => {
  let date = new Date(obj.getTime());
  date.setHours(h, m, s);
  return date;
};

export { getStringDate, getFormattedDate };
