import api from "./api";

export const AuthLogin = async (data) => {
  const response = await api.post("/login-or-register", data);
  return response?.data;
};
export const AuthLogin1 = async (data) => {
  const response = await api.post("/login", data);
  return response?.data;
};
export const Loginout = async () => {
  const response = await api.post("/logout");
  return response;
};
export const Forget = async (body) => {
  const response = await api.post("/auth/reset_password", body);
  return response;
};
export const NewPassword = async (body) => {
  const response = await api.post("/auth/change_password", body);
  return response?.data;
};
