import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { addData } from "../../services/test.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TableAddItem = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let currentPageName = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({
    type_of: "",
    content: "",
  });

  const [isTypeOfReportSelected, setIsTypeOfReportSelected] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  /* useEffect(() => {
    const filteredFormData = {
      type_of: formData.type_of || "",
      content: formData.content || "",
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

    setFormSubmitted(true);

    try {
      await addData(currentPageName, formData).then(async (response) => {
        if (response.header.status !== 400) {
          navigate("/report");
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
            <Form.Group as={Col} md="4" controlId="validationCustomtype_of">
              <Form.Label>
                Type of Report<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Select
                name="type_of"
                value={formData.type_of}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    type_of: parseInt(e.target.value, 10) || "",
                  });
                  setIsTypeOfReportSelected(true);
                }}
                isInvalid={!isTypeOfReportSelected && formSubmitted}
              >
                <option hidden>Select Report Type</option>
                <option value="1">Weekly Report</option>
                <option value="2">Daily Report</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomcontent">
              <Form.Label>
                Content<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                as="textarea"
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
