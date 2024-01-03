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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TableAddItem = () => {
  let navigate = useNavigate();

  let location = useLocation();

  console.log(location.pathname.split("/")[1]);

  let currentPage = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const filteredFormData = {
      type_of: formData.type_of || "",
      content: formData.content || "",
    };

    setFormData(filteredFormData);
  }, []);

  const showToastMessage = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await UserService.addRaporContent(formData).then(async (response) => {
        console.log(response);
        if (response.ok) {
          navigate("/rapor");
          console.log("Form submitted successfully", response);
        } else {
          //DISPLAY ERROR MESSAGE FOR USER
          const errorData = await response.json();
          const errorMessage = errorData.header.messages[0].desc;
          showToastMessage(errorMessage);

          console.error("Error submitting form:", response.statusText);
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <header className="jumbotron">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustomtype_of">
              <Form.Label>Type of</Form.Label>
              <Form.Select
                name="type_of"
                value={formData.type_of}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type_of: parseInt(e.target.value, 10) || "",
                  })
                }
              >
                <option hidden>Select a type of</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomcontent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                name="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
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
