import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";
import { Navigate, useNavigate } from "react-router-dom";
import EventBus from "../common/EventBus";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [content, setContent] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    {
      currentUser &&
        UserService.getUserBoard().then(
          (response) => {
            console.log(response.data.body.data.records);
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

  console.log("****", currentUser);

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
          <header className="jumbotron">
            <h3>
              <strong>Profile</strong>
            </h3>
            <p>
              <strong>Name & Surname : </strong> {content.first_name}{" "}
              {content.last_name}
            </p>
            <p>
              <strong>Role Name : </strong> {content.role_name}
            </p>
            <p>
              <strong>Company Name : </strong> {content.company_name}
            </p>
            <p>
              <strong>Email : </strong> {content.email}
            </p>
            <p>
              <strong>Date of Birth : </strong> {content.date_of_birth}
            </p>
            <p>
              <strong>Phone Number : </strong> {content.phone_number}
            </p>
          </header>
        </>
        /* <>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>Access Token : </strong> {currentUser.access_token}
          </p>
          <p>
            <strong>Refresh Token : </strong> {currentUser.refresh_token}
          </p>
          <p>
            <strong>Token Type : </strong>
            {currentUser.token_type}
          </p>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
        </> */
      )}
    </div>
  );
};

export default Profile;
