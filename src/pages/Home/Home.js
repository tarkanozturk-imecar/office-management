import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import "./home.css";

function TruncateTitle({ allData, title }) {
  const [isTruncated, setIsTruncated] = useState(true);

  const truncatedContent =
    title.length > 12 ? title.substring(0, 12) + "..." : title;

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div>
      {isTruncated ? (
        <>
          <strong style={{ color: "white" }}>
            <u>{truncatedContent}</u>
          </strong>
          {title.length > 12 && (
            <button
              onClick={toggleTruncate}
              style={{
                marginLeft: "8px",
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
                color: "blue",
              }}
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <>
          <strong style={{ color: "white" }}>
            <u>{title}</u>
          </strong>
          <button
            onClick={toggleTruncate}
            style={{
              marginLeft: "8px",
              cursor: "pointer",
              backgroundColor: "transparent",
              border: "none",
              color: "blue",
            }}
          >
            Show Less
          </button>
        </>
      )}
    </div>
  );
}

function TruncateContent({ content }) {
  const [isTruncated, setIsTruncated] = useState(true);

  const truncatedContent = content.split(",")[0];

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const menuItems = content.split(",").map((item) => item.trim());

  return (
    <>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {menuItems.map((menuItem, index) => (
          <li key={index} style={{ margin: 0, color: "white" }}>
            {menuItem}
          </li>
        ))}
      </ul>
    </>
  );
}

const Home = ({ PageName, CRUDdata }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [content, setContent] = useState("");

  const [allSocialFlowData, setAllSocialFlowData] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    {
      currentUser &&
        UserService.getProfileContent().then(
          (response) => {
            setContent(response.data.body.data.records);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await UserService.getSocialFlowAllContent().then(async (response) => {
          const data = await response.json();
          setAllSocialFlowData(data.body.data.records);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  function formatDate(dateString) {
    var date = new Date(dateString);
    const pad = (num) => (num < 10 ? "0" + num : num);

    return `${pad(date.getDate())}/${pad(
      date.getMonth() + 1
    )}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  const formatDepartmentName = (itemName) => {
    switch (itemName) {
      case "department_software":
        return "Software Department";
      case "department_electronics":
        return "Electronics Department";
      case "department_mechanics":
        return "Mechanics Department";
      case "department_general":
        return "General Department";
      default:
        return itemName;
    }
  };

  const formatCompanyName = (itemName) => {
    switch (itemName) {
      case "factory_dosemealti_imecar":
        return "Imecar Döşemealtı Factory";
      case "factory_freezone_imecar":
        return "Imecar Freezone Factory";
      default:
        return itemName;
    }
  };

  function getCurrentDateTime() {
    const currentDate = new Date();
    const formattedDate = `${pad(currentDate.getDate())}/${pad(
      currentDate.getMonth() + 1
    )}/${currentDate.getFullYear()}`;
    const formattedTime = `${pad(currentDate.getHours())}:${pad(
      currentDate.getMinutes()
    )}`;
    return `${formattedDate} ${formattedTime}`;

    // Function to pad single digits with leading zeros
    function pad(number) {
      return (number < 10 ? "0" : "") + number;
    }
  }

  return (
    <>
      {!currentUser ? (
        <>
          <header className="jumbotron">
            <h3 style={{ color: "white" }}>
              <strong>Token Has Expired.</strong>
            </h3>
          </header>
        </>
      ) : (
        <>
          <Container fluid>
            <Card
              className="text-center profileCard"
              /* text="white" */
            >
              <div className="blob">
                <svg
                  xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 310 350"
                >
                  <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
                </svg>
              </div>
              <div>
                <h1 className="main-title">
                  {content.first_name} {content.last_name}
                  <p className="second-title">{content.role_name}</p>
                </h1>
                <div className="contacts">
                  <li>{formatCompanyName(content.company_name)}</li>
                  <li>{formatDepartmentName(content.department_name)}</li>
                  <li>{content.email}</li>
                  <li>{getCurrentDateTime()}</li>
                </div>
              </div>
            </Card>

            <Row
              xs={1}
              sm={2}
              md={2}
              lg={4}
              className="g-1"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "stretch",
              }}
            >
              {allSocialFlowData.map((item, idx) => (
                <Col key={idx} style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                      maxWidth: "400px",
                      margin: "auto",
                      textAlign: "center",
                      fontFamily: "arial",
                      backgroundColor: "#4d5f72",
                      display: "flex",
                      flexDirection: "column",
                      minHeight: "325px", // Set minimum height here
                    }}
                  >
                    <img
                      src={
                        item.photo ||
                        "//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                      }
                      alt="John"
                      style={{
                        width: "100%",
                        maxHeight: "150px",
                        minHeight: "150px",
                      }}
                    />

                    {/* <TruncateTitle
                      allData={allSocialFlowData}
                      title={item.title}
                    /> */}

                    <h4>
                      <strong style={{ color: "white" }}>
                        <u>{item.title}</u>
                      </strong>
                    </h4>

                    <TruncateContent content={item.content} />

                    <Button
                      style={{
                        border: "none",
                        outline: 0,
                        display: "inline-block",
                        padding: "8px",
                        backgroundColor: "#D8E5EB",
                        textAlign: "center",
                        cursor: "pointer",
                        width: "100%",
                        fontSize: "18px",
                        color: "#34495E",
                        fontWeight: "bold",
                        marginTop: "auto", // Push button to the bottom
                      }}
                      onClick={() => navigate("/social_flow")}
                    >
                      See Detail
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Home;
