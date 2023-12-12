import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Navigate, useNavigate } from "react-router-dom";
import TableComponent from "./TableComponent";

const User = ({ CRUDdata }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [userAllData, setUserAllData] = useState([]);

  let navigate = useNavigate();

  console.log(CRUDdata);

  useEffect(() => {
    {
      currentUser &&
        UserService.getUserAllContent().then(
          (response) => {
            console.log(response.data.body.data.records);
            setUserAllData(response.data.body.data.records);
          },
          (error) => {
            const _content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setUserAllData(_content);

            if (error.response && error.response.status === 401) {
              EventBus.dispatch("logout");
              navigate("/login");
            }
          }
        );
    }
  }, [currentUser]);

  console.log("****", currentUser);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>User Page</h3>
        <TableComponent
          tableData={userAllData}
          setTableData={setUserAllData}
          CRUDdata={CRUDdata} //For View, Add, Edit, Delete
        />
      </header>
    </div>
  );
};

export default User;
