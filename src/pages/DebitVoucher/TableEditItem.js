import React, { useState, useEffect } from "react";
import { Table, Button, Container, Form, Col, Row } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import {
  Navigate,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import UserService from "../../services/user.service";

const TableEditItem = () => {
  const { id } = useParams();

  let navigate = useNavigate();

  const fieldLabels = {
    title: "Title",
    serial_number: "Serial Number",
    quantity: "Quantity",
    description: "Description",
    material_status_text: "Material Status Text",
    /* owner_user_id: formData.owner_user_id || "", */
    /* active_debit_request: "Active Debit Request", */
    /* status: "Status", */
  };

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await UserService.getDebitVoucherContentById(id).then(
          async (response) => {
            const data = await response.json();
            setFormData(data.body.data.records);
          }
        );
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.editDebitVoucherContent(id, formData).then(
        async (response) => {
          if (response.ok) {
            navigate("/debit_voucher");
            console.log("Form submitted successfully", response);
          } else {
            console.error("Error submitting form:", response.statusText);
          }
        }
      );
    } catch (error) {
      console.error("Error fetching item data:", error);
    }
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            {Object.keys(fieldLabels).map((key) => (
              <Form.Group
                as={Col}
                md="4"
                controlId={`validationCustom${key}`}
                key={key}
              >
                <Form.Label>{fieldLabels[key]}</Form.Label>
                {key === "quantity" ? (
                  <Form.Select
                    name="quantity"
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [key]:
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
                ) : (
                  <Form.Control
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  />
                )}
              </Form.Group>
            ))}
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </header>
    </div>
  );
};

export default TableEditItem;
