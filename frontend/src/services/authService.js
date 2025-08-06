import api from "./api";

const login = async (email, senha) => {
  const response = await api.post("/login", { email, senha });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

export const authService = {
  login,
  logout,
};
