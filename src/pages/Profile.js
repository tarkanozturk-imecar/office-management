import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";
import { Navigate, useNavigate } from "react-router-dom";
import EventBus from "../common/EventBus";
import { Button, Container, Card, Row, Col, Stack } from "react-bootstrap";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [content, setContent] = useState("");

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

  //console.log("****", currentUser);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      {!currentUser ? (
        <>
          <header className="jumbotron">
            <h3>
              <strong>Token has expired</strong>
            </h3>
          </header>
        </>
      ) : (
        <>
          <Container fluid>
            <Container
              style={{
                backgroundColor: "#34495E",
                border: "2px solid #D1D8E0",
              }}
            >
              <Row
                style={{
                  borderBottom: "2px solid #D1D8E0",
                  backgroundColor: "#55687a",
                }}

                /* className="mb-4" */
              >
                <Col sm={{ paddingTop: "10px" }}>
                  <h3>
                    <strong style={{ color: "#d8e5eb" }}>Profile Info</strong>
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col
                  md={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    /* marginBottom: "1rem", */
                    borderRight: "2px solid #D1D8E0",
                    paddingTop: "10px",
                  }}
                  sm={{ borderBottom: "2px solid #D1D8E0" }}
                >
                  {content.photo ? (
                    <img
                      src={content.photo}
                      alt=""
                      style={{
                        maxWidth: "250px",
                        maxHeight: "250px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <img
                      style={{
                        maxWidth: "250px",
                        maxHeight: "250px",
                        borderRadius: "50%",
                      }}
                      alt="placeholder"
                      src={"//ssl.gstatic.com/accounts/ui/avatar_2x.png"}
                    />
                  )}
                </Col>

                <Col
                  md={{ span: 6 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <div style={{ color: "white" }}>
                    <p>
                      <strong style={{ color: "#d8e5eb" }}>
                        Name & Surname :{" "}
                      </strong>{" "}
                      {content.first_name} {content.last_name}
                    </p>
                    <p>
                      <strong style={{ color: "#d8e5eb" }}>Role Name : </strong>{" "}
                      {content.role_name}
                    </p>
                    <p>
                      <strong style={{ color: "#d8e5eb" }}>
                        Company Name :{" "}
                      </strong>{" "}
                      {content.company_name}
                    </p>
                    <p>
                      <strong style={{ color: "#d8e5eb" }}>Email : </strong>{" "}
                      {content.email}
                    </p>
                    <p>
                      <strong style={{ color: "#d8e5eb" }}>
                        Date of Birth :{" "}
                      </strong>{" "}
                      {content.date_of_birth}
                    </p>
                    <p>
                      <strong style={{ color: "#d8e5eb" }}>
                        Phone Number :{" "}
                      </strong>{" "}
                      {content.phone_number}
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </Container>
        </>
      )}
    </div>
  );
};

export default Profile;
