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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await UserService.getFormPagination(currentPage, pageLength).then(
          async (response) => {
            const data = await response.json();
            //console.log(data);

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
          : PageName === "source"
          ? UserService.deleteSourceContent
          : PageName === "tenant"
          ? UserService.deleteTenantContent
          : PageName === "company"
          ? UserService.deleteCompanyContent
          : PageName === "role"
          ? UserService.deleteRoleContent
          : PageName === "department"
          ? UserService.deleteDepartmentContent
          : PageName === "calendar"
          ? UserService.deleteCalendarContent
          : PageName === "socialFlow"
          ? UserService.deleteSocialFlowContent
          : PageName === "socialFlowType"
          ? UserService.deleteSocialFlowTypeContent
          : PageName === "form"
          ? UserService.deleteFormContent
          : PageName === "form_type"
          ? UserService.deleteFormTypeContent
          : null;

      if (deleteFunction) {
        await deleteFunction(id).then(async (response) => {
          const data = await response.json();
          console.log(data.body.data.records);
        });

        const getAllContentFunction =
          PageName === "user"
            ? UserService.getUserAllContent
            : PageName === "source"
            ? UserService.getSourceAllContent
            : PageName === "tenant"
            ? UserService.getTenantAllContent
            : PageName === "company"
            ? UserService.getCompanyAllContent
            : PageName === "role"
            ? UserService.getRoleAllContent
            : PageName === "department"
            ? UserService.getDepartmentAllContent
            : PageName === "calendar"
            ? UserService.getCalendarAllContent
            : PageName === "socialFlow"
            ? UserService.getSocialFlowAllContent
            : PageName === "socialFlowType"
            ? UserService.getSocialFlowTypeAllContent
            : PageName === "form"
            ? UserService.getFormAllContent
            : PageName === "form_type"
            ? UserService.getFormTypeAllContent
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

        await UserService.getFormPagination(
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
    form_type_name: "Form Type Name",
    status: "Status",
    created_at: "Created At",
    form_type_id: "Form Type ID",
    leave_start_date: "Leave Start Date",
    end_of_leave: "End Of Leave",
    note: "Note",
    form_status: "Form Status",
  };

  let columnHeaders = {};
  if (tableData && tableData.length !== 0) {
    // Exclude the 'id' field from columns
    columnHeaders = Object.keys(tableData[0]).filter(
      (header) => header !== "id"
    );

    // Reorder columns to have 'name' and 'last_name' as the first and second columns
    columnHeaders = [
      "form_type_name",
      ...columnHeaders.filter((header) => !["form_type_name"].includes(header)),
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
            {columnHeaders.map((header, index) => (
              <th key={index}>{columnHeaderMapping[header] || header}</th>
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
                  {["created_at", "leave_start_date", "end_of_leave"].includes(
                    header
                  )
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
