import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Pagination,
  Form,
  Col,
  Row,
  Stack,
  Accordion,
  Badge,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getData,
  deleteData,
  paginationData,
  cancelDebitRequestContent,
} from "../../services/test.service";
import { FormattedMessage } from "react-intl";

const isValidValue = (value) => value === "asc" || value === "desc";

const TableMain = ({ tableData, setTableData, PageName, CRUDdata }) => {
  let navigate = useNavigate();

  let location = useLocation();

  const [paging, setPaging] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLength, setPageLength] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const [userData, setUserData] = useState([]);

  //Orders
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderByColumnName, setOrderByColumnName] = useState("");

  //Filters
  const [filterByField, setFilterByField] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const [isLoading, setIsLoading] = useState(true);

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

  const showToastMessage = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    fetchData().finally(() => {
      setIsLoading(false);
    });
  }, [currentPage, pageLength]);

  useEffect(() => {}, [selectedCondition]);

  const handleChangeFilterByCondition = (event) => {
    setSelectedCondition(event.target.value);
  };

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
      setOrderByColumnName(newOrder);
    } catch (error) {
      console.error("Error changing order direction:", error);
    }
  };

  const handleChangeFilterByField = async (newOrder) => {
    try {
      setFilterByField(newOrder);
    } catch (error) {
      console.error("Error changing order direction:", error);
    }
  };

  const handleChangeFilterBySearch = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  const handleChangeFilterBySearchDateTime = async (event) => {
    event.preventDefault();

    const selectedDateTime = new Date(event.target.value + ":00"); // Adding ":00" for seconds
    const localOffset = selectedDateTime.getTimezoneOffset() * 60000; // Offset in milliseconds
    const correctedDateTime = new Date(
      selectedDateTime.getTime() - localOffset
    );
    const formattedDateTime = correctedDateTime.toISOString(); // Use the full ISO string

    setSearchValue(formattedDateTime);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await paginationData(PageName, currentPage, pageLength).then(
        async (response) => {
          setTableData(response.body.data.records);
          setPaging(response.body.data.paging);
          setTotalRecords(response.body.data.paging.total_records);
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataWithOrder = async () => {
    try {
      await paginationData(
        PageName,
        currentPage,
        pageLength,
        orderDirection
      ).then(async (response) => {
        setTableData(response.body.data.records);
        setPaging(response.body.data.paging);
        setTotalRecords(response.body.data.paging.total_records);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchOrderbyColumnName = async () => {
    try {
      await paginationData(
        PageName,
        currentPage,
        pageLength,
        orderDirection,
        orderByColumnName
      ).then(async (response) => {
        setTableData(response.body.data.records);
        setPaging(response.body.data.paging);
        setTotalRecords(response.body.data.paging.total_records);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      await getData("user").then(async (response) => {
        setUserData(response.body.data.records);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    // Reset search value when filterByField changes
    setSearchValue("");
  }, [filterByField]);

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

  const handleDeleteClick = async (id) => {
    try {
      await deleteData(PageName, id).then(async (response) => {
        console.log(response);
      });

      await getData(PageName).then(async (response) => {
        setTableData(response.body.data.records);
      });

      const updatedTotalRecords = totalRecords - 1;
      const updatedTotalPages = Math.ceil(updatedTotalRecords / pageLength);

      // Adjust currentPage to not exceed the updated total pages
      const updatedCurrentPage = Math.min(currentPage, updatedTotalPages);

      await paginationData(PageName, updatedCurrentPage, pageLength).then(
        async (response) => {
          setTableData(response.body.data.records);
          setPaging(response.body.data.paging);
          setTotalRecords(updatedTotalRecords);
          setCurrentPage(updatedCurrentPage);
        }
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const columnHeaderMapping = {
    id: "ID",
    status: "Status",
    created_at: "Created At",
    debit_status: "Debit Status",
    from_user_id: "From User ID",
    to_user_id: "To User ID",
    sender_note: "Sender Note",
  };

  let columnHeaders = {};

  if (tableData && tableData.length !== 0) {
    columnHeaders = Object.keys(tableData[0]).filter(
      (header) => header !== "id"
    );

    if (isSmallScreen) {
      columnHeaders = ["sender_note"];
    } else {
      columnHeaders = [
        "sender_note",
        ...columnHeaders.filter((header) => header !== "sender_note"),
      ];
    }
  }

  function formatDate(dateString) {
    var date = new Date(dateString);
    const pad = (num) => (num < 10 ? "0" + num : num);

    return `${pad(date.getDate())}/${pad(
      date.getMonth() + 1
    )}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  const handleCancelDebitRequest = async (id) => {
    try {
      await cancelDebitRequestContent(id).then(async (response) => {
        if (response.header.status !== 400) {
          await getData(PageName).then(async (response) => {
            setTableData(response.body.data.records);
          });
        } else {
          showToastMessage(response.header.messages[0].source); //response.header.messages[0].desc
          console.error(
            "Error submitting form:",
            response.header.messages[0].desc
          );
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sendFilterData = async () => {
    const yourArray = [];

    if (filterByField === "debit_status") {
      // If the filterByField is "score," use the "==" condition and set an integer value
      const bodyObject = {
        field: [filterByField],
        condition: "==",
        values: [parseInt(searchValue, 10)], // Convert searchValue to an integer
      };

      yourArray.push(bodyObject);
    } else {
      // For other fields, use the selected condition and search value
      const bodyObject = {
        field: [filterByField],
        condition: `${selectedCondition}`,
        values: [searchValue],
      };

      yourArray.push(bodyObject);
    }

    try {
      await paginationData(
        PageName,
        currentPage,
        pageLength,
        orderDirection,
        orderByColumnName,
        yourArray
      ).then(async (response) => {
        if (response.body.data.records.length === 0) {
          showToastMessage(
            <FormattedMessage id="For This Filter There Is No Data" />
          );
        } else {
          setTableData(response.body.data.records);
          setPaging(response.body.data.paging);
          setTotalRecords(response.body.data.paging.total_records);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      {!isLoading && (!tableData || tableData.length === 0) && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
            color: "white",
          }}
        >
          <FormattedMessage id="There is No Data Currently. Please Add Item." />
          <Button
            variant="success"
            onClick={handleAddClick}
            className="ml-auto"
          >
            <FormattedMessage id="Add New Item" />
          </Button>
        </div>
      )}
      {!isLoading && tableData && tableData.length > 0 && (
        <>
          <Container
            fluid
            style={{
              margin: 0,
              padding: 0,
            }}
          >
            <Row>
              <Col
                sm
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "end",
                  /* marginTop: "2rem", */
                  marginBottom: "2rem",
                }}
              >
                <Button
                  variant="success"
                  onClick={handleAddClick}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FormattedMessage id="Add New Item" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                    style={{ marginLeft: "8px" }} // Adjust the margin as needed
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                </Button>
              </Col>
            </Row>

            <Row>
              <Col sm>
                <Accordion
                  style={{
                    marginBottom: "2rem",
                  }}
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <span style={{ marginRight: "5px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-list-ul"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                          />
                        </svg>
                      </span>
                      <FormattedMessage id="Orders" />
                    </Accordion.Header>

                    <Accordion.Body>
                      <Row>
                        <Col sm>
                          <Form.Label>
                            <FormattedMessage id="Order by Direction" />
                          </Form.Label>
                          <Form.Select
                            name="orderDirection"
                            value={orderDirection === "asc" ? "asc" : "desc"}
                            onChange={(e) =>
                              handleChangeOrderDirection(e.target.value)
                            }
                          >
                            <option value="asc">
                              <FormattedMessage id="Ascending" />
                            </option>
                            <option value="desc">
                              <FormattedMessage id="Descending" />
                            </option>
                          </Form.Select>
                        </Col>
                        <Col sm>
                          <Form.Label>
                            <FormattedMessage id="Order by Column Names" />
                          </Form.Label>
                          <Form.Select
                            name="orderDirection"
                            value={orderByColumnName}
                            onChange={(e) =>
                              handleChangeOrderByColumnName(e.target.value)
                            }
                          >
                            <option hidden>
                              <FormattedMessage id="Select Column Name" />
                            </option>
                            {Object.keys(tableData[0]).map(
                              (item) =>
                                item !== "id" &&
                                item !== "status" &&
                                item !== "debit_status" &&
                                item !== "from_user_id" &&
                                item !== "to_user_id" && (
                                  <option key={item} value={item}>
                                    {
                                      <FormattedMessage
                                        id={columnHeaderMapping[item]}
                                      />
                                    }
                                  </option>
                                )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>

              <Col sm>
                <Accordion
                  style={{
                    marginBottom: "2rem",
                  }}
                >
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <span style={{ marginRight: "5px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-filter"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                        </svg>
                      </span>
                      <FormattedMessage id="Filters" />
                    </Accordion.Header>

                    <Accordion.Body>
                      <Row>
                        <Col sm md={6}>
                          <Form.Label>
                            <FormattedMessage id="Filter by Field" />
                          </Form.Label>
                          <Form.Select
                            name="orderField"
                            value={filterByField}
                            onChange={(e) =>
                              handleChangeFilterByField(e.target.value)
                            }
                          >
                            <option hidden>
                              <FormattedMessage id="Select Field" />
                            </option>
                            {Object.keys(tableData[0]).map(
                              (item) =>
                                item !== "id" &&
                                item !== "status" &&
                                /* item !== "debit_status" && */
                                item !== "from_user_id" &&
                                item !== "to_user_id" && (
                                  <option key={item} value={item}>
                                    {
                                      <FormattedMessage
                                        id={columnHeaderMapping[item]}
                                      />
                                    }
                                  </option>
                                )
                            )}
                          </Form.Select>
                        </Col>

                        {filterByField === "created_at" ? (
                          <Col sm md={6}>
                            <Form.Label>
                              <FormattedMessage id="Filter by Condition" />
                            </Form.Label>
                            <Form.Select
                              value={selectedCondition}
                              onChange={handleChangeFilterByCondition}
                              aria-label="Select operator"
                            >
                              <option hidden>
                                <FormattedMessage id="Select Condition" />
                              </option>
                              <option value=">=">
                                <FormattedMessage id="Great Equal" />
                              </option>
                              <option value="<=">
                                <FormattedMessage id="Less than Equal" />
                              </option>
                            </Form.Select>
                          </Col>
                        ) : (
                          <Col sm md={6}>
                            <Form.Label>
                              <FormattedMessage id="Filter by Condition" />
                            </Form.Label>
                            <Form.Select
                              value={selectedCondition}
                              onChange={handleChangeFilterByCondition}
                              aria-label="Select operator"
                            >
                              <option hidden>
                                <FormattedMessage id="Select Condition" />
                              </option>
                              <option value="%=%">
                                <FormattedMessage id="Equal" />
                              </option>
                            </Form.Select>
                          </Col>
                        )}

                        {filterByField === "created_at" ? (
                          <Col sm md={6}>
                            <Form.Label>
                              <FormattedMessage id="Select Date" />
                            </Form.Label>
                            <Form.Control
                              required
                              type="datetime-local"
                              name="select_date"
                              value={
                                searchValue ? searchValue.substring(0, 16) : ""
                              }
                              onChange={handleChangeFilterBySearchDateTime}
                            />
                          </Col>
                        ) : filterByField === "debit_status" ? (
                          <Col sm md={6}>
                            <Form.Label>
                              <FormattedMessage id="Debit Status" />
                            </Form.Label>
                            <Form.Select
                              required
                              value={searchValue}
                              onChange={handleChangeFilterBySearch}
                            >
                              <option hidden>
                                <FormattedMessage id="Select Debit Status" />
                              </option>
                              <option value="1">
                                <FormattedMessage id="Waiting Request" />
                              </option>
                              <option value="91">
                                <FormattedMessage id="Owner Cancelled Request" />
                              </option>
                              <option value="92">
                                <FormattedMessage id="Receiver Accepted Request" />
                              </option>
                              <option value="93">
                                <FormattedMessage id="Receiver Rejected Request" />
                              </option>
                            </Form.Select>
                          </Col>
                        ) : (
                          <Col sm md={6}>
                            <Form.Label htmlFor="inputPassword5">
                              <FormattedMessage id="Search" />
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="inputPassword5"
                              aria-describedby="passwordHelpBlock"
                              value={searchValue}
                              onChange={handleChangeFilterBySearch}
                            />
                          </Col>
                        )}

                        <Col
                          sm
                          md={6}
                          style={{
                            display: "flex",
                            alignItems: "end",
                            justifyContent: "center",
                            marginTop: "2rem",
                          }}
                        >
                          <Button
                            variant="success"
                            onClick={sendFilterData}
                            disabled={
                              filterByField.trim() === "" ||
                              selectedCondition.trim() === "" ||
                              searchValue.trim() === ""
                            }
                          >
                            <span style={{ marginRight: "5px" }}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-search"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                              </svg>
                            </span>
                            <FormattedMessage id="Send Filter" />
                          </Button>
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
          </Container>

          <Table responsive /* striped */ bordered hover /* variant="dark" */>
            <thead>
              <tr>
                <th className="text-center" style={{ verticalAlign: "middle" }}>
                  #
                </th>
                <th className="text-center" style={{ verticalAlign: "middle" }}>
                  <FormattedMessage id="From User" />
                </th>
                <th className="text-center" style={{ verticalAlign: "middle" }}>
                  <FormattedMessage id="To User" />
                </th>
                {isSmallScreen &&
                  columnHeaders.map(
                    (header, index) =>
                      header !== "from_user_id" &&
                      header !== "to_user_id" &&
                      header !== "id" && (
                        <th
                          className="text-center"
                          style={{ verticalAlign: "middle" }}
                          key={index}
                        >
                          {(
                            <FormattedMessage
                              id={columnHeaderMapping[header]}
                            />
                          ) || header}
                        </th>
                      )
                  )}
                {!isSmallScreen &&
                  columnHeaders.map(
                    (header, index) =>
                      header !== "from_user_id" &&
                      header !== "to_user_id" &&
                      header !== "id" && (
                        <th
                          className="text-center"
                          style={{ verticalAlign: "middle" }}
                          key={index}
                        >
                          {(
                            <FormattedMessage
                              id={columnHeaderMapping[header]}
                            />
                          ) || header}
                        </th>
                      )
                  )}
                <th className="text-center" style={{ verticalAlign: "middle" }}>
                  <FormattedMessage id="Actions" />
                </th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((item, index) => {
                const correspondingFromUser = userData.find(
                  (user) => user.id === item.from_user_id
                );
                const correspondingToUser = userData.find(
                  (user) => user.id === item.to_user_id
                );
                return (
                  <tr key={index}>
                    <td
                      className="text-center"
                      style={{ verticalAlign: "middle" }}
                    >
                      {(currentPage - 1) * pageLength + index + 1}
                    </td>
                    <td
                      className="text-center"
                      style={{ verticalAlign: "middle" }}
                    >
                      {correspondingFromUser?.first_name +
                        " " +
                        correspondingFromUser?.last_name}
                    </td>

                    {correspondingToUser?.first_name === undefined ? (
                      <td
                        className="text-center"
                        style={{ verticalAlign: "middle", color: "red" }}
                      >
                        <FormattedMessage id="User Deleted Or Not Assigned" />
                      </td>
                    ) : (
                      <td
                        className="text-center"
                        style={{ verticalAlign: "middle" }}
                      >
                        {correspondingToUser?.first_name +
                          " " +
                          correspondingToUser?.last_name}
                      </td>
                    )}

                    {/* <td
                      className="text-center"
                      style={{ verticalAlign: "middle" }}
                    >
                      {correspondingToUser?.first_name +
                        " " +
                        correspondingToUser?.last_name}
                    </td> */}

                    {columnHeaders.map(
                      (column, columnIndex) =>
                        column !== "from_user_id" &&
                        column !== "to_user_id" &&
                        column !== "id" && (
                          <td
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                            key={columnIndex}
                          >
                            {column === "created_at" ? (
                              formatDate(item[column])
                            ) : column === "debit_status" ? (
                              item[column] === 1 ? (
                                <h5>
                                  <Badge
                                    bg="warning"
                                    style={{ color: "black" }}
                                  >
                                    <FormattedMessage id="Waiting For Response..." />
                                  </Badge>
                                </h5>
                              ) : item[column] === 91 ? (
                                <h5>
                                  <Badge bg="danger" style={{ color: "white" }}>
                                    <FormattedMessage id="Owner has cancelled the Request" />
                                  </Badge>
                                </h5>
                              ) : item[column] === 92 ? (
                                <h5>
                                  <Badge
                                    bg="success"
                                    style={{ color: "white" }}
                                  >
                                    <FormattedMessage id="Receiver Accepted" />
                                  </Badge>
                                </h5>
                              ) : item[column] === 93 ? (
                                <h5>
                                  <Badge bg="danger" style={{ color: "white" }}>
                                    <FormattedMessage id="Receiver Rejected" />
                                  </Badge>
                                </h5>
                              ) : (
                                <FormattedMessage id="No Data" />
                              )
                            ) : (
                              item[column]
                            )}
                          </td>
                        )
                    )}

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
                          disabled={item.debit_status !== 1 ? true : false}
                          variant="danger"
                          onClick={() => handleCancelDebitRequest(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-x-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                          </svg>
                        </Button>
                      </Stack>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <Stack direction="horizontal" gap={3}>
            <div className="p-2">
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
            </div>

            <div className="p-2">
              <Form.Group className="d-flex align-items-center ml-auto">
                {/* <Form.Label className="mr-2">Page Length:</Form.Label> */}
                <Form.Select
                  value={pageLength}
                  onChange={(e) => handlePageLengthChange(e.target.value)}
                  style={{ width: "80px" }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </Form.Select>
                <span style={{ color: "white" }} className="ml-2">
                  Total Records: {totalRecords}
                </span>
              </Form.Group>
            </div>
          </Stack>
        </>
      )}
    </div>
  );
};

export default TableMain;
