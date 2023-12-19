import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import Profile from "./pages/Profile";

import User from "./pages/User/User";
import Source from "./pages/Source/Source";
import Tenant from "./pages/Tenant/Tenant";
import Company from "./pages/Company/Company";
import Permission from "./pages/Permission/Permission";
import Module from "./pages/Module/Module";
import Role from "./pages/Role/Role";
import Department from "./pages/Department/Department";
import UserDetail from "./pages/UserDetail/UserDetail";
import Calendar from "./pages/Calendar/Calendar";
import SocialFlow from "./pages/SocialFlow/SocialFlow";
import SocialFlowType from "./pages/SocialFlowType/SocialFlowType";
import Form from "./pages/Form/Form";
import ScoreDetail from "./pages/ScoreDetail/ScoreDetail";
import FormType from "./pages/FormType/FormType";
import DebitVoucher from "./pages/DebitVoucher/DebitVoucher";
import DebitRequest from "./pages/DebitRequest/DebitRequest";
import CalendarType from "./pages/CalendarType/CalendarType";

//TABLE ROUTES
import TableAddItemUser from "./pages/User/TableAddItem";
import TableEditItemUser from "./pages/User/TableEditItem";

import TableAddItemCompany from "./pages/Company/TableAddItem";
import TableEditItemCompany from "./pages/Company/TableEditItem";

import TableAddItemRole from "./pages/Role/TableAddItem";
import TableEditItemRole from "./pages/Role/TableEditItem";

import TableAddItemSource from "./pages/Source/TableAddItem";
import TableEditItemSource from "./pages/Source/TableEditItem";

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

  console.log(location);

  const navigate = useNavigate();

  const { id } = useParams();

  const getELement = (item) => {
    const route_name = item.name;
    /* console.log(item); */

    if (route_name == "user") {
      return <User PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "source") {
      return <Source PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "tenant") {
      return <Tenant PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "company") {
      return <Company PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "permission") {
      return <Permission PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "module") {
      return <Module PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "role") {
      return <Role PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "department") {
      return <Department PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "userDetail") {
      return <UserDetail PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "calendar") {
      return <Calendar PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "socialFlow") {
      return <SocialFlow PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "socialFlowType") {
      return <SocialFlowType PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "form") {
      return <Form PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "scoreDetail") {
      return <ScoreDetail PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "form_type") {
      return <FormType PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "debit_voucher") {
      return <DebitVoucher PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "debit_request") {
      return <DebitRequest PageName={item.name} CRUDdata={item} />;
    } else if (route_name == "calendarType") {
      return <CalendarType PageName={item.name} CRUDdata={item} />;
    } else {
      return <NotFound name={item.name} CRUDdata={item} />;
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
        UserService.getProfileContent().then((response) => {
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
          //console.log("Module", response.data.body.data.records.modules);
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

  //console.log("Current User: ", currentUser);

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary" /* bg="dark" data-bs-theme="dark" */
      >
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

          <Route path="/company/add" element={<TableAddItemCompany />} />
          <Route path="/company/edit/:id" element={<TableEditItemCompany />} />

          <Route path="/user/add" element={<TableAddItemUser />} />
          <Route path="/user/edit/:id" element={<TableEditItemUser />} />

          <Route path="/role/add" element={<TableAddItemRole />} />
          <Route path="/role/edit/:id" element={<TableEditItemRole />} />

          <Route path="/source/add" element={<TableAddItemSource />} />
          <Route path="/source/edit/:id" element={<TableEditItemSource />} />

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
