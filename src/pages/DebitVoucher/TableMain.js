import React, { useState, useEffect } from "react";
import { Table, Button, Container, Pagination, Form } from "react-bootstrap";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await UserService.getDebitVoucherPagination(
          currentPage,
          pageLength
        ).then(async (response) => {
          const data = await response.json();
          //console.log(data);

          setTableData(data.body.data.records);
          setPaging(data.body.data.paging);
          setTotalRecords(data.body.data.paging.total_records);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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

  let columnHeaders = {};
  if (tableData && tableData.length !== 0) {
    columnHeaders = Object.keys(tableData[0]).filter(
      (header) => header !== "id" && header !== "owner_user_id"
    );

    columnHeaders = [
      "title",
      ...columnHeaders.filter((header) => header !== "title"),
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
        <Button variant="success" onClick={handleAddClick} className="ml-auto">
          Add New Item
        </Button>
      </div>

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {Object.keys(tableData[0]).map(
              (header, index) =>
                header !== "id" && (
                  <th key={index}>{columnHeaderMapping[header] || header}</th>
                )
            )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => {
            const correspondingActive_debit_request = debitRequestData.find(
              (requestID) => requestID.id === item.active_debit_request
            );
            console.log(correspondingActive_debit_request);
            return (
              <tr key={index}>
                <td>{(currentPage - 1) * pageLength + index + 1}</td>

                {Object.keys(item).map(
                  (column, columnIndex) =>
                    column !== "id" && (
                      <td key={columnIndex}>
                        {column === "created_at" ? (
                          formatDate(item[column])
                        ) : column === "debited_at" ? (
                          formatShortDate(item[column])
                        ) : item["active_debit_request"] !== null &&
                          column === "active_debit_request" ? (
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteClick(item.id)}
                          >
                            {correspondingActive_debit_request.debit_status}
                          </Button>
                        ) : (
                          item[column]
                        )}
                      </td>
                    )
                )}
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
    </div>
  );
};

export default TableMain;
