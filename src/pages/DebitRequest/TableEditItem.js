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
    debit_status: "Debit Status",
    status: "Status",
  };

  const [formData, setFormData] = useState({
    debit_status: "Debit Status",
    status: "Status",
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
          navigate("/debit_request");
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
                {key === "debit_status" ? (
                  <Form.Check
                    type="checkbox"
                    name="debit_status"
                    checked={formData.debit_status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        debit_status: e.target.checked ? 1 : 0,
                      })
                    }
                  />
                ) : (
                  <Form.Check
                    type="checkbox"
                    name="status"
                    checked={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.checked ? 1 : 0,
                      })
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
