import axios from "axios";
import api from "./api";
import { Endpoints } from "../enums/endpoints";

const makeApiRequest = (url, method, bodyData) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${user.access_token}`,
  };

  // Check if the method is "GET" and set the body accordingly
  const requestBody = method === "GET" ? undefined : [JSON.stringify(bodyData)];

  return fetch(url, {
    method,
    headers,
    body: requestBody ? requestBody : null,
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
  orderDirection = "asc", // Default value for orderDirection
  orderByColumnName = "defaultColumnName", // Default value for orderByColumnName
  filterBody
) => {
  // Override default values if provided values are present
  const direction = orderDirection ? orderDirection : "asc";
  const column = orderByColumnName ? orderByColumnName : "defaultColumnName";

  const url =
    Endpoints.USER +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${direction}&order_field=${column}`;

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
  orderDirection = "asc", // Default value for orderDirection
  orderByColumnName = "defaultColumnName", // Default value for orderByColumnName
  filterBody
) => {
  // Override default values if provided values are present
  const direction = orderDirection ? orderDirection : "asc";
  const column = orderByColumnName ? orderByColumnName : "defaultColumnName";

  const url =
    Endpoints.SOURCE +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${direction}&order_field=${column}`;

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
  orderDirection = "asc", // Default value for orderDirection
  orderByColumnName = "defaultColumnName", // Default value for orderByColumnName
  filterBody
) => {
  // Override default values if provided values are present
  const direction = orderDirection ? orderDirection : "asc";
  const column = orderByColumnName ? orderByColumnName : "defaultColumnName";

  const url =
    Endpoints.TENANT +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${direction}&order_field=${column}`;

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
  orderDirection = "asc", // Default value for orderDirection
  orderByColumnName = "defaultColumnName", // Default value for orderByColumnName
  filterBody
) => {
  // Override default values if provided values are present
  const direction = orderDirection ? orderDirection : "asc";
  const column = orderByColumnName ? orderByColumnName : "defaultColumnName";

  const url =
    Endpoints.COMPANY +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${direction}&order_field=${column}`;

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
  orderDirection = "asc", // Default value for orderDirection
  orderByColumnName = "defaultColumnName", // Default value for orderByColumnName
  filterBody
) => {
  // Override default values if provided values are present
  const direction = orderDirection ? orderDirection : "asc";
  const column = orderByColumnName ? orderByColumnName : "defaultColumnName";

  const url =
    Endpoints.ROLE +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${direction}&order_field=${column}`;

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
  orderDirection = "asc", // Default value for orderDirection
  orderByColumnName = "defaultColumnName", // Default value for orderByColumnName
  filterBody
) => {
  // Override default values if provided values are present
  const direction = orderDirection ? orderDirection : "asc";
  const column = orderByColumnName ? orderByColumnName : "defaultColumnName";

  const url =
    Endpoints.DEPARTMENT +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${direction}&order_field=${column}`;

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
const getUserDetailAllContent = (id) =>
  makeApiRequest(Endpoints.USERDETAIL + `user/${id}`, "GET");

//UserDetail Page GET By Id
const getUserDetailContentById = (id) =>
  makeApiRequest(Endpoints.USERDETAIL + `${id}`, "GET");

//DELETE UserDetail Data
const deleteUserDetailContent = (id) =>
  makeApiRequest(Endpoints.USERDETAIL + `${id}`, "DELETE");

//POST UserDetail Data
const addUserDetailContent = (values) =>
  makeApiRequest(Endpoints.USERDETAIL, "POST", values);

//EDIT UserDetail Data
const editUserDetailContent = (id, values) =>
  makeApiRequest(Endpoints.USERDETAIL + `${id}`, "PUT", values);

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
  orderDirection = "asc", // Default value for orderDirection
  orderByColumnName = "defaultColumnName", // Default value for orderByColumnName
  filterBody
) => {
  // Override default values if provided values are present
  const direction = orderDirection ? orderDirection : "asc";
  const column = orderByColumnName ? orderByColumnName : "defaultColumnName";

  const url =
    Endpoints.SOCIALFLOW +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${direction}&order_field=${column}`;

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
  orderDirection = "asc", // Default value for orderDirection
  orderByColumnName = "defaultColumnName", // Default value for orderByColumnName
  filterBody
) => {
  // Override default values if provided values are present
  const direction = orderDirection ? orderDirection : "asc";
  const column = orderByColumnName ? orderByColumnName : "defaultColumnName";

  const url =
    Endpoints.SOCIALFLOWTYPE +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${direction}&order_field=${column}`;

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
  orderDirection = "asc", // Default value for orderDirection
  orderByColumnName = "defaultColumnName", // Default value for orderByColumnName
  filterBody
) => {
  // Override default values if provided values are present
  const direction = orderDirection ? orderDirection : "asc";
  const column = orderByColumnName ? orderByColumnName : "defaultColumnName";

  const url =
    Endpoints.FORM +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${direction}&order_field=${column}`;

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
const getFormTypeAllContent = () =>
  makeApiRequest(Endpoints.FORMTYPE + "all/", "POST", []);

const getFormTypePagination = (
  currentPage,
  pageLength,
  orderDirection = "asc", // Default value for orderDirection
  orderByColumnName = "defaultColumnName", // Default value for orderByColumnName
  filterBody
) => {
  // Override default values if provided values are present
  const direction = orderDirection ? orderDirection : "asc";
  const column = orderByColumnName ? orderByColumnName : "defaultColumnName";

  const url =
    Endpoints.FORMTYPE +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${direction}&order_field=${column}`;

  // Use JSON.stringify(filterBody) if filterBody exists, otherwise, use '[]'
  const requestBody = filterBody ? filterBody : [];

  return makeApiRequest(url, "POST", requestBody);
};

const getFormTypeContentById = (id) =>
  makeApiRequest(Endpoints.FORMTYPE + `${id}`, "GET");

const deleteFormTypeContent = (id) =>
  makeApiRequest(Endpoints.FORMTYPE + `${id}`, "DELETE");

const addFormTypeContent = (values) =>
  makeApiRequest(Endpoints.FORMTYPE, "POST", values);

const editFormTypeContent = (id, values) =>
  makeApiRequest(Endpoints.FORMTYPE + `${id}`, "PUT", values);

/* -------------------------------------------------------------- */

//DebitVoucher Page
const getDebitVoucherAllContent = () =>
  makeApiRequest(Endpoints.DEBITVOUCHER + "all/", "POST", []);

const getDebitVoucherPagination = (
  currentPage,
  pageLength,
  orderDirection = "asc", // Default value for orderDirection
  orderByColumnName = "defaultColumnName", // Default value for orderByColumnName
  filterBody
) => {
  // Override default values if provided values are present
  const direction = orderDirection ? orderDirection : "asc";
  const column = orderByColumnName ? orderByColumnName : "defaultColumnName";

  const url =
    Endpoints.DEBITVOUCHER +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${direction}&order_field=${column}`;

  // Use JSON.stringify(filterBody) if filterBody exists, otherwise, use '[]'
  const requestBody = filterBody ? filterBody : [];

  return makeApiRequest(url, "POST", requestBody);
};

const getDebitVoucherContentById = (id) =>
  makeApiRequest(Endpoints.DEBITVOUCHER + `${id}`, "GET");

const deleteDebitVoucherContent = (id) =>
  makeApiRequest(Endpoints.DEBITVOUCHER + `${id}`, "DELETE");

const addDebitVoucherContent = (values) =>
  makeApiRequest(Endpoints.DEBITVOUCHER, "POST", values);

const editDebitVoucherContent = (id, values) =>
  makeApiRequest(Endpoints.DEBITVOUCHER + `${id}`, "PUT", values);

/* -------------------------------------------------------------- */

//DebitRequest Page
const getDebitRequestAllContent = () =>
  makeApiRequest(Endpoints.DEBITREQUEST + "all/", "POST", []);

const getDebitRequestPagination = (
  currentPage,
  pageLength,
  orderDirection = "asc", // Default value for orderDirection
  orderByColumnName = "defaultColumnName", // Default value for orderByColumnName
  filterBody
) => {
  // Override default values if provided values are present
  const direction = orderDirection ? orderDirection : "asc";
  const column = orderByColumnName ? orderByColumnName : "defaultColumnName";

  const url =
    Endpoints.DEBITREQUEST +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${direction}&order_field=${column}`;

  // Use JSON.stringify(filterBody) if filterBody exists, otherwise, use '[]'
  const requestBody = filterBody ? filterBody : [];

  return makeApiRequest(url, "POST", requestBody);
};

const getDebitRequestContentById = (id) =>
  makeApiRequest(Endpoints.DEBITREQUEST + `${id}`, "GET");

const deleteDebitRequestContent = (id) =>
  makeApiRequest(Endpoints.DEBITREQUEST + `${id}`, "DELETE");

const addDebitRequestContent = (values) =>
  makeApiRequest(Endpoints.DEBITREQUEST, "POST", values);

const editDebitRequestContent = (id, values) =>
  makeApiRequest(Endpoints.DEBITREQUEST + `${id}`, "PUT", values);

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
const getReportAllContent = () =>
  makeApiRequest(Endpoints.REPORT + "all/", "POST", []);

const getReportPagination = (
  currentPage,
  pageLength,
  orderDirection = "asc", // Default value for orderDirection
  orderByColumnName = "defaultColumnName", // Default value for orderByColumnName
  filterBody
) => {
  // Override default values if provided values are present
  const direction = orderDirection ? orderDirection : "asc";
  const column = orderByColumnName ? orderByColumnName : "defaultColumnName";

  const url =
    Endpoints.REPORT +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${direction}&order_field=${column}`;

  // Use JSON.stringify(filterBody) if filterBody exists, otherwise, use '[]'
  const requestBody = filterBody ? filterBody : [];

  return makeApiRequest(url, "POST", requestBody);
};

const getReportContentById = (id) =>
  makeApiRequest(Endpoints.REPORT + `${id}`, "GET");

const deleteReportContent = (id) =>
  makeApiRequest(Endpoints.REPORT + `${id}`, "DELETE");

const addReportContent = (values) =>
  makeApiRequest(Endpoints.REPORT, "POST", values);

const editReportContent = (id, values) =>
  makeApiRequest(Endpoints.REPORT + `${id}`, "PUT", values);

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
