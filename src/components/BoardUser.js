import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Navigate, useNavigate } from "react-router-dom";

const BoardUser = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [content, setContent] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    {
      currentUser &&
        UserService.getUserBoard().then(
          (response) => {
            console.log(response.data.body.data.records.first_name);
            setContent(response.data.body.data.records.first_name);
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
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardUser;
