const getStringDate = (obj, str) => {
  let dd = (obj.getDate() < 10 ? "0" : "") + obj.getDate();
  let MM = (obj.getMonth() + 1 < 10 ? "0" : "") + (obj.getMonth() + 1);
  let yyyy = obj.getFullYear();

  return `${dd}${str}${MM}${str}${yyyy}`;
};

const getFormattedDate = (obj, h, m, s) => {
  let date = new Date(obj.getTime());
  date.setHours(h, m, s);
  return date;
};

export { getStringDate, getFormattedDate };
