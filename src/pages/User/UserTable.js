import React, { useState, useEffect, forwardRef } from "react";
import {
  AddBox,
  ArrowDownward,
  Check,
  Clear,
  DeleteOutline,
  ChevronRight,
  Edit,
  SaveAlt,
  FilterList,
  FirstPage,
  LastPage,
  ChevronLeft,
  Search,
  Remove,
  ViewColumn,
} from "@material-ui/icons";
import MaterialTable from "material-table";
import axios from "axios";

import { ThemeProvider, createTheme } from "@mui/material";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const defaultMaterialTheme = createTheme();

const UserTable = ({ tableData, setTableData }) => {
  const [roleNames, setRoleNames] = useState([]);

  const updateEachRow = async (newData, oldData, callback) => {
    const url = `http://testlab.imecar.com:8082/user/${newData.id}`;
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.put(url, newData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      console.log("Response: ", response.data);

      if (callback) {
        callback(response.data);
      }
    } catch (error) {
      console.error("Error updating configuration: ", error);
    }
  };

  useEffect(() => {
    const fetchRoleNames = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const response = await axios.get(
          "http://testlab.imecar.com:8082/role/all/",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        console.log(response.data.body.data.records);

        setRoleNames(response.data.body.data.records);
      } catch (error) {
        console.error("Error fetching role names: ", error);
      }
    };

    fetchRoleNames();
  }, []);

  console.log(tableData);

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        icons={tableIcons}
        title="User Table"
        columns={[
          /* { title: "ID", field: "id" }, */
          { title: "Name", field: "first_name" },
          { title: "Last Name", field: "last_name" },
          { title: "Email", field: "email" },
          { title: "Phone Number", field: "phone_number" },
          {
            title: "Date of Birth",
            field: "date_of_birth",
            editComponent: (props) => (
              <input
                type="date"
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
              />
            ),
          },

          /* { title: "Role Name", field: "role_name" }, */
          {
            title: "Role ID",
            field: "role_id",
            render: (rowData) => roleNames[rowData.role_id] || rowData.role_id,
          },
          /* { title: "Company Name", field: "company_name" }, */
        ]}
        data={tableData}
        options={{
          selection: true,
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [10, 50, 100],
        }}
        localization={{
          body: {
            emptyDataSourceMessage: "Gösterilecek Veri Bulunamadı",
          },
          pagination: {
            labelRowsPerPage: (
              <div
                style={{
                  /* color: "blue", */
                  marginTop: "15px",
                }}
              >
                Rows Per Page :
              </div>
            ),
            labelDisplayedRows: `{from}-{to} of {count}`,
          },
        }}
        /* components={{
          Pagination: (props) => {
            return;
          },
        }} */
        editable={{
          /* onBulkUpdate: (changes) =>
        new Promise((resolve, reject) => {
          // Handle bulk updates here
          console.log(reject);
          console.log(changes);
          resolve();
        }), */
          onRowAdd: (newData, callback) =>
            new Promise((resolve, reject) => {
              const user = JSON.parse(localStorage.getItem("user"));
              const tenant_id = "55871330-723f-4e4b-b71f-90c9909efa8c";
              const password = "abc";

              const requestBody = {
                ...newData,
                tenant_id: tenant_id,
                password: password,
              };

              axios
                .post("http://testlab.imecar.com:8082/user/", requestBody, {
                  headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.access_token}`,
                  },
                })
                .then((response) => {
                  setTableData((prevData) => [...prevData, requestBody]);
                  resolve();
                })
                .catch((error) => {
                  console.error("Error adding row: ", error);
                  reject();
                });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const dataUpdate = [...tableData];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setTableData([...dataUpdate]);
              /* setData([...dataUpdate]); */
              updateEachRow(newData, oldData);
              resolve();
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              console.log(oldData.id);
              const user = JSON.parse(localStorage.getItem("user"));
              fetch(`http://testlab.imecar.com:8082/user/` + oldData.id, {
                method: "DELETE",
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${user.access_token}`,
                },
              })
                .then((resp) => resp.text())
                .then(() => {
                  const updatedData = tableData.filter(
                    (item) => item.id !== oldData.id
                  );
                  setTableData(updatedData);
                  resolve();
                });
            }),
        }}
      />
    </ThemeProvider>
  );
};

export default UserTable;
