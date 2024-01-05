import axios from "axios";

import api from "./api";
import TokenService from "./token.service";

const API_URL = "http://172.27.76.46:8000";

const register = (username, email, password) => {
  return api.post("/auth/signup", {
    username,
    email,
    password,
  });
};

const login = (username, password, client_id) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("client_id", client_id);
  return axios
    .post(API_URL + "/login/", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => {
      if (response.data) {
        console.log(response.data);
        TokenService.setUser(response.data);
        const token = TokenService.getLocalAccessToken();
        console.log(token);
        /* localStorage.setItem("user", JSON.stringify(response.data)); */
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
  /* localStorage.removeItem("user"); */
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
