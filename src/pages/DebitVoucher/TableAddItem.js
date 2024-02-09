import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { addData } from "../../services/test.service";

const TableAddItem = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let currentPageName = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({
    title: "",
    serial_number: "",
    quantity: null,
    description: "",
    material_status_text: "",
    /* owner_user_id: "", */
  });

  const [isQuantitySelected, setIsQuantitySelected] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    try {
      await addData(currentPageName, formData).then(async (response) => {
        if (response) {
          navigate("/debit_voucher");
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
            <Form.Group as={Col} md="4" controlId="validationCustomtitle">
              <Form.Label>
                Title<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const onlyTurkishCharactersWithSpaces =
                    /^[A-Za-zÇçĞğİıÖöŞşÜü\s]+$/;

                  if (
                    onlyTurkishCharactersWithSpaces.test(inputValue) ||
                    inputValue === ""
                  ) {
                    setFormData({ ...formData, title: inputValue });
                  }
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomTitle">
              <Form.Label>
                Serial Number<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="Serial Number"
                value={formData.serial_number}
                onChange={(e) => {
                  // Remove non-numeric characters
                  const numericValue = e.target.value.replace(/\D/g, "");

                  setFormData({ ...formData, serial_number: numericValue });
                }}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomStatus">
              <Form.Label>
                Quantity<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Select
                required
                name="quantity"
                value={formData.quantity || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    quantity:
                      e.target.value !== "null"
                        ? parseInt(e.target.value, 10)
                        : null,
                  });
                  setIsQuantitySelected(true);
                }}
                isInvalid={!isQuantitySelected && formSubmitted}
              >
                <option hidden>Select Quantity</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a Quantity.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomdescription">
              <Form.Label>
                Description<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomMaterial_status_text"
            >
              <Form.Label>
                Material Status Text<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="material_status_text"
                value={formData.material_status_text}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    material_status_text: e.target.value,
                  })
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
