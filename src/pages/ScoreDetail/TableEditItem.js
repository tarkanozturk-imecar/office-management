import React, { useState, useEffect, useRef } from "react";
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

  console.log(id);

  let navigate = useNavigate();

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
        const response = await UserService.getScoreDetailContentById(id);
        const data = await response.json();
        console.log(data);
        console.log(data.body.data.records);
        setFormData({
          score: data.body.data.records.score,
          social_flow_id: id,
        });
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    const fetchSocialFlowIdData = async () => {
      try {
        await UserService.getSocialFlowAllContent().then(async (response) => {
          const data = await response.json();
          console.log(data);
          data.body.data.records.map((item) => {
            console.log(item.id);
          });
          const allSocialFlow = data.body.data.records;
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
    try {
      await UserService.editScoreDetailContent(formData).then(
        async (response) => {
          if (response.ok) {
            navigate("/social_flow");
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
                <Form.Label>User Score</Form.Label>
                {key === "score" ? (
                  <Form.Select
                    name="score"
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
                    <option hidden>Select Score</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </Form.Select>
                ) : key === "social_flow_id" ? (
                  <Form.Control
                    disabled
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  />
                ) : null}
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
