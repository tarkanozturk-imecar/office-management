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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getFunction =
          currentPage === "user"
            ? UserService.getUserAllContent
            : currentPage === "company"
            ? UserService.getCompanyAllContent
            : null;
        if (getFunction) {
          await getFunction().then(async (response) => {
            console.log(response.data.body.data.records);
            const allData = response.data.body.data.records;

            const fieldKeys = Object.keys(allData[0]);
            setFormFields(fieldKeys);

            const initialFormData = {};
            fieldKeys.forEach((field) => {
              initialFormData[field] = "";
            });
            setFormData(initialFormData);
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
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
    }
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            {formFields.map((field) => (
              <Form.Group
                as={Col}
                md="4"
                controlId={`validationCustom${field}`}
                key={field}
              >
                <Form.Label>{field}</Form.Label>
                <Form.Control
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                />
              </Form.Group>
            ))}
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </header>
    </div>
  );
};

export default TableAddItem;
