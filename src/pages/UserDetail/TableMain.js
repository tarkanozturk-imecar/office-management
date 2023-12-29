import React, { useState, useEffect } from "react";
import { Table, Button, Container, Pagination, Form } from "react-bootstrap";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";

const TableMain = ({ tableData, setTableData, CRUDdata, userID }) => {
  let navigate = useNavigate();

  let location = useLocation();

  const [paging, setPaging] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLength, setPageLength] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const PageName = "userDetail";

  /* useEffect(() => {
    const fetchData = async () => {
      try {
        await UserService.getUserDetailPagination(currentPage, pageLength).then(
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

    fetchData();
  }, [currentPage, pageLength]); */

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
    console.log(id);
    try {
      const deleteFunction =
        PageName === "userDetail" ? UserService.deleteUserDetailContent : null;

      if (deleteFunction) {
        await deleteFunction(id).then(async (response) => {
          const data = await response.json();
          console.log(data.body.data.records);
        });

        const getAllContentFunction =
          PageName === "userDetail"
            ? UserService.getUserDetailAllContent(userID)
            : null;

        if (getAllContentFunction) {
          await getAllContentFunction().then((response) => {
            console.log(response.data.body.data.records);
            setTableData(response.data.body.data.records);
          });
        }
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  let columnHeaders = {};
  if ([tableData] && [tableData].length !== 0) {
    // Exclude the 'id' field from columns
    columnHeaders = Object.keys([tableData][0]).filter(
      (header) => header !== "id"
    );

    // Reorder columns to have 'name' and 'last_name' as the first and second columns
    columnHeaders = [
      "blood_type",
      ...columnHeaders.filter((header) => !["blood_type"].includes(header)),
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

  return (
    <div>
      {tableData == "Request failed with status code 400" ? (
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
      ) : (
        <div>
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
              {[tableData].map((item, index) => (
                <tr key={index}>
                  <td>{(currentPage - 1) * pageLength + index + 1}</td>
                  {columnHeaders.map((header, columnIndex) => (
                    <td key={columnIndex}>{item[header]}</td>
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
        </div>
      )}
    </div>
  );
};

export default TableMain;
