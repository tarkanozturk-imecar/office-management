import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import TableMain from "./TableMain";
import { Button, Container, Card, Row, Col } from "react-bootstrap";

const Source = ({ PageName, CRUDdata }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [allData, setAllData] = useState([]);

  let navigate = useNavigate();

  let location = useLocation();

  useEffect(() => {
    {
      currentUser &&
        UserService.getSourceAllContent().then(
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

  const getNavbarDisplayName = (itemName) => {
    switch (itemName) {
      case "user":
        return "User";
      case "source":
        return "Source";
      case "company":
        return "Company";
      case "role":
        return "Role";
      case "department":
        return "Department";
      case "calendar":
        return "Calendar";
      case "social_flow":
        return "Social Flow";
      case "social_flow_type":
        return "Social Flow Type";
      case "form":
        return "Form";
      case "score_detail":
        return "Score Detail";
      case "form_type":
        return "Form Type";
      case "debit_voucher":
        return "Debit Voucher";
      case "debit_request":
        return "Debit Request";
      case "report":
        return "Report";
      default:
        return itemName;
    }
  };

  return (
    <Container fluid>
      <h3>{getNavbarDisplayName(PageName)}</h3>
      <TableMain
        tableData={allData}
        setTableData={setAllData}
        CRUDdata={CRUDdata} //For View, Add, Edit, Delete
        PageName={PageName}
      />
    </Container>
  );
};

export default Source;
