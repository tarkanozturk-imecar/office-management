import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Modules from "./components/Modules";
import Permissions from "./components/Permissions";
import AllUsers from "./components/AllUsers";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

import UserService from "./services/user.service";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const [content, setContent] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  let location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser && location.pathname === "/") {
      // If user is not logged in and accessing the root route, navigate to login
      navigate("/login");
    }
  }, [currentUser, location, navigate]);

  useEffect(() => {
    {
      currentUser &&
        UserService.getUserBoard().then((response) => {
          /* console.log(response.data.body.data.records.first_name); */
          setContent(response.data.body.data.records.first_name);
        });
    }
  }, []);

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      console.log("Login yapıldı");
      /* setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN")); */
    } else {
      console.log("LogOut yapıldı");
      /* setShowModeratorBoard(false);
      setShowAdminBoard(false); */
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {/* <Link to={"/"} className="navbar-brand">
          Imecar
        </Link> */}
        <a
          href="https://www.imecar.com"
          className="navbar-brand"
          target="_blank"
        >
          Imecar
        </a>
        <div className="navbar-nav mr-auto">
          {currentUser && (
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User Info
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/allUsers"} className="nav-link">
                All Users
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/modules"} className="nav-link">
                Modules
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/permissions"} className="nav-link">
                Permissions
              </Link>
            </li>
          )}

          {/* {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )} */}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {content}
                {/* {currentUser.username} */}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/allUsers" element={<AllUsers />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
