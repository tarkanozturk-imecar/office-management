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

  useEffect(() => {
    const filteredFormData = {
      name: formData.name || "",
      status: formData.status || "",
    };

    setFormData(filteredFormData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await UserService.addSocialFlowTypeContent(formData).then(
        async (response) => {
          console.log(response);
          if (response.ok) {
            navigate("/social_flow_type");
            console.log("Form submitted successfully", response);
          } else {
            console.error("Error submitting form:", response.statusText);
          }
        }
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </header>
    </div>
  );
};

export default TableAddItem;
