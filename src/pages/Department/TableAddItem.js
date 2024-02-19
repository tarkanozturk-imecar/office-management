import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { addData, getData } from "../../services/test.service";
import { FormattedMessage } from "react-intl";

const TableAddItem = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let currentPageName = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({
    name: "",
    company_id: "", // Initialize as an empty string
    status: "",
  });

  const [companyData, setCompanyData] = useState([]);

  const [isCompanySelected, setIsCompanySelected] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getData("company").then(async (response) => {
          setCompanyData(response.body.data.records);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addData(currentPageName, formData).then(async (response) => {
        if (response) {
          navigate("/department");
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
            <Form.Group as={Col} md="4" controlId="validationCustomcompany_id">
              <Form.Label>
                Company<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Select
                name="company_id"
                value={formData.company_id}
                onChange={(e) => {
                  setFormData({ ...formData, company_id: e.target.value });
                  setIsCompanySelected(true);
                }}
                isInvalid={!isCompanySelected && formSubmitted}
              >
                <option hidden>Select Company</option>
                {companyData.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a Company.
              </Form.Control.Feedback>
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
