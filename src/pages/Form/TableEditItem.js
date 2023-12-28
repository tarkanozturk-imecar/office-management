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
    "form_type_id",
    "leave_start_date",
    "end_of_leave",
    "note",
  ];

  const [formData, setFormData] = useState({});
  const [formTypeData, setFormTypeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getFormContentById(id);
        const data = await response.json();
        setFormData(data.body.data.records);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    const fetchFormTypeData = async () => {
      try {
        await UserService.getFormTypeAllContent().then(async (response) => {
          const allFormTypes = response.data.body.data.records;
          setFormTypeData(allFormTypes);
        });
      } catch (error) {
        console.error("Error fetching role data:", error);
      }
    };

    fetchData();
    fetchFormTypeData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.editFormContent(id, formData).then(async (response) => {
        if (response.ok) {
          navigate("/form");
          console.log("Form submitted successfully", response);
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      });
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
                {key === "form_type_id" ? (
                  <Form.Select
                    name={key}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  >
                    <option hidden>Select Form Type Id</option>
                    {formTypeData.map((formType) => (
                      <option key={formType.id} value={formType.id}>
                        {formType.name}
                      </option>
                    ))}
                  </Form.Select>
                ) : key === "leave_start_date" ? (
                  <Form.Control
                    type="datetime-local"
                    name={key}
                    value={
                      formData[key]
                        ? new Date(formData[key]).toISOString().slice(0, 16)
                        : ""
                    }
                    onChange={(e) => {
                      const selectedDateTime = new Date(e.target.value + ":00"); // Adding ":00" for seconds
                      const localOffset =
                        selectedDateTime.getTimezoneOffset() * 60000; // Offset in milliseconds
                      const correctedDateTime = new Date(
                        selectedDateTime.getTime() - localOffset
                      );
                      const formattedDateTime = correctedDateTime.toISOString(); // Use the full ISO string

                      setFormData({ ...formData, [key]: formattedDateTime });
                    }}
                  />
                ) : key === "end_of_leave" ? (
                  <Form.Control
                    type="datetime-local"
                    name={key}
                    value={
                      formData[key]
                        ? new Date(formData[key]).toISOString().slice(0, 16)
                        : ""
                    }
                    onChange={(e) => {
                      const selectedDateTime = new Date(e.target.value + ":00"); // Adding ":00" for seconds
                      const localOffset =
                        selectedDateTime.getTimezoneOffset() * 60000; // Offset in milliseconds
                      const correctedDateTime = new Date(
                        selectedDateTime.getTime() - localOffset
                      );
                      const formattedDateTime = correctedDateTime.toISOString(); // Use the full ISO string

                      setFormData({ ...formData, [key]: formattedDateTime });
                    }}
                  />
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
