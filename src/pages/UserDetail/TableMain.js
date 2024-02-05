import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Pagination,
  Form,
  Stack,
} from "react-bootstrap";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";

const TableMain = ({ tableData, setTableData, CRUDdata, userID }) => {
  let navigate = useNavigate();

  let location = useLocation();

  console.log(userID);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageLength, setPageLength] = useState(10);

  const [dataAvailable, setDataAvailable] = useState(true);
  const [loading, setLoading] = useState(true);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (
      typeof tableData === "string" &&
      tableData.includes("Request failed with status code 400")
    ) {
      setDataAvailable(false);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [tableData]);

  const handleAddClick = async () => {
    navigate(`/user_detail/add/${userID}`);
  };

  const handleEditClick = async (id) => {
    navigate(`/user_detail/edit/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      const deleteFunction = UserService.deleteUserDetailContent;

      if (deleteFunction) {
        await deleteFunction(id).then(async (response) => {
          const data = await response.json();
          console.log(data.body.data.records);

          if (response.status == 200) {
            setDataAvailable(false);
          }
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const columnHeaderMapping = {
    blood_type: "Blood Type",
    status: "Status",
    created_at: "Created At",
    tags: "Tags",
    business_phone: "Business Phone",
    start_date_of_work: "Start Date Of Work",
    job_title: "Job Title",
  };

  let columnHeaders = {};

  if (tableData && tableData.length !== 0) {
    columnHeaders = Object.keys([tableData][0]).filter(
      (header) => header !== "id"
    );

    if (isSmallScreen) {
      // Filter only specific headers for small screens
      columnHeaders = ["blood_type", "job_title"];
    } else {
      // Include all headers except "name" for larger screens
      columnHeaders = [
        "blood_type",
        ...columnHeaders.filter((header) => !["blood_type"].includes(header)),
      ];
    }
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
          There is No User Detail Currently. Please Add Item.
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
    console.log(dateString);
    var date = new Date(dateString);
    const pad = (num) => (num < 10 ? "0" + num : num);

    return `${pad(date.getDate())}/${pad(
      date.getMonth() + 1
    )}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : dataAvailable ? (
        <div style={{ backgroundColor: "pink", marginTop: "50px" }}>
          <Table responsive /* striped */ bordered hover /* variant="dark" */>
            <thead>
              <tr>
                <th className="text-center" style={{ verticalAlign: "middle" }}>
                  #
                </th>
                {isSmallScreen &&
                  columnHeaders.map((header, index) => (
                    <th
                      className="text-center"
                      style={{ verticalAlign: "middle" }}
                    >
                      {columnHeaderMapping[header] || header}
                    </th>
                  ))}
                {!isSmallScreen &&
                  columnHeaders.map((header, index) => (
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
              {[tableData].map((item, index) => (
                <tr key={index}>
                  <td
                    className="text-center"
                    style={{ verticalAlign: "middle" }}
                  >
                    {(currentPage - 1) * pageLength + index + 1}
                  </td>
                  {columnHeaders.map((header, columnIndex) => (
                    <td
                      className="text-center"
                      style={{ verticalAlign: "middle" }}
                      key={columnIndex}
                    >
                      {header === "created_at"
                        ? formatDate(item[header])
                        : item[header]}
                    </td>
                  ))}
                  <td
                    className="text-center"
                    style={{ verticalAlign: "middle" }}
                  >
                    <Stack
                      direction="horizontal"
                      gap={3}
                      style={{ display: "flex", justifyContent: "center" }}
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
                      {/* <Button
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
                    </Button> */}
                    </Stack>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            There is No User Detail Currently. Please Add Item.
            <Button
              variant="success"
              onClick={handleAddClick}
              className="ml-auto"
            >
              Add New Item
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableMain;
