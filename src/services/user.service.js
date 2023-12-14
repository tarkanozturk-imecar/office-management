import axios from "axios";
import api from "./api";

//User Page
const getUserAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get("http://172.27.76.46:8000/user/all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//Role Page
const getRoleAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get("http://172.27.76.46:8000/role/all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//Profile Data
const getUserContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get("http://172.27.76.46:8000/user/me/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//Filtered Modules for Navbar
const getUserPermission = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get("http://172.27.76.46:8000/user/me/?mode=2", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

const getUserModules = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get("http://172.27.76.46:8000/module/all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

const getModeratorBoard = () => {
  return api.get("/test/mod");
};

const getAdminBoard = () => {
  return api.get("/test/admin");
};

const UserService = {
  getUserAllContent,
  getRoleAllContent,
  getUserContent,
  getModeratorBoard,
  getAdminBoard,
  getUserModules,
  getUserPermission,
};

export default UserService;

/* import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://172.27.76.46:8000";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserContent = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserContent,
  getModeratorBoard,
  getAdminBoard,
}; */
