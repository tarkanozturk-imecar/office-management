import axios from "axios";
import api from "./api";
import { Endpoints } from "../enums/endpoints";

const getUserAccessToken = () =>
  JSON.parse(localStorage.getItem("user")).access_token;

const makeApiRequest = (url, method, bodyData) => {
  const userAccessToken = getUserAccessToken();

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${userAccessToken}`,
  };

  // Check if the method is "GET" and set the body accordingly
  const requestBody = method === "GET" ? undefined : [JSON.stringify(bodyData)];

  return fetch(url, {
    method,
    headers,
    body: requestBody,
  });
};

//Profile Page
const getProfileContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.get(Endpoints.USERME, {
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
const getUserAllContent = () =>
  makeApiRequest(Endpoints.USER + "all/", "POST", []);

const getUserPagination = (
  currentPage,
  pageLength,
  orderDirection,
  orderByColumnName,
  filterBody
) => {
  const url =
    Endpoints.USER +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${orderDirection}&order_field=${orderByColumnName}`;

  // Use JSON.stringify(filterBody) if filterBody exists, otherwise, use '[]'
  const requestBody = filterBody ? filterBody : [];

  return makeApiRequest(url, "POST", requestBody);
};

const getUserContentById = (id) =>
  makeApiRequest(Endpoints.USER + `${id}`, "GET");

const deleteUserContent = (id) =>
  makeApiRequest(Endpoints.USER + `${id}`, "DELETE");

const addUserContent = (values) =>
  makeApiRequest(Endpoints.USER, "POST", values);

const editUserContent = (id, values) =>
  makeApiRequest(Endpoints.USER + `${id}`, "PUT", values);

/* -------------------------------------------------------------- */

// Source Page
const getSourceAllContent = () =>
  makeApiRequest(Endpoints.SOURCE + "all/", "POST", []);

const getSourcePagination = (
  currentPage,
  pageLength,
  orderDirection,
  orderByColumnName,
  filterBody
) => {
  const url =
    Endpoints.SOURCE +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${orderDirection}&order_field=${orderByColumnName}`;

  // Use JSON.stringify(filterBody) if filterBody exists, otherwise, use '[]'
  const requestBody = filterBody ? filterBody : [];

  return makeApiRequest(url, "POST", requestBody);
};

const getSourceContentById = (id) =>
  makeApiRequest(Endpoints.SOURCE + `${id}`, "GET");

const deleteSourceContent = (id) =>
  makeApiRequest(Endpoints.SOURCE + `${id}`, "DELETE");

const addSourceContent = (values) =>
  makeApiRequest(Endpoints.SOURCE, "POST", values);

const editSourceContent = (id, values) =>
  makeApiRequest(Endpoints.SOURCE + `${id}`, "PUT", values);

/* -------------------------------------------------------------- */

//Tenant Page
const getTenantAllContent = () =>
  makeApiRequest(Endpoints.TENANT + "all/", "POST", []);

const getTenantPagination = (
  currentPage,
  pageLength,
  orderDirection,
  orderByColumnName,
  filterBody
) => {
  const url =
    Endpoints.TENANT +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${orderDirection}&order_field=${orderByColumnName}`;

  // Use JSON.stringify(filterBody) if filterBody exists, otherwise, use '[]'
  const requestBody = filterBody ? filterBody : [];

  return makeApiRequest(url, "POST", requestBody);
};

const getTenantContentById = (id) =>
  makeApiRequest(Endpoints.TENANT + `${id}`, "GET");

const deleteTenantContent = (id) =>
  makeApiRequest(Endpoints.TENANT + `${id}`, "DELETE");

const addTenantContent = (values) =>
  makeApiRequest(Endpoints.TENANT, "POST", values);

const editTenantContent = (id, values) =>
  makeApiRequest(Endpoints.TENANT + `${id}`, "PUT", values);

/* -------------------------------------------------------------- */

//Company Page
const getCompanyAllContent = () =>
  makeApiRequest(Endpoints.COMPANY + "all/", "POST", []);

const getCompanyPagination = (
  currentPage,
  pageLength,
  orderDirection,
  orderByColumnName,
  filterBody
) => {
  const url =
    Endpoints.COMPANY +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${orderDirection}&order_field=${orderByColumnName}`;

  // Use JSON.stringify(filterBody) if filterBody exists, otherwise, use '[]'
  const requestBody = filterBody ? filterBody : [];

  return makeApiRequest(url, "POST", requestBody);
};

const getCompanyContentById = (id) =>
  makeApiRequest(Endpoints.COMPANY + `${id}`, "GET");

const deleteCompanyContent = (id) =>
  makeApiRequest(Endpoints.COMPANY + `${id}`, "DELETE");

const addCompanyContent = (values) =>
  makeApiRequest(Endpoints.COMPANY, "POST", values);

const editCompanyContent = (id, values) =>
  makeApiRequest(Endpoints.COMPANY + `${id}`, "PUT", values);

/* -------------------------------------------------------------- */

//Permission Page
const getPermissionAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.post(Endpoints.PERMISSION + "all/", [], {
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: [],
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
const getRoleAllContent = () =>
  makeApiRequest(Endpoints.ROLE + "all/", "POST", []);

const getRolePagination = (
  currentPage,
  pageLength,
  orderDirection,
  orderByColumnName,
  filterBody
) => {
  const url =
    Endpoints.ROLE +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${orderDirection}&order_field=${orderByColumnName}`;

  // Use JSON.stringify(filterBody) if filterBody exists, otherwise, use '[]'
  const requestBody = filterBody ? filterBody : [];

  return makeApiRequest(url, "POST", requestBody);
};

const getRoleContentById = (id) =>
  makeApiRequest(Endpoints.ROLE + `${id}`, "GET");

const deleteRoleContent = (id) =>
  makeApiRequest(Endpoints.ROLE + `${id}`, "DELETE");

const addRoleContent = (values) =>
  makeApiRequest(Endpoints.ROLE, "POST", values);

const editRoleContent = (id, values) =>
  makeApiRequest(Endpoints.ROLE + `${id}`, "PUT", values);

/* -------------------------------------------------------------- */

//Department Page
const getDepartmentAllContent = () =>
  makeApiRequest(Endpoints.DEPARTMENT + "all/", "POST", []);

const getDepartmentPagination = (
  currentPage,
  pageLength,
  orderDirection,
  orderByColumnName,
  filterBody
) => {
  const url =
    Endpoints.DEPARTMENT +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${orderDirection}&order_field=${orderByColumnName}`;

  // Use JSON.stringify(filterBody) if filterBody exists, otherwise, use '[]'
  const requestBody = filterBody ? filterBody : [];

  return makeApiRequest(url, "POST", requestBody);
};

const getDepartmentContentById = (id) =>
  makeApiRequest(Endpoints.DEPARTMENT + `${id}`, "GET");

const deleteDepartmentContent = (id) =>
  makeApiRequest(Endpoints.DEPARTMENT + `${id}`, "DELETE");

const addDepartmentContent = (values) =>
  makeApiRequest(Endpoints.DEPARTMENT, "POST", values);

const editDepartmentContent = (id, values) =>
  makeApiRequest(Endpoints.DEPARTMENT + `${id}`, "PUT", values);

/* -------------------------------------------------------------- */

//UserDetail Page
const getUserDetailAllContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("ID : ", id);
  //console.log(user.access_token);
  return fetch(Endpoints.USERDETAIL + `user/${id}`, {
    method: "GET",
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: [],
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
  return axios.post(Endpoints.CALENDAR + "all/?page_length=100", [], {
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: [],
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
const getSocialFlowAllContent = () =>
  makeApiRequest(Endpoints.SOCIALFLOW + "all/", "POST", []);

const getSocialFlowPagination = (
  currentPage,
  pageLength,
  orderDirection,
  orderByColumnName,
  filterBody
) => {
  const url =
    Endpoints.SOCIALFLOW +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${orderDirection}&order_field=${orderByColumnName}`;

  // Use JSON.stringify(filterBody) if filterBody exists, otherwise, use '[]'
  const requestBody = filterBody ? filterBody : [];

  return makeApiRequest(url, "POST", requestBody);
};

const getSocialFlowContentById = (id) =>
  makeApiRequest(Endpoints.SOCIALFLOW + `${id}`, "GET");

const deleteSocialFlowContent = (id) =>
  makeApiRequest(Endpoints.SOCIALFLOW + `${id}`, "DELETE");

const addSocialFlowContent = (values) =>
  makeApiRequest(Endpoints.SOCIALFLOW, "POST", values);

const editSocialFlowContent = (id, values) =>
  makeApiRequest(Endpoints.SOCIALFLOW + `${id}`, "PUT", values);

/* -------------------------------------------------------------- */

//SocialFlowType Page
const getSocialFlowTypeAllContent = () =>
  makeApiRequest(Endpoints.SOCIALFLOWTYPE + "all/", "POST", []);

const getSocialFlowTypePagination = (
  currentPage,
  pageLength,
  orderDirection,
  orderByColumnName,
  filterBody
) => {
  const url =
    Endpoints.SOCIALFLOWTYPE +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${orderDirection}&order_field=${orderByColumnName}`;

  // Use JSON.stringify(filterBody) if filterBody exists, otherwise, use '[]'
  const requestBody = filterBody ? filterBody : [];

  return makeApiRequest(url, "POST", requestBody);
};

const getSocialFlowTypeContentById = (id) =>
  makeApiRequest(Endpoints.SOCIALFLOWTYPE + `${id}`, "GET");

const deleteSocialFlowTypeContent = (id) =>
  makeApiRequest(Endpoints.SOCIALFLOWTYPE + `${id}`, "DELETE");

const addSocialFlowTypeContent = (values) =>
  makeApiRequest(Endpoints.SOCIALFLOWTYPE, "POST", values);

const editSocialFlowTypeContent = (id, values) =>
  makeApiRequest(Endpoints.SOCIALFLOWTYPE + `${id}`, "PUT", values);

/* -------------------------------------------------------------- */

//Form Page
const getFormAllContent = () =>
  makeApiRequest(Endpoints.FORM + "all/", "POST", []);

const getFormPagination = (
  currentPage,
  pageLength,
  orderDirection,
  orderByColumnName,
  filterBody
) => {
  const url =
    Endpoints.FORM +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${orderDirection}&order_field=${orderByColumnName}`;

  // Use JSON.stringify(filterBody) if filterBody exists, otherwise, use '[]'
  const requestBody = filterBody ? filterBody : [];

  return makeApiRequest(url, "POST", requestBody);
};

const getFormContentById = (id) =>
  makeApiRequest(Endpoints.FORM + `${id}`, "GET");

const deleteFormContent = (id) =>
  makeApiRequest(Endpoints.FORM + `${id}`, "DELETE");

const addFormContent = (values) =>
  makeApiRequest(Endpoints.FORM, "POST", values);

const editFormContent = (id, values) =>
  makeApiRequest(Endpoints.FORM + `${id}`, "PUT", values);

/* -------------------------------------------------------------- */

//ScoreDetail Page
const getScoreDetailAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.post(Endpoints.SCOREDETAIL + "all/", [], {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//ScoreDetail Page Pagination
const getScoreDetailPagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.SCOREDETAIL +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: [],
    }
  );
};

//ScoreDetail Page GET By Id
const getScoreDetailContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SCOREDETAIL + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DELETE ScoreDetail Data
const deleteScoreDetailContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SCOREDETAIL + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST ScoreDetail Data
const addScoreDetailContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SCOREDETAIL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT ScoreDetail Data
const editScoreDetailContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.SCOREDETAIL, {
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
  return axios.post(Endpoints.FORMTYPE + "all/", [], {
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: [],
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

//DebitVoucher Page
const getDebitVoucherAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.post(Endpoints.DEBITVOUCHER + "all/", [], {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DebitVoucher Page Pagination
const getDebitVoucherPagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.DEBITVOUCHER +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: [],
    }
  );
};

//DebitVoucher Page GET By Id
const getDebitVoucherContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.DEBITVOUCHER + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DELETE DebitVoucher Data
const deleteDebitVoucherContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.DEBITVOUCHER + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST DebitVoucher Data
const addDebitVoucherContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.DEBITVOUCHER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT DebitVoucher Data
const editDebitVoucherContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.DEBITVOUCHER + `${id}`, {
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

//DebitRequest Page
const getDebitRequestAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.post(Endpoints.DEBITREQUEST + "all/", [], {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DebitRequest Page Pagination
const getDebitRequestPagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.DEBITREQUEST +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: [],
    }
  );
};

//DebitRequest Page GET By Id
const getDebitRequestContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.DEBITREQUEST + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DELETE DebitRequest Data
const deleteDebitRequestContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.DEBITREQUEST + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST DebitRequest Data
const addDebitRequestContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.DEBITREQUEST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT DebitRequest Data
const editDebitRequestContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.DEBITREQUEST + `${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//CANCEL DebitRequest Data
const cancelDebitRequestContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.DEBITREQUEST + `cancel-req/` + `${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//RESPONSE DebitRequest Data
const responseDebitRequestContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.DEBITREQUEST + `response-req/` + `${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

/* -------------------------------------------------------------- */

//CalendarType Page
const getCalendarTypeAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.post(Endpoints.CALENDARTYPE + "all/", [], {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//CalendarType Page Pagination
const getCalendarTypePagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.CALENDARTYPE +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: [],
    }
  );
};

//CalendarType Page GET By Id
const getCalendarTypeContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.CALENDARTYPE + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DELETE CalendarType Data
const deleteCalendarTypeContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.CALENDARTYPE + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST CalendarType Data
const addCalendarTypeContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.CALENDARTYPE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT CalendarType Data
const editCalendarTypeContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.CALENDARTYPE + `${id}`, {
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

//Report Page
const getReportAllContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return axios.post(Endpoints.REPORT + "all/", [], {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//Report Page Pagination
const getReportPagination = (currentPage, pageLength) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(
    Endpoints.REPORT +
      `all/?page_number=${currentPage}&page_length=${pageLength}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: [],
    }
  );
};

//Report Page GET By Id
const getReportContentById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.REPORT + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//DELETE Report Data
const deleteReportContent = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.REPORT + `${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
};

//POST Report Data
const addReportContent = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.REPORT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(values),
  });
};

//EDIT Report Data
const editReportContent = (id, values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.access_token);
  return fetch(Endpoints.REPORT + `${id}`, {
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
  return axios.post(Endpoints.MODULE + `all/`, [], {
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

  getFormAllContent,
  getFormContentById,
  getFormPagination,
  deleteFormContent,
  addFormContent,
  editFormContent,

  getDebitVoucherAllContent,
  getDebitVoucherContentById,
  getDebitVoucherPagination,
  deleteDebitVoucherContent,
  addDebitVoucherContent,
  editDebitVoucherContent,

  getDebitRequestAllContent,
  getDebitRequestContentById,
  getDebitRequestPagination,
  deleteDebitRequestContent,
  addDebitRequestContent,
  editDebitRequestContent,
  cancelDebitRequestContent,
  responseDebitRequestContent,

  getScoreDetailAllContent,
  getScoreDetailContentById,
  getScoreDetailPagination,
  deleteScoreDetailContent,
  addScoreDetailContent,
  editScoreDetailContent,

  getFormTypeAllContent,
  getFormTypeContentById,
  getFormTypePagination,
  deleteFormTypeContent,
  addFormTypeContent,
  editFormTypeContent,

  getCalendarTypeAllContent,
  getCalendarTypeContentById,
  getCalendarTypePagination,
  deleteCalendarTypeContent,
  addCalendarTypeContent,
  editCalendarTypeContent,

  getReportAllContent,
  getReportContentById,
  getReportPagination,
  deleteReportContent,
  addReportContent,
  editReportContent,

  getProfileContent,
  getModeratorBoard,
  getAdminBoard,
  getUserModules,
  getUserPermission,
};

export default UserService;

/* import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://testlab.imecar.com:8082";

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
