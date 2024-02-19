import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getByIdData, editData } from "../../services/test.service";
import { FormattedMessage } from "react-intl";

const TableEditItem = () => {
  const { id } = useParams();

  let navigate = useNavigate();

  let location = useLocation();
  let currentPageName = location.pathname.split("/")[1];

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

  const [formData, setFormData] = useState({
    title: "",
    serial_number: "",
    quantity: null, // or a default value that makes sense
    description: "",
    material_status_text: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getByIdData(currentPageName, id).then(async (response) => {
          setFormData(response.body.data.records);
        });
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editData(currentPageName, id, formData).then(async (response) => {
        if (response) {
          navigate("/debit_voucher");
          console.log("Form submitted successfully", response);
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      });
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
                    value={formData[key] || ""} // Set value to empty string if null
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
          <Button type="submit">
            <FormattedMessage id="Submit Form" />
          </Button>
        </Form>
      </header>
    </div>
  );
};

export default TableEditItem;
