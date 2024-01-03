import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import TableMain from "./TableMain";

const User = ({ PageName, CRUDdata }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [allData, setAllData] = useState([]);

  let navigate = useNavigate();

  let location = useLocation();

  useEffect(() => {
    {
      currentUser &&
        UserService.getUserAllContent().then(
          (response) => {
            console.log(response.data.body.data.records);
            setAllData(response.data.body.data.records);
          },
          (error) => {
            const _content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setAllData(_content);

            if (error.response && error.response.status === 401) {
              EventBus.dispatch("logout");
              navigate("/login");
            }
          }
        );
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{PageName}</h3>
        <TableMain
          tableData={allData}
          setTableData={setAllData}
          CRUDdata={CRUDdata} //For View, Add, Edit, Delete
          PageName={PageName}
        />
      </header>
    </div>
  );
};

export default User;
