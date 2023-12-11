import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Navigate, useNavigate } from "react-router-dom";

const AllUsers = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [content, setContent] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    {
      currentUser &&
        UserService.getUserAllContent().then(
          (response) => {
            const user_names = response.data.body.data.records;
            console.log(user_names);
            setContent(user_names);
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
        <h3>User Names</h3>
        {content.map((item) => (
          <ul key={item.id}>
            <li>{item.first_name}</li>
          </ul>
        ))}
        {/* <h3>{content}</h3> */}
      </header>
    </div>
  );
};

export default AllUsers;
