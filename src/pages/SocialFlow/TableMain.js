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
  Modal,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getData,
  deleteData,
  paginationData,
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

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  //Orders
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderByColumnName, setOrderByColumnName] = useState("");

  //Filters
  const [filterByField, setFilterByField] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const [isLoading, setIsLoading] = useState(true);

  //Custom Filters
  const [groupedSocialFlowData, setGroupedSocialFlowData] = useState({});

  const [fetchGroupData, setFetchGroupData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await paginationData(PageName, 1, 100).then(async (response) => {
          setFetchGroupData(response.body.data.records);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const groupData = () => {
      const groupedSocialFlowResult = fetchGroupData.reduce((acc, item) => {
        if (!acc[item.social_flow_type_id]) {
          acc[item.social_flow_type_id] = {
            social_flow_type_id: item.social_flow_type_id,
            social_flow_name: item.social_flow_name,
            members: [],
          };
        }
        acc[item.social_flow_type_id].members.push(item);
        return acc;
      }, {});

      setGroupedSocialFlowData(groupedSocialFlowResult);
    };

    groupData();
  }, [fetchGroupData]);

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

  const handleShowModal = (itemId) => {
    setDeleteItemId(itemId); // Set the ID of the item to be deleted
    setShowModal(true); // Show the modal
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

  const handleEditUserScoreClick = async (id) => {
    navigate(`/score_detail/edit/${id}`);
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
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const columnHeaderMapping = {
    social_flow_name: "Social Flow Name",
    social_flow_type_id: "Social Flow Type",
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

    if (isSmallScreen) {
      // Filter only specific headers for small screens
      columnHeaders = ["social_flow_name", "content" /* "average_score" */];
    } else {
      // Include all headers except "name" for larger screens
      columnHeaders = [
        "social_flow_name",
        ...columnHeaders.filter(
          (header) => !["social_flow_name"].includes(header)
        ),
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

  const sendFilterData = async () => {
    const yourArray = [];

    if (
      filterByField === "average_score" ||
      filterByField === "user_score" ||
      filterByField === "score_counter"
    ) {
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

  const handleCustomFilterChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <ToastContainer />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="Are you sure you want to delete?" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="danger"
            onClick={() => handleDeleteClick(deleteItemId)}
          >
            <FormattedMessage id="Delete" />
          </Button>
          <Button variant="success" onClick={handleCloseModal}>
            <FormattedMessage id="Cancel" />
          </Button>
        </Modal.Footer>
      </Modal>
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
                                item !== "company_id" &&
                                item !== "department_id" &&
                                item !== "photo" &&
                                item !== "social_flow_type_id" &&
                                item !== "user_id" &&
                                item !== "color" &&
                                item !== "icon" &&
                                item !== "target" && (
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
                                item !== "company_id" &&
                                item !== "department_id" &&
                                item !== "photo" &&
                                /* item !== "social_flow_type_id" && */
                                item !== "social_flow_name" &&
                                item !== "user_id" &&
                                item !== "color" &&
                                item !== "icon" &&
                                item !== "target" &&
                                item !== "user_score" &&
                                item !== "average_score" && (
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

                        {filterByField === "created_at" ||
                        filterByField === "start_of_display" ||
                        filterByField === "end_of_display" ? (
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
                        ) : filterByField === "social_flow_type_id" ? (
                          <Col sm md={6}>
                            <Form.Label>Filter by Condition</Form.Label>
                            <Form.Select
                              value={selectedCondition}
                              onChange={handleChangeFilterByCondition}
                              aria-label="Select operator"
                            >
                              <option hidden>Select Condition</option>
                              <option value="==">Eşit</option>
                            </Form.Select>
                          </Col>
                        ) : (
                          <Col sm md={6}>
                            <Form.Label>Filter by Condition</Form.Label>
                            <Form.Select
                              value={selectedCondition}
                              onChange={handleChangeFilterByCondition}
                              aria-label="Select operator"
                            >
                              <option hidden>Select Condition</option>
                              <option value="%=%">Eşit</option>
                            </Form.Select>
                          </Col>
                        )}

                        {/* SEARCH */}
                        {filterByField === "created_at" ||
                        filterByField === "start_of_display" ||
                        filterByField === "end_of_display" ? (
                          <Col sm md={6}>
                            <Form.Label>Select Date</Form.Label>
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
                        ) : filterByField === "social_flow_type_id" ? (
                          <Col sm md={6}>
                            <Form.Label>Select Social Flow:</Form.Label>
                            <Form.Select
                              value={searchValue}
                              onChange={handleCustomFilterChange}
                            >
                              <option hidden>Select Social Flow</option>
                              {Object.values(groupedSocialFlowData).map(
                                (group, index) => (
                                  <option
                                    key={index}
                                    value={group.social_flow_type_id}
                                  >
                                    {group.social_flow_name}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          </Col>
                        ) : (
                          <Col sm md={6}>
                            <Form.Label htmlFor="inputPassword5">
                              Search
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Search..."
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
                            Send Filter
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
                {isSmallScreen &&
                  columnHeaders.map((header, index) => (
                    <th
                      key={index}
                      className="text-center"
                      style={{ verticalAlign: "middle" }}
                    >
                      {columnHeaderMapping[header] || header}
                    </th>
                  ))}
                {!isSmallScreen &&
                  columnHeaders.map((header, index) => (
                    <th
                      key={index}
                      className="text-center"
                      style={{ verticalAlign: "middle" }}
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
                      [
                          "created_at",
                          "start_of_display",
                          "end_of_display",
                        ].includes(header) ? (
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
                    </Stack>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Stack direction="horizontal" gap={2}>
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
                  Total: {totalRecords}
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
