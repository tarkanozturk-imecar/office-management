import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Container,
  Form,
  Col,
  Row,
  Stack,
} from "react-bootstrap";
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
    /* social_flow_type_id: "Social Flow Type ID", */
    start_of_display: "Start of Display",
    title: "Title",
    content: "Content",
    color: "Color",
    icon: "Icon",
    target: "Target",
    /* status: "Status", */
    end_of_display: "End Of Display",
    /* user_score: "User Score", */
    id: "Social Flow ID",
    photo: "Photo",
  };

  const [formData, setFormData] = useState({});

  const [social_flow_typeData, setSocialFlowTypeData] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const [responseImageURL, setResponseImageURL] = useState("");

  const [editedUserScore, setEditedUserScore] = useState("");
  const [editedSocialFlowId, setEditedSocialFlowId] = useState(
    formData.social_flow_id
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getSocialFlowContentById(id);
        const data = await response.json();
        //console.log(data.body.data.records.id);

        setFormData(data.body.data.records);

        const userScore = data.body.data.records.user_score;
        setEditedUserScore(isNaN(userScore) ? "" : userScore.toString());
        setEditedSocialFlowId(data.body.data.records.id);

        console.log(data.body.data.records);
        console.log(data.body.data.records.user_score);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    const fetchSocialFlowTypeData = async () => {
      try {
        await UserService.getSocialFlowTypeAllContent().then(
          async (response) => {
            const data = await response.json();

            const allSocialFlowTypes = data.body.data.records;
            setSocialFlowTypeData(allSocialFlowTypes);
          }
        );
      } catch (error) {
        console.error("Error fetching role data:", error);
      }
    };

    fetchData();
    fetchSocialFlowTypeData();
  }, [id]);

  const handleImageUpload = async () => {
    if (selectedImage) {
      try {
        const formImageData = new FormData();
        formImageData.append("file", selectedImage);

        console.log(selectedImage);

        UserService.uploadImageContent(formImageData).then(async (response) => {
          console.log(response);
          const responseData = await response.json();
          if (response.ok) {
            setFormData({ ...formData, photo: responseData.result });

            setResponseImageURL(responseData.result);

            console.log("Form submitted successfully", response);
          } else {
            console.error("Error submitting form:", response.statusText);
          }
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.warn("No image selected");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedImage(file);
  };

  useEffect(() => {
    if (selectedImage) {
      handleImageUpload();
    }
  }, [selectedImage]);

  const handleDeleteClick = () => {
    setSelectedImage(null);

    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Set the photo property in form data to an empty string
    setFormData({ ...formData, photo: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      /* const editedData = {
        score: editedUserScore,
        social_flow_id: editedSocialFlowId,
      };

      if (
        formData.user_score !== editedUserScore ||
        formData.social_flow_id !== editedSocialFlowId
      ) {
        await UserService.editScoreDetailContent(editedData).then(
          async (response) => {
            if (response.ok) {
              navigate("/social_flow");
              console.log("Form submitted successfully", response);
            } else {
              console.error("Error submitting form:", response.statusText);
            }
          }
        );
      } else { */
      // If not edited, proceed with your existing logic
      await UserService.editSocialFlowContent(
        editedSocialFlowId,
        formData
      ).then(async (response) => {
        if (response.ok) {
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
                <Form.Label>{fieldLabels[key]}</Form.Label>
                {key === "start_of_display" ? (
                  <Form.Control
                    type="datetime-local"
                    name={key}
                    value={
                      formData[key]
                        ? new Date(formData[key]).toISOString().slice(0, 16)
                        : ""
                    }
                    onChange={(e) => {
                      const selectedDateTime = new Date(e.target.value + ":00"); // Adding ":00" for seconds
                      const localOffset =
                        selectedDateTime.getTimezoneOffset() * 60000; // Offset in milliseconds
                      const correctedDateTime = new Date(
                        selectedDateTime.getTime() - localOffset
                      );
                      const formattedDateTime = correctedDateTime.toISOString(); // Use the full ISO string

                      setFormData({ ...formData, [key]: formattedDateTime });
                    }}
                  />
                ) : key === "social_flow_type_id" ? (
                  <Form.Select
                    name={key}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  >
                    <option hidden>Select a Social Flow Type</option>
                    {social_flow_typeData.map((social) => (
                      <option key={social.id} value={social.id}>
                        {social.name}
                      </option>
                    ))}
                  </Form.Select>
                ) : key === "end_of_display" ? (
                  <Form.Control
                    type="datetime-local"
                    name={key}
                    value={
                      formData[key]
                        ? new Date(formData[key]).toISOString().slice(0, 16)
                        : ""
                    }
                    onChange={(e) => {
                      const selectedDateTime = new Date(e.target.value + ":00"); // Adding ":00" for seconds
                      const localOffset =
                        selectedDateTime.getTimezoneOffset() * 60000; // Offset in milliseconds
                      const correctedDateTime = new Date(
                        selectedDateTime.getTime() - localOffset
                      );
                      const formattedDateTime = correctedDateTime.toISOString(); // Use the full ISO string

                      setFormData({ ...formData, [key]: formattedDateTime });
                    }}
                  />
                ) : key === "id" ? (
                  <Form.Control
                    disabled
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  />
                ) : key === "photo" ? (
                  <div
                    as={Col}
                    md="4"
                    controlId="validationCustomImage"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      paddingTop: "20px",
                      paddingBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        borderStyle: "solid",
                        borderWidth: "1px",
                        borderColor: "#ccc",
                        width: "250px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {formData[key] ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <img
                            style={{ marginTop: "20px" }}
                            width={"150px"}
                            height={"150px"}
                            src={formData[key]}
                          />
                          <button
                            onClick={handleDeleteClick}
                            style={{
                              marginTop: "10px",
                              marginBottom: "10px",
                              backgroundColor: "red",
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <img
                          style={{ marginTop: "20px" }}
                          alt="placeholder"
                          width={"150px"}
                          height={"150px"}
                          src="https://placehold.jp/150x150.png?text=Image"
                        />
                      )}

                      {formData[key] ? (
                        ""
                      ) : (
                        <>
                          <label
                            htmlFor="file-upload"
                            className="custom-file-upload"
                          >
                            <i className="fa fa-cloud-upload"></i> Upload Image
                          </label>
                          <input
                            id="file-upload"
                            type="file"
                            name="myImage"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                          />
                        </>
                      )}
                    </div>
                  </div>
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
          <Stack
            direction="horizontal"
            gap={3}
            style={{ display: "flex", justifyContent: "start" }}
          >
            <Button variant="danger" onClick={() => navigate("/social_flow")}>
              Cancel
            </Button>
            <Button type="submit">Submit form</Button>
          </Stack>
        </Form>
      </header>
    </div>
  );
};

export default TableEditItem;
