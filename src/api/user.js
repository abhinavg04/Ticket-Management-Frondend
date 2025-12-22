import api from "./axios";

export const register = async (payload) => {
  const response = await api.post("/users", payload);
  return response.data;
};

export const login = async (payload) => {
  const response = await api.post("/users/token", payload);
  return response;
};

export const logout = () => {
  localStorage.removeItem('token')
}

export const getAllUser = async ()=>{
  const response = await api.get("/users/getAll");
  return response.data
}


export const getCurrentUser = async () => {
  const res = await api.get("/users/me");
  return res.data;
};