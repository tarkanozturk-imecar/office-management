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
import { FormattedMessage } from "react-intl";

const TableAddItem = () => {
  let navigate = useNavigate();

  let location = useLocation();

  console.log(location.pathname.split("/")[1]);

  let currentPage = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const filteredFormData = {
      name: formData.name || "",
      adress: formData.adress || "",
      phone_number: formData.phone_number || "",
      latitude: formData.latitude || "",
      longitude: formData.longitude || "",
    };

    setFormData(filteredFormData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await UserService.addTenantContent(formData).then(async (response) => {
        console.log(response);
        if (response.ok) {
          navigate("/tenant");
          console.log("Form submitted successfully", response);
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      });
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
            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>Adress</Form.Label>
              <Form.Control
                type="text"
                name="adress"
                value={formData.adress}
                onChange={(e) =>
                  setFormData({ ...formData, adress: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
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
            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>latitude</Form.Label>
              <Form.Control
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={(e) =>
                  setFormData({ ...formData, latitude: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>longitude</Form.Label>
              <Form.Control
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={(e) =>
                  setFormData({ ...formData, longitude: e.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Button type="submit">
            <FormattedMessage id="Submit Form" />
          </Button>
        </Form>
      </header>
    </div>
  );
};

export default TableAddItem;
