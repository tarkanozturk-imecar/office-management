import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getByIdData, editData } from "../../services/test.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from "react-intl";

const TableEditItem = () => {
  const { id } = useParams();

  let navigate = useNavigate();

  let location = useLocation();
  let currentPageName = location.pathname.split("/")[1];

  const fieldLabels = {
    name: "Name",
    has_time: "Has Time",
  };

  const showToastMessage = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const [formData, setFormData] = useState({ name: "", has_time: Boolean() });

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
                {key === "has_time" ? (
                  <Form.Check
                    type="checkbox"
                    name={key}
                    checked={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, has_time: e.target.checked })
                    }
                  />
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
