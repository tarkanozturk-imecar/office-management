import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { addData } from "../../services/test.service";
import { FormattedMessage } from "react-intl";

const TableAddItem = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let currentPageName = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({ name: "", status: "" });

  useEffect(() => {
    const filteredFormData = {
      name: formData.name || "",
      status: formData.status || "",
    };

    setFormData(filteredFormData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addData(currentPageName, formData).then(async (response) => {
        if (response) {
          navigate("/social_flow_type");
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
              <Form.Label>
                Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
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
