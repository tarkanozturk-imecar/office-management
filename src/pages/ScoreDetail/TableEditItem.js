import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getByIdData,
  editData,
  getData,
  scoreDetailUpdate,
} from "../../services/test.service";
import { FormattedMessage } from "react-intl";

const TableEditItem = () => {
  const { id } = useParams();

  let navigate = useNavigate();

  let location = useLocation();
  let currentPageName = location.pathname.split("/")[1];

  const fieldLabels = {
    score: "Score",
    social_flow_id: "Social Flow Name",
  };

  const [formData, setFormData] = useState({
    score: null,
    social_flow_id: id,
  });
  const [socialFlowData, setSocialFlowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getByIdData(currentPageName, id).then(async (response) => {
          setFormData({
            score: response.body.data.records.score,
            social_flow_id: id,
          });
        });
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    const fetchSocialFlowIdData = async () => {
      try {
        await getData("social_flow").then(async (response) => {
          const allSocialFlow = response.body.data.records;
          setSocialFlowData(allSocialFlow);
        });
      } catch (error) {
        console.error("Error fetching role data:", error);
      }
    };

    fetchData();
    fetchSocialFlowIdData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      await scoreDetailUpdate(formData).then(async (response) => {
        if (response) {
          navigate("/social_flow");
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
                {key !== "social_flow_id" && (
                  <Form.Label>{fieldLabels[key]}</Form.Label>
                )}
                {key === "score" ? (
                  <Form.Select
                    name="score"
                    value={formData[key] !== null ? formData[key] : ""}
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
                    <option hidden>Select Score</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </Form.Select>
                ) : key === "social_flow_id" ? null /* <Form.Control
                    disabled
                    type="text"
                    name="Score ID"
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  /> */ : null}
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
