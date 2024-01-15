import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Pagination,
  Form,
  Stack,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";

const TableMain = ({ tableData, setTableData, PageName, CRUDdata }) => {
  let navigate = useNavigate();

  let location = useLocation();

  const [paging, setPaging] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLength, setPageLength] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await UserService.getSocialFlowPagination(currentPage, pageLength).then(
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

    fetchData();
  }, [currentPage, pageLength]);

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

  const handleEditUserScoreClick = async (id) => {
    navigate(`/score_detail/edit/${id}`);
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
          : PageName === "department"
          ? UserService.deleteDepartmentContent
          : PageName === "calendar"
          ? UserService.deleteCalendarContent
          : PageName === "social_flow"
          ? UserService.deleteSocialFlowContent
          : PageName === "social_flow_type"
          ? UserService.deleteSocialFlowTypeContent
          : null;

      if (deleteFunction) {
        await deleteFunction(id).then(async (response) => {
          const data = await response.json();
          console.log(data.body.data.records);
        });

        const getAllContentFunction =
          PageName === "user"
            ? UserService.getUserAllContent
            : PageName === "source"
            ? UserService.getSourceAllContent
            : PageName === "tenant"
            ? UserService.getTenantAllContent
            : PageName === "company"
            ? UserService.getCompanyAllContent
            : PageName === "role"
            ? UserService.getRoleAllContent
            : PageName === "department"
            ? UserService.getDepartmentAllContent
            : PageName === "calendar"
            ? UserService.getCalendarAllContent
            : PageName === "social_flow"
            ? UserService.getSocialFlowAllContent
            : PageName === "social_flow_type"
            ? UserService.getSocialFlowTypeAllContent
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

        await UserService.getSocialFlowPagination(
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
    social_flow_name: "Social Flow Name",
    social_flow_type_id: "Social Flow Type ID",
    status: "Status",
    created_at: "Created At",
    photo: "Photo",
    color: "Color",
    average_score: "Average Score",
    start_of_display: "Start of Display",
    title: "Title",
    content: "Content",
    company_id: "Company ID",
    icon: "Icon",
    department_id: "Department ID",
    score_counter: "Score Counter",
    end_of_display: "End of Display",
    user_id: "User ID",
    target: "Target",
    user_score: "User Score",
  };

  let columnHeaders = {};
  if (tableData && tableData.length !== 0) {
    // Exclude the 'id' field from columns
    columnHeaders = Object.keys(tableData[0]).filter(
      (header) =>
        header !== "id" &&
        header !== "social_flow_type_id" &&
        header !== "company_id" &&
        header !== "department_id" &&
        header !== "user_id" &&
        header !== "color" &&
        header !== "icon" &&
        header !== "target"
    );

    // Reorder columns to have 'name' and 'last_name' as the first and second columns
    columnHeaders = [
      "social_flow_name",
      ...columnHeaders.filter(
        (header) => !["social_flow_name"].includes(header)
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

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button variant="success" onClick={handleAddClick} className="ml-auto">
          Add New Item
        </Button>
      </div>

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {columnHeaders.map((header, index) => (
              <th key={index}>{columnHeaderMapping[header] || header}</th>
            ))}
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{(currentPage - 1) * pageLength + index + 1}</td>
              {columnHeaders.map((header, columnIndex) => (
                <td key={columnIndex}>
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
                  ["created_at", "start_of_display", "end_of_display"].includes(
                      header
                    ) ? (
                    formatDate(item[header])
                  ) : header === "average_score" ? (
                    // Display "average_score" with one decimal point if it has decimals
                    Number.isInteger(item[header]) ? (
                      item[header]
                    ) : (
                      item[header].toFixed(1)
                    )
                  ) : (
                    item[header]
                  )}
                </td>
              ))}
              <td>
                <Stack direction="horizontal" gap={3}>
                  <div style={{ display: "block" }}>
                    <OverlayTrigger
                      overlay={(props) => <Tooltip {...props}>Edit</Tooltip>}
                      placement="bottom"
                    >
                      <Button
                        variant="primary"
                        onClick={() => handleEditClick(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                      </Button>
                    </OverlayTrigger>
                  </div>
                  <div style={{ display: "block" }}>
                    <OverlayTrigger
                      overlay={(props) => <Tooltip {...props}>Delete</Tooltip>}
                      placement="bottom"
                    >
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                      </Button>
                    </OverlayTrigger>
                  </div>
                  <div style={{ display: "block" }}>
                    <OverlayTrigger
                      overlay={(props) => (
                        <Tooltip {...props}>Enter User Score</Tooltip>
                      )}
                      placement="bottom"
                    >
                      <Button
                        variant="success"
                        onClick={() => handleEditUserScoreClick(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-bookmark"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                        </svg>
                      </Button>
                    </OverlayTrigger>
                  </div>
                </Stack>
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
