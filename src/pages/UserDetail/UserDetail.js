import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import TableMain from "./TableMain";

const UserDetail = ({ PageName, CRUDdata }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [allData, setAllData] = useState([]);

  let navigate = useNavigate();

  let location = useLocation();

  //console.log(location.pathname);

  var regex = /\/userDetail\/user\/([^\/]+)/;
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
            console.log(data.body.data.records);
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
      case "socialFlow":
        return "Social Flow";
      case "socialFlowType":
        return "Social Flow Type";
      case "form":
        return "Form";
      case "scoreDetail":
        return "Score Detail";
      case "form_type":
        return "Form Type";
      case "debit_voucher":
        return "Debit Voucher";
      case "debit_request":
        return "Debit Request";
      case "rapor":
        return "Rapor";
      default:
        return itemName;
    }
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{getNavbarDisplayName(PageName)}</h3>
        <TableMain
          tableData={allData}
          setTableData={setAllData}
          CRUDdata={CRUDdata} //For View, Add, Edit, Delete
          PageName={PageName}
          userID={userID}
        />
      </header>
    </div>
  );
};

export default UserDetail;
