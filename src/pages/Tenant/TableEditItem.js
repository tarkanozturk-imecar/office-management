import React, { useState, useEffect } from "react";
import { Table, Button, Container, Form, Col, Row } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import {
  Navigate,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import UserService from "../../services/user.service";
import { FormattedMessage } from "react-intl";

const TableEditItem = () => {
  const { id } = useParams();

  let navigate = useNavigate();

  const editableFields = [
    "name",
    "adress",
    "phone_number",
    "latitude",
    "longitude",
  ];

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await UserService.getTenantContentById(id).then(async (response) => {
          const data = await response.json();
          setFormData(data.body.data.records);
        });
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.editTenantContent(id, formData).then(
        async (response) => {
          if (response.ok) {
            navigate("/tenant");
            console.log("Form submitted successfully", response);
          } else {
            console.error("Error submitting form:", response.statusText);
          }
        }
      );
    } catch (error) {
      console.error("Error fetching item data:", error);
    }
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            {editableFields.map((key) => (
              <Form.Group
                as={Col}
                md="4"
                controlId={`validationCustom${key}`}
                key={key}
              >
                <Form.Label>{key}</Form.Label>
                <Form.Control
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                />
              </Form.Group>
            ))}
          </Row>
          <Button type="submit">
            <FormattedMessage id="Submit Form" />
          </Button>
        </Form>
      </header>
    </div>
  );
};

export default TableEditItem;
