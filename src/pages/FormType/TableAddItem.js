import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { addData } from "../../services/test.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from "react-intl";

const TableAddItem = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let currentPageName = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({ name: "", has_time: Boolean() });

  /* useEffect(() => {
    const filteredFormData = {
      name: formData.name || "",
      has_time: formData.has_time || false, //Default false
    };

    setFormData(filteredFormData);
  }, []); */

  const showToastMessage = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addData(currentPageName, formData).then(async (response) => {
        if (response.header.status !== 400) {
          navigate("/form_type");
          console.log("Form submitted successfully");
        } else {
          //DISPLAY ERROR MESSAGE FOR USER
          const errorMessage = response.header.messages[0].desc;
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
            <Form.Group as={Col} md="4" controlId="validationCustomname">
              <Form.Label>
                Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>
                Has Time<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Check
                type="checkbox"
                name="has_time"
                checked={formData.has_time}
                onChange={(e) =>
                  setFormData({ ...formData, has_time: e.target.checked })
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
