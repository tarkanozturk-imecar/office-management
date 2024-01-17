import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Pagination,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";

const isValidValue = (value) => value === "asc" || value === "desc";

const TableMain = ({ tableData, setTableData, PageName, CRUDdata }) => {
  let navigate = useNavigate();

  let location = useLocation();

  const [paging, setPaging] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLength, setPageLength] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const [orderDirection, setOrderDirection] = useState("asc");

  const [orderByColumnName, setOrderByColumnName] = useState(null);

  const handleChangeOrderDirection = async (newOrder) => {
    if (isValidValue(newOrder) && newOrder !== orderDirection) {
      try {
        setOrderDirection(newOrder);
        //setCurrentPage(1); // Reset to the first page when changing the sorting order
      } catch (error) {
        console.error("Error changing order direction:", error);
      }
    } else {
      console.error("Invalid value or same order direction.");
    }
  };

  const handleChangeOrderByColumnName = async (newOrder) => {
    try {
      console.log(newOrder);
      setOrderByColumnName(newOrder);
      console.log(orderByColumnName);
    } catch (error) {
      console.error("Error changing order direction:", error);
    }
  };

  const fetchData = async () => {
    try {
      await UserService.getUserPagination(currentPage, pageLength).then(
        async (response) => {
          const data = await response.json();
          //console.log(data);

          setTableData(data.body.data.records);
          setPaging(data.body.data.paging);
          setTotalRecords(data.body.data.paging.total_records);
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataWithOrder = async () => {
    try {
      const response = await UserService.getUserPagination(
        currentPage,
        pageLength,
        orderDirection
      );
      const data = await response.json();
      setTableData(data.body.data.records);
      setPaging(data.body.data.paging);
      setTotalRecords(data.body.data.paging.total_records);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchOrderbyColumnName = async () => {
    console.log(orderByColumnName);
    try {
      const response = await UserService.getUserPagination(
        currentPage,
        pageLength,
        orderDirection,
        orderByColumnName
      );
      const data = await response.json();
      setTableData(data.body.data.records);
      setPaging(data.body.data.paging);
      setTotalRecords(data.body.data.paging.total_records);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageLength]);

  useEffect(() => {
    fetchDataWithOrder();
  }, [currentPage, pageLength, orderDirection]);

  useEffect(() => {
    fetchOrderbyColumnName();
  }, [currentPage, pageLength, orderDirection, orderByColumnName]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageLengthChange = (length) => {
    setPageLength(length);
    setCurrentPage(1);
  };

  const handleAddClick = async () => {
    navigate(location.pathname + `/add`);
  };

  const handleEditClick = async (id) => {
    navigate(location.pathname + `/edit/${id}`);
  };

  const handleDetailClick = async (id) => {
    navigate(`/user_detail/user/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      const deleteFunction =
        PageName === "user"
          ? UserService.deleteUserContent
          : PageName === "source"
          ? UserService.deleteSourceContent
          : PageName === "tenant"
          ? UserService.deleteTenantContent
          : PageName === "company"
          ? UserService.deleteCompanyContent
          : PageName === "role"
          ? UserService.deleteRoleContent
          : null;

      if (deleteFunction) {
        await deleteFunction(id).then(async (response) => {
          const data = await response.json();
          console.log(data.body.data.records);
        });

        const getAllContentFunction =
          PageName === "user"
            ? UserService.getUserAllContent
            : PageName === "company"
            ? UserService.getCompanyAllContent
            : PageName === "role"
            ? UserService.getRoleAllContent
            : PageName === "source"
            ? UserService.getSourceAllContent
            : null;

        if (getAllContentFunction) {
          await getAllContentFunction().then((response) => {
            console.log(response.data.body.data.records);
            setTableData(response.data.body.data.records);
          });
        }

        const updatedTotalRecords = totalRecords - 1;
        const updatedTotalPages = Math.ceil(updatedTotalRecords / pageLength);

        // Adjust currentPage to not exceed the updated total pages
        const updatedCurrentPage = Math.min(currentPage, updatedTotalPages);

        await UserService.getUserPagination(
          updatedCurrentPage,
          pageLength
        ).then(async (response) => {
          const data = await response.json();
          setTableData(data.body.data.records);
          setPaging(data.body.data.paging);
          setTotalRecords(updatedTotalRecords);
          setCurrentPage(updatedCurrentPage);
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const columnHeaderMapping = {
    first_name: "First Name",
    last_name: "Last Name",
    status: "Status",
    created_at: "Created At",
    email: "Email",
    phone_number: "Phone Number",
    date_of_birth: "Date of Birth",
    role_id: "Role ID",
    role_name: "Role Name",
    company_name: "Company Name",
    department_name: "Department Name",
    company_id: "Company ID",
    department_id: "Department ID",
    last_action_time: "Last Action Time",
    photo: "Photo",
    cloud_message_id: "Cloud Message ID",
  };

  let columnHeaders = {};
  if (tableData && tableData.length !== 0) {
    // Exclude the 'id' field from columns
    columnHeaders = Object.keys(tableData[0]).filter(
      (header) =>
        header !== "id" &&
        header !== "role_id" &&
        header !== "company_id" &&
        header !== "department_id"
    );

    console.log(columnHeaders);

    // Reorder columns to have 'name' and 'last_name' as the first and second columns
    columnHeaders = [
      "first_name",
      "last_name",
      ...columnHeaders.filter(
        (header) => !["first_name", "last_name"].includes(header)
      ),
    ];
  } else {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          There is No Data Currently. Please Add Item.
          <Button
            variant="success"
            onClick={handleAddClick}
            className="ml-auto"
          >
            Add New Item
          </Button>
        </div>
      </div>
    );
  }

  function formatDate(dateString) {
    var date = new Date(dateString);
    const pad = (num) => (num < 10 ? "0" + num : num);

    return `${pad(date.getDate())}/${pad(
      date.getMonth() + 1
    )}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  function formatShortDate(inputDate) {
    var dateObject = new Date(inputDate);

    var day = dateObject.getDate();
    var month = dateObject.getMonth() + 1;
    var year = dateObject.getFullYear();

    var formattedDate = day + "/" + month + "/" + year;

    return formattedDate;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Form.Group as={Col} md="4" controlId="validationCustomDirection">
          <Form.Label>Order by Direction</Form.Label>
          <Form.Select
            name="orderDirection"
            value={orderDirection === "asc" ? "asc" : "desc"}
            onChange={(e) => handleChangeOrderDirection(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom">
          <Form.Label>Order by Column Names</Form.Label>
          <Form.Select
            name="orderDirection"
            value={orderByColumnName}
            onChange={(e) => handleChangeOrderByColumnName(e.target.value)}
          >
            <option hidden>Select Column Name</option>
            {Object.keys(tableData[0]).map(
              (item) =>
                item !== "id" && (
                  <option key={item} value={item}>
                    {columnHeaderMapping[item]}
                  </option>
                )
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group
          as={Col}
          md="4"
          controlId="validationCustomDirection"
          style={{
            margin: 0,
            padding: 0,
            //backgroundColor: "pink",
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
          }}
        >
          <Button
            variant="success"
            onClick={handleAddClick}
            //className="ml-auto"
          >
            Add New Item
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </Button>
        </Form.Group>
      </div>

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th className="text-center" style={{ verticalAlign: "middle" }}>
              #
            </th>
            {columnHeaders.map((header, index) => (
              <th
                className="text-center"
                style={{ verticalAlign: "middle" }}
                key={index}
              >
                {columnHeaderMapping[header] || header}
              </th>
            ))}
            <th className="text-center" style={{ verticalAlign: "middle" }}>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td className="text-center" style={{ verticalAlign: "middle" }}>
                {(currentPage - 1) * pageLength + index + 1}
              </td>
              {columnHeaders.map((header, columnIndex) => (
                <td
                  className="text-center"
                  style={{ verticalAlign: "middle" }}
                  key={columnIndex}
                >
                  {header === "photo" ? (
                    // Render image if the column is "photo"
                    <img
                      src={
                        item[header] ||
                        "//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                      } // Assuming "photo" field contains the URL
                      alt={`Photo ${index + 1}`}
                      style={{ maxWidth: "50px", maxHeight: "50px" }} // Set the desired size
                    />
                  ) : // Render other columns as text
                  ["created_at", "last_action_time"].includes(header) ? (
                    formatDate(item[header])
                  ) : header === "date_of_birth" ? (
                    formatShortDate(item[header])
                  ) : (
                    item[header]
                  )}
                </td>
              ))}
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEditClick(item.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(item.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleDetailClick(item.id)}
                >
                  Detail
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: paging.total_pages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === paging.total_pages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(paging.total_pages)}
          disabled={currentPage === paging.total_pages}
        />
      </Pagination>

      <Container className="mt-3">
        <Form.Group className="d-flex align-items-center ml-auto">
          <Form.Label className="mr-2">Page Length:</Form.Label>
          <Form.Select
            value={pageLength}
            onChange={(e) => handlePageLengthChange(e.target.value)}
            style={{ width: "80px" }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </Form.Select>
          <span className="ml-2">Total Records: {totalRecords}</span>
        </Form.Group>
      </Container>
    </div>
  );
};

export default TableMain;
