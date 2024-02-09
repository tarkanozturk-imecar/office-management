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
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getData,
  deleteData,
  paginationData,
} from "../../services/test.service";

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

  let columnHeaders = {};

  if (tableData && tableData.length !== 0) {
    // Exclude the 'id' field from columns
    columnHeaders = Object.keys(tableData[0]).filter(
      (header) => header !== "id"
    );

    // Reorder columns to have 'name' and 'last_name' as the first and second columns
    columnHeaders = [
      "name",
      ...columnHeaders.filter((header) => !["name"].includes(header)),
    ];
  } else {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
            color: "white",
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
              <th key={index}>{header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{(currentPage - 1) * pageLength + index + 1}</td>
              {columnHeaders.map((header, columnIndex) => (
                <td key={columnIndex}>
                  {["created_at", "last_action_time"].includes(header)
                    ? formatDate(item[header])
                    : item[header]}
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
    </div>
  );
};

export default TableMain;
