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

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

const TableAddItem = () => {
  let navigate = useNavigate();

  let location = useLocation();

  const handleFormSubmit = async (values) => {
    console.log("DEĞERRR", values);
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      await UserService.addCompanyContent(values).then((response) => {
        if (response.ok) {
          navigate("/company");
          console.log("Form submitted successfully", response);
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const formikProps = formik.useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <div className="container">
      <header className="jumbotron">
        <Form noValidate onSubmit={formikProps.handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formikProps.values.name}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                isInvalid={formikProps.touched.name && formikProps.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formikProps.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </header>
    </div>
  );
};

export default TableAddItem;
