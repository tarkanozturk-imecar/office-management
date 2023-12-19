import React, { useState, useEffect, forwardRef } from "react";
import { useSelector } from "react-redux";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import { Navigate, useNavigate } from "react-router-dom";
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

const Permission = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [content, setContent] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    {
      currentUser &&
        UserService.getUserPermission().then(
          (response) => {
            const permission_list = response.data.body.data.records.modules;
            console.log(permission_list);
            setContent(permission_list);
          },
          (error) => {
            const _content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setContent(_content);

            if (error.response && error.response.status === 401) {
              EventBus.dispatch("logout");
              navigate("/login");
            }
          }
        );
    }
  }, [currentUser]);

  //console.log("****", currentUser);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const defaultMaterialTheme = createTheme();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Permissions</h3>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            icons={tableIcons}
            title="Title"
            columns={[
              { title: "Name", field: "name" },
              { title: "ID", field: "id" },
              { title: "Add", field: "add" },
              { title: "Delete", field: "delete" },
              { title: "Edit", field: "edit" },
              { title: "View", field: "view" },
            ]}
            data={content}
            options={{
              selection: true,
              actionsColumnIndex: -1,
              pageSize: 10,
              pageSizeOptions: [10, 50, 100],
            }}
            editable={{
              /* onBulkUpdate: (changes) =>
            new Promise((resolve, reject) => {
              // Handle bulk updates here
              console.log(reject);
              console.log(changes);
              resolve();
            }), */
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {}),
              onRowDelete: (oldData) => new Promise((resolve, reject) => {}),
            }}
          />
        </ThemeProvider>
      </header>
    </div>
  );
};

export default Permission;
