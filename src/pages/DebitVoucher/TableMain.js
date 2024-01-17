import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Pagination,
  Form,
  Stack,
  Modal,
  Badge,
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

  const [debitRequestData, setDebitRequestData] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const fetchData = async () => {
    try {
      await UserService.getDebitVoucherPagination(currentPage, pageLength).then(
        async (response) => {
          const data = await response.json();
          console.log(data);

          setTableData(data.body.data.records);
          setPaging(data.body.data.paging);
          setTotalRecords(data.body.data.paging.total_records);
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchDebitRequestData = async () => {
      try {
        await UserService.getDebitRequestAllContent().then(async (response) => {
          console.log(response.data.body.data.records);
          setDebitRequestData(response.data.body.data.records);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchDebitRequestData();
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

  const handleDeleteClick = async (id) => {
    try {
      const deleteFunction =
        PageName === "user"
          ? UserService.deleteUserContent
          : PageName === "company"
          ? UserService.deleteCompanyContent
          : PageName === "role"
          ? UserService.deleteRoleContent
          : PageName === "source"
          ? UserService.deleteSourceContent
          : PageName === "debit_voucher"
          ? UserService.deleteDebitVoucherContent
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
            : PageName === "debit_voucher"
            ? UserService.getDebitVoucherAllContent
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

        await UserService.getDebitVoucherPagination(
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
    id: "ID",
    status: "Status",
    created_at: "Created At",
    title: "Title",
    serial_number: "Serial Number",
    quantity: "Quantity",
    description: "Description",
    material_status_text: "Material Status Text",
    owner_user_id: "Owner User ID",
    active_debit_request: "Active Debit Request",
    debited_at: "Debited At",
  };

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

  let columnHeaders = {};
  if (tableData && tableData.length !== 0) {
    columnHeaders = Object.keys(tableData[0]).filter(
      (header) => header !== "id" && header !== "owner_user_id"
    );

    columnHeaders = [
      "title",
      ...columnHeaders.filter((header) => header !== "title"),
    ];
  }

  /* const handleCancelDebitRequest = async () => {
    let correspondingActive_debit_request_data;
    tableData.map((item, index) => {
      correspondingActive_debit_request_data = debitRequestData.find(
        (requestID) => requestID.id === item.active_debit_request
      );
      console.log(correspondingActive_debit_request_data.id);
    });
    try {
      await UserService.cancelDebitRequestContent(
        correspondingActive_debit_request_data.id
      ).then(async (response) => {
        const data = await response.json();
        console.log(data.body.data.records);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }; */

  const handleResponseDebitRequest = async () => {
    let correspondingActive_debit_request_data;
    tableData.map((item, index) => {
      correspondingActive_debit_request_data = debitRequestData.find(
        (requestID) => requestID.id === item.active_debit_request
      );
      console.log(correspondingActive_debit_request_data.id);
    });

    const bodyData = {
      response_statu: 1, //Accept
    };

    try {
      await UserService.responseDebitRequestContent(
        correspondingActive_debit_request_data.id,
        bodyData
      ).then(async (response) => {
        /* const data = await response.json();
        console.log(data.body.data.records); */
        try {
          await UserService.getDebitVoucherPagination(
            currentPage,
            pageLength
          ).then(async (response) => {
            console.log(response);
            /* const data = await response.json();
            console.log(data); */
            if (response.ok) {
              fetchData();
              handleCloseModal();
              console.log("Request Accepted Successfully", response);
            } else {
              console.error("Error submitting form:", response.statusText);
            }
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Debit Request Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Click one option</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleCancelDebitRequest}>
            Cancel Debit Request
          </Button> */}
          <Button variant="primary" onClick={handleResponseDebitRequest}>
            Accept Debit Request
          </Button>
        </Modal.Footer>
      </Modal>
      {tableData && tableData.length !== 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <Button
              variant="success"
              onClick={handleAddClick}
              className="ml-auto"
            >
              Add New Item
            </Button>
          </div>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                {columnHeaders.map((header, index) => (
                  <th className="text-center" key={index}>
                    {columnHeaderMapping[header] || header}
                  </th>
                ))}
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => {
                const correspondingActive_debit_request = debitRequestData.find(
                  (requestID) => requestID.id === item.active_debit_request
                );

                // Check if correspondingActive_debit_request is defined before accessing properties
                const debitStatus =
                  correspondingActive_debit_request?.debit_status;
                console.log(debitStatus);
                return (
                  <tr key={index}>
                    <td>{(currentPage - 1) * pageLength + index + 1}</td>

                    {Object.keys(item).map(
                      (column, columnIndex) =>
                        column !== "id" &&
                        column !== "owner_user_id" && (
                          <td
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                            key={columnIndex}
                          >
                            {column === "created_at" ? (
                              formatDate(item[column])
                            ) : column === "debited_at" ? (
                              formatShortDate(item[column])
                            ) : column === "active_debit_request" ? (
                              debitStatus === 1 ? (
                                <Button
                                  variant="warning"
                                  onClick={handleShowModal}
                                >
                                  Request Waiting
                                </Button>
                              ) : (
                                <h5>
                                  <Badge
                                    bg="secondary"
                                    style={{ color: "white" }}
                                  >
                                    No Request for this Debit
                                  </Badge>
                                </h5>
                              )
                            ) : (
                              /* (
                              item[column] === null ? (
                                <h5>
                                  <Badge bg="dark">No Request</Badge>
                                </h5>
                              ) : debitStatus === 1 ? (
                                <Button
                                  variant="danger"
                                  onClick={handleShowModal}
                                >
                                  Request Waiting
                                </Button>
                              ) : debitStatus === 91 ? (
                                <Badge bg="secondary">
                                  Owner has cancelled the Request
                                </Badge>
                              ) : debitStatus === 92 ? (
                                <span>Receiver Accepted</span>
                              ) : debitStatus === 93 ? (
                                <span>Receiver Rejected</span>
                              ) : null
                            ) */ item[column]
                            )}
                          </td>
                        )
                    )}
                    <td>
                      <Stack direction="horizontal" gap={1}>
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
                      </Stack>
                    </td>
                  </tr>
                );
              })}
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
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          There is No Data Currently. Please Add Item....
          <Button
            variant="success"
            onClick={handleAddClick}
            className="ml-auto"
          >
            Add New Item
          </Button>
        </div>
      )}
    </div>
  );
};

export default TableMain;
