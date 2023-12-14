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
import { Endpoints } from "../../enums/endpoints";

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

const RoleTable = ({ tableData, setTableData }) => {
  const [roleNames, setRoleNames] = useState([]);

  const updateEachRow = async (newData, oldData, callback) => {
    const url = Endpoints.ROLE + `${newData.id}`;
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
        const response = await axios.get(Endpoints.ROLE + `all/`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        });

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
        title="Role Table"
        columns={[
          { title: "ID", field: "id", editable: false },
          { title: "Role Name", field: "name" },
          { title: "Score", field: "score", editable: false },
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
        editable={{
          onRowAdd: (newData, callback) =>
            new Promise((resolve, reject) => {
              const user = JSON.parse(localStorage.getItem("user"));

              axios
                .post(Endpoints.ROLE, newData, {
                  headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.access_token}`,
                  },
                })
                .then((response) => {
                  // After adding a new row, fetch the updated data
                  axios
                    .get(Endpoints.ROLE + `all/`, {
                      headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${user.access_token}`,
                      },
                    })
                    .then((fetchResponse) => {
                      setRoleNames(fetchResponse.data.body.data.records);
                      setTableData(fetchResponse.data.body.data.records);
                      resolve();
                    })
                    .catch((fetchError) => {
                      console.error("Error fetching role names: ", fetchError);
                      reject();
                    });
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
              fetch(Endpoints.ROLE + oldData.id, {
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

export default RoleTable;
