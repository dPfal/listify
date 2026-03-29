import axios from "axios";

const API = axios.create({
  baseURL: "http://13.236.165.184:5001/api",
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
