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
            //console.log(response.data.body.data.records);
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
                }}
                className="mb-4"
              >
                <h3>
                  <strong style={{ color: "white" }}>Profile Info</strong>
                </h3>
              </Row>
              <Row>
                <Col
                  md={4}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  {content.photo ? (
                    <img
                      src={content.photo}
                      alt=""
                      style={{ maxWidth: "300px", borderRadius: "50%" }}
                    />
                  ) : (
                    <img
                      style={{ maxWidth: "300px", borderRadius: "50%" }}
                      alt="placeholder"
                      src={"//ssl.gstatic.com/accounts/ui/avatar_2x.png"}
                    />
                  )}
                </Col>
                <Col md={{ span: 4 }}>
                  <div style={{ color: "white" }}>
                    <p>
                      <strong style={{ color: "grey" }}>
                        Name & Surname :{" "}
                      </strong>{" "}
                      {content.first_name} {content.last_name}
                    </p>
                    <p>
                      <strong style={{ color: "grey" }}>Role Name : </strong>{" "}
                      {content.role_name}
                    </p>
                    <p>
                      <strong style={{ color: "grey" }}>Company Name : </strong>{" "}
                      {content.company_name}
                    </p>
                    <p>
                      <strong style={{ color: "grey" }}>Email : </strong>{" "}
                      {content.email}
                    </p>
                    <p>
                      <strong style={{ color: "grey" }}>
                        Date of Birth :{" "}
                      </strong>{" "}
                      {content.date_of_birth}
                    </p>
                    <p>
                      <strong style={{ color: "grey" }}>Phone Number : </strong>{" "}
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
