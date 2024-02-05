import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import TableMain from "./TableMain";
import { Button, Container, Card, Row, Col } from "react-bootstrap";

const UserDetail = ({ PageName, CRUDdata }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [allData, setAllData] = useState([]);

  let navigate = useNavigate();

  let location = useLocation();

  var regex = /\/user_detail\/user\/([^\/]+)/;
  var match = location.pathname.match(regex);

  if (match && match[1]) {
    var userID = match[1];
    //console.log(userID);
  } else {
    console.log("No match found.");
  }

  useEffect(() => {
    {
      currentUser &&
        UserService.getUserDetailAllContent(userID).then(
          async (response) => {
            const data = await response.json();
            //console.log(data.body.data.records);
            setAllData(data.body.data.records);
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
    <Container fluid>
      <Container
        fluid
        style={{ backgroundColor: "#34495E" /* borderRadius: "30px" */ }}
      >
        <h3 style={{ fontSize: "40px", paddingTop: "20px", color: "white" }}>
          User Detail
        </h3>
        <TableMain
          tableData={allData}
          setTableData={setAllData}
          CRUDdata={CRUDdata} //For View, Add, Edit, Delete
          PageName={PageName}
          userID={userID}
        />
      </Container>
    </Container>
  );
};

export default UserDetail;
