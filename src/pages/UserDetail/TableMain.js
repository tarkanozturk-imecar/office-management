import React, { useState, useEffect } from "react";
import { Table, Button, Container, Pagination, Form } from "react-bootstrap";
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
        <div>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                {columnHeaders.map((header, index) => (
                  <th key={index}>{columnHeaderMapping[header] || header}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[tableData].map((item, index) => (
                <tr key={index}>
                  <td>{(currentPage - 1) * pageLength + index + 1}</td>
                  {columnHeaders.map((header, columnIndex) => (
                    <td key={columnIndex}>
                      {header === "created_at"
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
                    {/* <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(item.id)}
                    >
                      Delete
                    </Button> */}
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
