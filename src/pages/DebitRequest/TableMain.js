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

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await UserService.getDebitRequestPagination(
          currentPage,
          pageLength
        ).then(async (response) => {
          const data = await response.json();
          console.log(data.body.data.records);

          setTableData(data.body.data.records);
          setPaging(data.body.data.paging);
          setTotalRecords(data.body.data.paging.total_records);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        await UserService.getUserAllContent().then(async (response) => {
          const data = await response.json();
          console.log(data.body.data.records);
          setUserData(data.body.data.records);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchUserData();
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
          : PageName === "debit_request"
          ? UserService.deleteDebitRequestContent
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
            : PageName === "debit_request"
            ? UserService.getDebitRequestAllContent
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

        await UserService.getDebitRequestPagination(
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

    columnHeaders = [
      "sender_note",
      ...columnHeaders.filter((header) => header !== "sender_note"),
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
            <th>From User</th>
            <th>To User</th>
            {Object.keys(tableData[0]).map(
              (header, index) =>
                header !== "from_user_id" &&
                header !== "to_user_id" &&
                header !== "id" && (
                  <th key={index}>{columnHeaderMapping[header] || header}</th>
                )
            )}
            <th>Actions</th>
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
                <td>{(currentPage - 1) * pageLength + index + 1}</td>
                <td>
                  {correspondingFromUser?.first_name +
                    " " +
                    correspondingFromUser?.last_name}
                </td>
                <td>
                  {correspondingToUser?.first_name +
                    " " +
                    correspondingToUser?.last_name}
                </td>
                {/* <td>{correspondingUser?.last_name}</td> */}
                {Object.keys(item).map(
                  (column, columnIndex) =>
                    column !== "from_user_id" &&
                    column !== "to_user_id" &&
                    column !== "id" && (
                      <td key={columnIndex}>
                        {column === "created_at" ? (
                          formatDate(item[column])
                        ) : column === "debit_status" ? (
                          <Form.Check
                            type="checkbox"
                            id={`${column}-${item.id}`}
                            label=""
                            checked={item[column]}
                            readOnly
                          />
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
                  {/* <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    Delete
                  </Button> */}
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
