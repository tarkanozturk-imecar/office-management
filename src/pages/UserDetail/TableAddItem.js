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

  var regex = /\/userDetail\/add\/([^\/]+)/;
  var match = location.pathname.match(regex);

  if (match && match[1]) {
    var userID = match[1];
    console.log("QQQQ", userID);
  } else {
    console.log("No match found.");
  }

  /* console.log(location.pathname.split("/")[1]);

  let currentPage = location.pathname.split("/")[1];

  console.log(currentPage); */

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const filteredFormData = {
      user_id: userID || "",
      tags: formData.tags || "",
      business_phone: formData.business_phone || "",
      start_date_of_work: formData.start_date_of_work || "",
      blood_type: formData.blood_type || "",
      job_title: formData.job_title || "",
    };

    setFormData(filteredFormData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await UserService.addUserDetailContent(formData).then(
        async (response) => {
          console.log(response);
          if (response.ok) {
            navigate(`/userDetail/user/${userID}`);
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
              <Form.Label>User ID</Form.Label>
              <Form.Control disabled type="text" value={userID} />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={(e) =>
                  setFormData({ ...formData, job_title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomdate_of_birth"
            >
              <Form.Label>Start Date of Work</Form.Label>
              <Form.Control
                type="date"
                name="start_date_of_work"
                value={formData.start_date_of_work}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    start_date_of_work: e.target.value,
                  })
                }
              />
            </Form.Group>
            {/* <Form.Group
              as={Col}
              md="4"
              controlId="validationCustombusiness_phone"
            >
              <Form.Label>Business Phone</Form.Label>
              <Form.Control
                type="tel"
                name="business_phone"
                value={formData.business_phone}
                onChange={(e) =>
                  setFormData({ ...formData, business_phone: e.target.value })
                }
              />
            </Form.Group> */}
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </header>
    </div>
  );
};

export default TableAddItem;
