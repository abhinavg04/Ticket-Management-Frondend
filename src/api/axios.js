import axios from "axios";
import { useNavigate } from "react-router";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token','');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      // just reject, DO NOT redirect
    }
    return Promise.reject(err);
  }
);



export default api;