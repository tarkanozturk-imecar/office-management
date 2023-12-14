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

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import Profile from "./pages/Profile";
import User from "./pages/User/User";
import Role from "./pages/Role/Role";

import Source from "./pages/Source";
import Tenant from "./pages/Tenant";
import Module from "./pages/Module";
import Permissions from "./pages/Permissions";
import FormType from "./pages/FormType";
import Company from "./pages/Company/Company";
import Form from "./pages/Form";
import NotFound from "./pages/NotFound";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

import UserService from "./services/user.service";
import { BorderAllRounded } from "@material-ui/icons";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const [content, setContent] = useState("");

  const [navbarContent, setNavbarContent] = useState([]);

  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  let location = useLocation();

  const navigate = useNavigate();

  const getELement = (item) => {
    const route_name = item.name;
    /* console.log(item); */
    if (route_name == "source") {
      return <Source PageName={item.name} />;
    } else if (route_name == "tenant") {
      return <Tenant PageName={item.name} />;
    } else if (route_name == "role") {
      return <Role PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "module") {
      return <Module PageName={item.name} />;
    } else if (route_name == "permission") {
      return <Permissions PageName={item.name} />;
    } else if (route_name == "form_type") {
      return <FormType PageName={item.name} />;
    } else if (route_name == "company") {
      return <Company PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "form") {
      return <Form PageName={item.name} />;
    } else if (route_name == "user") {
      return <User PageName={item.name} CRUDdata={item} />;
    } else {
      return <NotFound name={item.name} />;
    }
  };

  useEffect(() => {
    if (!currentUser && location.pathname === "/") {
      // If user is not logged in and accessing the root route, navigate to login
      navigate("/login");
    }
  }, [currentUser, location, navigate]);

  //Getting From /user/me
  useEffect(() => {
    {
      currentUser &&
        UserService.getUserContent().then((response) => {
          /* console.log(response.data.body.data.records.first_name); */
          setContent(response.data.body.data.records.first_name);
        });
    }
  }, [currentUser]);

  //Getting data for NAVBAR from /user/me/?mode=2
  useEffect(() => {
    {
      currentUser &&
        UserService.getUserPermission().then((response) => {
          console.log("Module", response.data.body.data.records.modules);
          setNavbarContent(response.data.body.data.records.modules);
        });
    }
  }, [currentUser]);

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

  console.log("Current User: ", currentUser);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#home">
            <a
              href="https://www.imecar.com"
              className="navbar-brand"
              target="_blank"
            >
              <img
                src={process.env.PUBLIC_URL + "/iconlogo.svg"}
                alt="Imecar"
                width="30"
              />
              IMECAR
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {currentUser &&
                navbarContent.map((item) => (
                  <span key={item.id}>
                    <Link to={`/${item.name}`} className="nav-link">
                      {item.name}
                    </Link>
                  </span>
                ))}
            </Nav>

            <NavDropdown.Divider />

            {currentUser ? (
              <Nav>
                <Nav.Link href="/profile">{content}</Nav.Link>
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
                {/* <Nav.Link eventKey={2} href="/login" onClick={logOut}>
                  LogOut
                </Nav.Link> */}
              </Nav>
            ) : (
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link eventKey={2} href="/register">
                  Sign Up
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a
          href="https://www.imecar.com"
          className="navbar-brand"
          target="_blank"
        >
          <img
            src={process.env.PUBLIC_URL + "/iconlogo.svg"}
            alt="Imecar"
            width="30"
          />
          IMECAR
        </a>
        <div className="navbar-nav mr-auto">
          {currentUser &&
            navbarContent.map((item) => (
              <li className="nav-item" key={item.name}>
                <Link to={`/${item.name}`} className="nav-link">
                  {item.name}
                </Link>
              </li>
            ))}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {content}
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
      </nav> */}

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />

          {/* <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/module" element={<Module />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/company" element={<Company />} />
          <Route path="/user" element={<User />} /> */}

          {currentUser &&
            navbarContent.map((item) => (
              <Route
                key={item.name}
                path={`/${item.name}`}
                element={getELement(item)}
              />
            ))}
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
