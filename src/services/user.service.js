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

//Company Page
const getCompanyAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get("http://172.27.76.46:8000/company/all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//Company Page By Id
const getCompanyContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(`http://172.27.76.46:8000/company/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//Post Company Data
const addCompanyContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch("http://172.27.76.46:8000/company/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//Edit Company Data
const editCompanyContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch("http://172.27.76.46:8000/company/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
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
  getCompanyContentById,
  getCompanyAllContent,
  addCompanyContent,
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
