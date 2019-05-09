import axios from "axios";

const request = axios.create({
  baseURL: `${process.env.REACT_APP_API}`
});

request.interceptors.request.use(config => {
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

export default request;
