const BASE_URL = "http://testlab.imecar.com:8082"; // replace with your API base URL

const Endpoints = {
  ROOT: `${BASE_URL}`,
  LOGIN: `${BASE_URL}/login/`,
  USER: `${BASE_URL}/user/`,
  USERME: `${BASE_URL}/user/me/`,
  USERMEMODULES: `${BASE_URL}/user/me/?mode=2`,
  SOURCE: `${BASE_URL}/source/`,
  TENANT: `${BASE_URL}/tenant/`,
  COMPANY: `${BASE_URL}/company/`,
  PERMISSION: `${BASE_URL}/permission/`,
  ROLE: `${BASE_URL}/role/`,
  DEPARTMENT: `${BASE_URL}/department/`,
  USERDETAIL: `${BASE_URL}/user_detail/`,
  CALENDAR: `${BASE_URL}/calendar/`,
  SOCIALFLOW: `${BASE_URL}/social_flow/`,
  SOCIALFLOWTYPE: `${BASE_URL}/social_flow_type/`,
  FORM: `${BASE_URL}/form/`,
  FORMTYPE: `${BASE_URL}/form_type/`,
  SCOREDETAIL: `${BASE_URL}/score_detail/`,
  DEBITVOUCHER: `${BASE_URL}/debit_voucher/`,
  DEBITREQUEST: `${BASE_URL}/debit_request/`,
  CALENDARTYPE: `${BASE_URL}/calendar_type/`,
  REPORT: `${BASE_URL}/report/`,
  DEBITDASHBOARD: `${BASE_URL}/debitdashboard/`,
  IMAGEUPLOAD: `https://mj.imecar.com/uploads/uf.php`,
};

export const getPageName = (item) => {
  switch (item) {
    case "user":
      return Endpoints.USER;
    case "user_me":
      return Endpoints.USERME;
    case "user_me_modules":
      return Endpoints.USERMEMODULES;
    case "source":
      return Endpoints.SOURCE;
    case "tenant":
      return Endpoints.TENANT;
    case "company":
      return Endpoints.COMPANY;
    case "permission":
      return Endpoints.PERMISSION;
    case "role":
      return Endpoints.ROLE;
    case "department":
      return Endpoints.DEPARTMENT;
    case "user_detail":
      return Endpoints.USERDETAIL;
    case "calendar":
      return Endpoints.CALENDAR;
    case "social_flow":
      return Endpoints.SOCIALFLOW;
    case "social_flow_type":
      return Endpoints.SOCIALFLOWTYPE;
    case "form":
      return Endpoints.FORM;
    case "form_type":
      return Endpoints.FORMTYPE;
    case "score_detail":
      return Endpoints.SCOREDETAIL;
    case "debit_voucher":
      return Endpoints.DEBITVOUCHER;
    case "debit_request":
      return Endpoints.DEBITREQUEST;
    case "calendar_type":
      return Endpoints.CALENDARTYPE;
    case "report":
      return Endpoints.REPORT;
    case "image_upload":
      return Endpoints.IMAGEUPLOAD;
    default:
      return item;
  }
};

const makeApiRequest = async (url, method, bodyData) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${user.access_token}`,
  };

  // Check if the method is "GET" and set the body accordingly
  const requestBody = method === "GET" ? undefined : [JSON.stringify(bodyData)];

  const response = await fetch(url, {
    method,
    headers: headers,
    body: requestBody ? requestBody : null,
  });

  return response.json();
};

//POST Image Upload
export const uploadImageData = async (bodyData) => {
  const response = await fetch(`https://mj.imecar.com/uploads/uf.php`, {
    method: "POST",
    body: bodyData,
  });

  return response.json();
};

export const scoreDetailUpdate = async (bodyData) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${user.access_token}`,
  };

  const response = await fetch(`http://testlab.imecar.com:8082/score_detail/`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(bodyData),
  });

  return response.json();
};

//RESPONSE FOR DEBIT REQUEST CONTENT
export const responseDebitRequestContent = async (id, bodyData) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${user.access_token}`,
  };

  const response = await fetch(
    `${BASE_URL}` + `/debit_request/` + `response-req/` + `${id}`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(bodyData),
    }
  );

  return response.json();
};

//CANCEL FOR DEBIT REQUEST CONTENT
export const cancelDebitRequestContent = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${user.access_token}`,
  };

  const response = await fetch(
    `${BASE_URL}` + `/debit_request/` + `cancel-req/` + `${id}`,
    {
      method: "POST",
      headers: headers,
    }
  );

  return response.json();
};

//USER_DETAIL BY ID
export const getUserDetailByIdData = async (pageName, id) =>
  await makeApiRequest(getPageName(pageName) + "user/" + id, "GET");

//GET USER_ME & USER_ME MODULES
export const getUserMeData = async (pageName) =>
  await makeApiRequest(getPageName(pageName), "GET");

//GET ALL
export const getData = async (pageName) =>
  await makeApiRequest(getPageName(pageName) + "all/", "POST", []);

//GET BY ID
export const getByIdData = async (pageName, id) =>
  await makeApiRequest(getPageName(pageName) + id, "GET");

//DELETE
export const deleteData = async (pageName, id) =>
  await makeApiRequest(getPageName(pageName) + id, "DELETE");

//ADD
export const addData = async (pageName, values) =>
  await makeApiRequest(getPageName(pageName), "POST", values);

//EDIT
export const editData = async (pageName, id, values) =>
  await makeApiRequest(getPageName(pageName) + id, "PUT", values);

//PAGINATION
export const paginationData = async (
  pageName,
  currentPage,
  pageLength,
  orderDirection = "asc",
  orderByColumnName = "defaultColumnName",
  filterBody
) => {
  // Override default values if provided values are present
  const direction = orderDirection ? orderDirection : "asc";
  const column = orderByColumnName ? orderByColumnName : "defaultColumnName";

  const url =
    getPageName(pageName) +
    `all/?page_number=${currentPage}&page_length=${pageLength}&order_direction=${direction}&order_field=${column}`;

  // Use JSON.stringify(filterBody) if filterBody exists, otherwise, use '[]'
  const requestBody = filterBody ? filterBody : [];

  return await makeApiRequest(url, "POST", requestBody);
};
