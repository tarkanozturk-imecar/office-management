import React, { useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import TableEditItem from "./TableEditItem";
import TableAddItem from "./TableAddItem";
import UserService from "../../services/user.service";

const TableMain = ({ tableData, setTableData, PageName, CRUDdata }) => {
  let navigate = useNavigate();

  let location = useLocation();

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
          : null;

      if (deleteFunction) {
        await deleteFunction(id).then(async (response) => {
          const data = await response.json();
          console.log(data.body.data.records); // Deleted Item ID
        });

        const getAllContentFunction =
          PageName === "user"
            ? UserService.getUserAllContent
            : PageName === "company"
            ? UserService.getCompanyAllContent
            : PageName === "role"
            ? UserService.getRoleAllContent
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
  if (tableData.length !== 0) {
    columnHeaders = Object.keys(tableData[0]);
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
          <Button
            variant="success"
            onClick={handleAddClick}
            className="ml-auto"
          >
            {/* <Link to={`${location.pathname}/add`} style={{ color: "white" }}> */}
            Add New Item
            {/* </Link> */}
          </Button>
        </div>
      </div>
    );
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
          {/* <Link to={`${location.pathname}/add`} style={{ color: "white" }}> */}
          Add New Item
          {/* </Link> */}
        </Button>
      </div>

      <Table responsive>
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
              <td>{index + 1}</td>
              {columnHeaders.map((header, columnIndex) => (
                <td key={columnIndex}>{item[header]}</td>
              ))}
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEditClick(item.id)}
                >
                  {/* <Link
                    to={`${location.pathname}/edit/${item.id}`}
                    style={{ color: "white" }}
                  > */}
                  Edit
                  {/* </Link> */}
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
  );
};

export default TableMain;
