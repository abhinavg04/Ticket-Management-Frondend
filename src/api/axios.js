import axios from "axios";
const BASE_URL = import.meta.env.VITE_DEPLOY_URL  

const api = axios.create({
  baseURL: BASE_URL,
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