import api from "./axios";

export const register = async (payload) => {
  const response = await api.post("/users", payload);
  return response;
};

export const login = async (payload) => {
  const response = await api.post("/users/token", payload);
  return response;
};

export const logout = () => {
  localStorage.removeItem('token')
}

export const getAllUser = async (status='')=>{
  const response = await api.get(`/users/getAll?`,{
    params:{ status }
  });
  return response.data
}
export const updateUserStatus = async (user_id,user_status)=>{
  const response = await api.put(`/users/${user_id}/${user_status}`);
  return response.data
}


export const getCurrentUser = async () => {
  const res = await api.get("/users/me");
  return res.data;
};