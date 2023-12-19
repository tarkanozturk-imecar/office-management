import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Form,
  Col,
  Row,
  InputGroup,
} from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";

const TableAddItem = () => {
  let navigate = useNavigate();

  let location = useLocation();

  console.log(location.pathname.split("/")[1]);

  let currentPage = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [roleData, setRoleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Getting the role_id for User Create
        await UserService.getRoleAllContent().then(async (response) => {
          /* console.log(response.data.body.data.records); */
          const allRoles = response.data.body.data.records;
          setRoleData(allRoles);
          /* const allData = response.data.body.data.records;

            const fieldKeys = Object.keys(allData[0]);
            setFormFields(fieldKeys);

            const initialFormData = {};
            fieldKeys.forEach((field) => {
              initialFormData[field] = "";
            });
            setFormData(initialFormData);
          }); */
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredFormData = {
      first_name: formData.first_name || "",
      last_name: formData.last_name || "",
      email: formData.email || "",
      password: formData.password || "",
      phone_number: formData.phone_number || "",
      date_of_birth: formData.date_of_birth || "",
      tenant_id: "55871330-723f-4e4b-b71f-90c9909efa8c",
      //tenant_id: formData.tenant_id || "",
      role_id: formData.role_id || "",
    };

    setFormData(filteredFormData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await UserService.addUserContent(formData).then(async (response) => {
        console.log(response);
        if (response.ok) {
          navigate("/user");
          console.log("Form submitted successfully", response);
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    /* try {
      const addFunction =
        currentPage === "user"
          ? UserService.addUserContent
          : currentPage === "company"
          ? UserService.addCompanyContent
          : null;
      if (addFunction) {
        await addFunction(formData).then(async (response) => {
          if (response.ok) {
            navigate("/company");
            console.log("Form submitted successfully", response);
          } else {
            console.error("Error submitting form:", response.statusText);
          }
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } */
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/* Render specified fields manually */}
            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>first_name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomlast_name">
              <Form.Label>last_name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomemail">
              <Form.Label>email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustompassword">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomphone_number"
            >
              <Form.Label>phone_number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomdate_of_birth"
            >
              <Form.Label>date_of_birth</Form.Label>
              <Form.Control
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={(e) =>
                  setFormData({ ...formData, date_of_birth: e.target.value })
                }
              />
            </Form.Group>
            {/* <Form.Group as={Col} md="4" controlId="validationCustomtenant_id">
              <Form.Label>tenant_id</Form.Label>
              <Form.Control
                type="text"
                name="tenant_id"
                value={formData.tenant_id}
                onChange={(e) =>
                  setFormData({ ...formData, tenant_id: e.target.value })
                }
              />
            </Form.Group> */}
            {/* <Form.Group as={Col} md="4" controlId="validationCustomrole_id">
              <Form.Label>role_id</Form.Label>
              <Form.Control
                type="text"
                name="role_id"
                value={formData.role_id}
                onChange={(e) =>
                  setFormData({ ...formData, role_id: e.target.value })
                }
              />
            </Form.Group> */}
            <Form.Group as={Col} md="4" controlId="validationCustomrole_id">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role_id"
                value={formData.role_id}
                onChange={(e) =>
                  setFormData({ ...formData, role_id: e.target.value })
                }
              >
                <option value="">Select Role</option>
                {roleData.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </header>
    </div>
  );
};

export default TableAddItem;
