import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EventBus from "../../common/EventBus";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import TableMain from "./TableMain";
import { Container } from "react-bootstrap";
import { getData } from "../../services/test.service";

const ScoreDetail = ({ PageName, CRUDdata }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [allData, setAllData] = useState([]);

  let navigate = useNavigate();

  let location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        currentUser &&
          (await getData(PageName).then(async (response) => {
            setAllData(response.body.data.records);
          }));
      } catch (error) {
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
    };

    fetchData();
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const getNavbarDisplayName = (itemName) => {
    switch (itemName) {
      case "score_detail":
        return "Score Detail";
      default:
        return itemName;
    }
  };

  return (
    <Container fluid>
      <Container
        fluid
        style={{ backgroundColor: "#34495E" /* borderRadius: "30px" */ }}
      >
        <h3 style={{ fontSize: "40px", paddingTop: "20px", color: "white" }}>
          {getNavbarDisplayName(PageName)}
        </h3>
        <TableMain
          tableData={allData}
          setTableData={setAllData}
          CRUDdata={CRUDdata} //For View, Add, Edit, Delete
          PageName={PageName}
        />
      </Container>
    </Container>
  );
};

export default ScoreDetail;
