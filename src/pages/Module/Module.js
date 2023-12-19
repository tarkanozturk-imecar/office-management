import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import { Navigate, useNavigate } from "react-router-dom";

const Module = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [content, setContent] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    {
      currentUser &&
        UserService.getUserModules().then(
          (response) => {
            //console.log(response.data.body.data);
            const module_list = response.data.body.data.records;
            /* const user_names = response.data.body.data.records;
            console.log(user_names); */
            /* setContent(module_list); */
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
        <h3>Module</h3>
        {/* {content.map((item) => (
          <ul key={item.id}>
            <li>{item.name}</li>
          </ul>
        ))} */}
      </header>
    </div>
  );
};

export default Module;
