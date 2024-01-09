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

  //console.log(location.pathname.split("/")[1]);

  let currentPage = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const filteredFormData = {
      title: formData.title || "",
      serial_number: formData.serial_number || "",
      quantity: formData.quantity || "",
      description: formData.description || "",
      material_status_text: formData.material_status_text || "",
      /* owner_user_id: formData.owner_user_id || "", */
    };

    setFormData(filteredFormData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await UserService.addDebitVoucherContent(formData).then(
        async (response) => {
          console.log(response);
          if (response.ok) {
            navigate("/debit_voucher");
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
            <Form.Group as={Col} md="4" controlId="validationCustomTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomTitle">
              <Form.Label>Serial Number</Form.Label>
              <Form.Control
                required
                type="text"
                name="Serial Number"
                value={formData.serial_number}
                onChange={(e) =>
                  setFormData({ ...formData, serial_number: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomStatus">
              <Form.Label>Quantity</Form.Label>
              <Form.Select
                name="quantity"
                value={formData.quantity || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity:
                      e.target.value !== "null"
                        ? parseInt(e.target.value, 10)
                        : null,
                  })
                }
              >
                <option hidden>Select Quantity</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomdescription">
              <Form.Label>description</Form.Label>
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
              <Form.Label>Material Status Text</Form.Label>
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
