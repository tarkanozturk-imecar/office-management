import axios from "axios";
import api from "./api";
import { Endpoints } from "../enums/endpoints";

//Profile Page
const getProfileContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get("http://172.27.76.46:8000/user/me/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

/* -------------------------------------------------------------- */

//User Page
const getUserAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get(Endpoints.USER + "all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DELETE User Data
const deleteUserContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.USER + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//User Page GET By Id
const getUserContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.USER + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST User Data
const addUserContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.USER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT User Data
const editUserContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.USER + `${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

/* -------------------------------------------------------------- */

//Company Page
const getCompanyAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get(Endpoints.COMPANY + "all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//Company Page GET By Id
const getCompanyContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.COMPANY + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DELETE Company Data
const deleteCompanyContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.COMPANY + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST Company Data
const addCompanyContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.COMPANY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT Company Data
const editCompanyContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.COMPANY + `${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

/* -------------------------------------------------------------- */

//Role Page
const getRoleAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get(Endpoints.ROLE + "all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//Role Page GET By Id
const getRoleContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.ROLE + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DELETE Role Data
const deleteRoleContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.ROLE + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST Role Data
const addRoleContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.ROLE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT Role Data
const editRoleContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.ROLE + `${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

/* -------------------------------------------------------------- */

//Role Page
const getSourceAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get(Endpoints.SOURCE + "all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//Role Page GET By Id
const getSourceContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SOURCE + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DELETE Role Data
const deleteSourceContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SOURCE + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST Role Data
const addSourceContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SOURCE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT Role Data
const editSourceContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SOURCE + `${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

/* -------------------------------------------------------------- */

//Filtered Modules for Navbar
const getUserPermission = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get(Endpoints.USER + `me/?mode=2`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

/* -------------------------------------------------------------- */

const getUserModules = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get(Endpoints.MODULE + `all/`, {
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
  getUserContentById,
  addUserContent,
  editUserContent,
  deleteUserContent,

  getCompanyAllContent,
  getCompanyContentById,
  addCompanyContent,
  editCompanyContent,
  deleteCompanyContent,

  getRoleAllContent,
  getRoleContentById,
  deleteRoleContent,
  addRoleContent,
  editRoleContent,

  getSourceAllContent,
  getSourceContentById,
  deleteSourceContent,
  addSourceContent,
  editSourceContent,

  getProfileContent,
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
