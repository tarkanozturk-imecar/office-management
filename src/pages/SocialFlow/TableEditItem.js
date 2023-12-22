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

const TableEditItem = () => {
  const { id } = useParams();

  let navigate = useNavigate();

  const editableFields = [
    "socialFlow_type_id",
    "start_of_display",
    "title",
    "content",
    "photo",
    "score",
  ];

  const [formData, setFormData] = useState({});
  const [socialFlowTypeData, setSocialFlowTypeData] = useState([]);

  const [roleData, setRoleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUserContentById(id);
        const data = await response.json();
        setFormData(data.body.data.records);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    const fetchSocialFlowTypeData = async () => {
      try {
        await UserService.getSocialFlowTypeAllContent().then(
          async (response) => {
            const allSocialFlowTypes = response.data.body.data.records;
            setSocialFlowTypeData(allSocialFlowTypes);
          }
        );
      } catch (error) {
        console.error("Error fetching role data:", error);
      }
    };

    fetchData();
    fetchSocialFlowTypeData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.editSocialFlowContent(id, formData).then(
        async (response) => {
          if (response.ok) {
            navigate("/socialFlow");
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
                {key === "date_of_birth" ? (
                  <Form.Control
                    type="date"
                    name={key}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  />
                ) : key === "role_id" ? (
                  <Form.Select
                    name={key}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  >
                    <option value="">Select a role</option>
                    {roleData.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </Form.Select>
                ) : (
                  <Form.Control
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  />
                )}
              </Form.Group>
            ))}
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </header>
    </div>
  );
};

export default TableEditItem;
