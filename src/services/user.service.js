import axios from "axios";
import api from "./api";
import { Endpoints } from "../enums/endpoints";

//Profile Page
const getProfileContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get("http://testlab.imecar.com:8082/user/me/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

/* -------------------------------------------------------------- */

//POST Image Upload
const uploadImageContent = (bodyData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.IMAGEUPLOAD, {
    method: "POST",
    body: bodyData,
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

//User Page Pagination
const getUserPagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.USER +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    }
  );
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

//Source Page
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

//Source Page Pagination
const getSourcePagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.SOURCE +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    }
  );
};

//Source Page GET By Id
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

//DELETE Source Data
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

//POST Source Data
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

//EDIT Source Data
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

//Tenant Page
const getTenantAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get(Endpoints.TENANT + "all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//Tenant Page Pagination
const getTenantPagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.TENANT +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    }
  );
};

//DELETE Tenant Data
const deleteTenantContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.TENANT + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//Tenant Page GET By Id
const getTenantContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.TENANT + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST Tenant Data
const addTenantContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.TENANT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT Tenant Data
const editTenantContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.TENANT + `${id}`, {
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

//Company Page Pagination
const getCompanyPagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.COMPANY +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    }
  );
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

//Permission Page
const getPermissionAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get(Endpoints.PERMISSION + "all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//Permission Page Pagination
const getPermissionPagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.PERMISSION +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    }
  );
};

//Permission Page GET By Id
const getPermissionContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.PERMISSION + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DELETE Permission Data
const deletePermissionContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.PERMISSION + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST Permission Data
const addPermissionContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.PERMISSION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT Permission Data
const editPermissionContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.PERMISSION + `${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

/* ------------------------------------------------------------------------- */

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

//Role Page Pagination
const getRolePagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.ROLE +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    }
  );
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

//Department Page
const getDepartmentAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get(Endpoints.DEPARTMENT + "all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//Department Page Pagination
const getDepartmentPagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.DEPARTMENT +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    }
  );
};

//Department Page GET By Id
const getDepartmentContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.DEPARTMENT + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DELETE Department Data
const deleteDepartmentContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.DEPARTMENT + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST Department Data
const addDepartmentContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.DEPARTMENT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT Department Data
const editDepartmentContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.DEPARTMENT + `${id}`, {
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

//UserDetail Page
const getUserDetailAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get(Endpoints.USERDETAIL + "all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//UserDetail Page Pagination
const getUserDetailPagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.USERDETAIL +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    }
  );
};

//UserDetail Page GET By Id
const getUserDetailContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.USERDETAIL + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DELETE UserDetail Data
const deleteUserDetailContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.USERDETAIL + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST UserDetail Data
const addUserDetailContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.USERDETAIL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT UserDetail Data
const editUserDetailContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.USERDETAIL + `${id}`, {
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

//Calendar Page
const getCalendarAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get(Endpoints.CALENDAR + "all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//Calendar Page Pagination
const getCalendarPagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.CALENDAR +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    }
  );
};

//Calendar Page GET By Id
const getCalendarContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.CALENDAR + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DELETE Calendar Data
const deleteCalendarContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.CALENDAR + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST Calendar Data
const addCalendarContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.CALENDAR, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT Calendar Data
const editCalendarContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.CALENDAR + `${id}`, {
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

//SocialFlow Page
const getSocialFlowAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get(Endpoints.SOCIALFLOW + "all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//SocialFlow Page Pagination
const getSocialFlowPagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.SOCIALFLOW +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    }
  );
};

//DELETE SocialFlow Data
const deleteSocialFlowContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SOCIALFLOW + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//SocialFlow Page GET By Id
const getSocialFlowContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SOCIALFLOW + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST SocialFlow Data
const addSocialFlowContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SOCIALFLOW, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT SocialFlow Data
const editSocialFlowContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SOCIALFLOW + `${id}`, {
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

//SocialFlowType Page
const getSocialFlowTypeAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get(Endpoints.SOCIALFLOWTYPE + "all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//SocialFlowType Page Pagination
const getSocialFlowTypePagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.SOCIALFLOWTYPE +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    }
  );
};

//DELETE SocialFlowType Data
const deleteSocialFlowTypeContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SOCIALFLOWTYPE + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//SocialFlowType Page GET By Id
const getSocialFlowTypeContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SOCIALFLOWTYPE + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST SocialFlowType Data
const addSocialFlowTypeContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SOCIALFLOWTYPE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT SocialFlowType Data
const editSocialFlowTypeContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SOCIALFLOWTYPE + `${id}`, {
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

//FormType Page
const getFormTypeAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get(Endpoints.FORMTYPE + "all/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//FormType Page Pagination
const getFormTypePagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.FORMTYPE +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    }
  );
};

//FormType Page GET By Id
const getFormTypeContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.FORMTYPE + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DELETE FormType Data
const deleteFormTypeContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.FORMTYPE + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST FormType Data
const addFormTypeContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.FORMTYPE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT FormType Data
const editFormTypeContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.FORMTYPE + `${id}`, {
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
  getUserPagination,
  getUserContentById,
  addUserContent,
  editUserContent,
  deleteUserContent,

  uploadImageContent,

  getSourceAllContent,
  getSourcePagination,
  getSourceContentById,
  deleteSourceContent,
  addSourceContent,
  editSourceContent,

  getTenantAllContent,
  getTenantPagination,
  getTenantContentById,
  addTenantContent,
  editTenantContent,
  deleteTenantContent,

  getCompanyAllContent,
  getCompanyPagination,
  getCompanyContentById,
  addCompanyContent,
  editCompanyContent,
  deleteCompanyContent,

  getPermissionAllContent,
  getPermissionPagination,
  getPermissionContentById,
  addPermissionContent,
  editPermissionContent,
  deletePermissionContent,

  getRoleAllContent,
  getRoleContentById,
  getRolePagination,
  deleteRoleContent,
  addRoleContent,
  editRoleContent,

  getDepartmentAllContent,
  getDepartmentContentById,
  getDepartmentPagination,
  deleteDepartmentContent,
  addDepartmentContent,
  editDepartmentContent,

  getUserDetailAllContent,
  getUserDetailContentById,
  getUserDetailPagination,
  deleteUserDetailContent,
  addUserDetailContent,
  editUserDetailContent,

  getCalendarAllContent,
  getCalendarContentById,
  getCalendarPagination,
  deleteCalendarContent,
  addCalendarContent,
  editCalendarContent,

  getSocialFlowAllContent,
  getSocialFlowContentById,
  getSocialFlowPagination,
  deleteSocialFlowContent,
  addSocialFlowContent,
  editSocialFlowContent,

  getSocialFlowTypeAllContent,
  getSocialFlowTypeContentById,
  getSocialFlowTypePagination,
  deleteSocialFlowTypeContent,
  addSocialFlowTypeContent,
  editSocialFlowTypeContent,

  getFormTypeAllContent,
  getFormTypeContentById,
  getFormTypePagination,
  deleteFormTypeContent,
  addFormTypeContent,
  editFormTypeContent,

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
