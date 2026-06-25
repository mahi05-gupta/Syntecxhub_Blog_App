import api from "./api";
import { TOKEN_KEY } from "../utils/constants";

// REGISTER
export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// LOGIN
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// LOGOUT (frontend only)
export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
};