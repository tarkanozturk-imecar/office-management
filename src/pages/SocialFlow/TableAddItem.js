import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Container,
  Form,
  Col,
  Row,
  InputGroup,
  Image,
} from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";

const TableAddItem = () => {
  let navigate = useNavigate();

  let location = useLocation();

  let currentPage = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({});
  const [socialFlowTypeData, setSocialFlowTypeData] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [responseImageURL, setResponseImageURL] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Getting the role_id for User Create
        await UserService.getSocialFlowTypeAllContent().then(
          async (response) => {
            /* console.log(response.data.body.data.records); */
            const allSocialFlowTypes = response.data.body.data.records;
            setSocialFlowTypeData(allSocialFlowTypes);
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredFormData = {
      socialFlow_type_id: formData.socialFlow_type_id || "",
      start_of_display: formData.start_of_display || "",
      title: formData.title || "",
      content: formData.content || "",
      photo: formData.photo || "",
      score: formData.score || "",
      color: formData.color || "",
      icon: formData.icon || "",
      target: formData.target || "",
      /* --------------------------------------------------------- */
      /* 
      user_id: formData.user_id || "",
      company_id: formData.company_id || "",
      department_id: formData.department_id || "",
      status: formData.target || "",
      */
    };

    setFormData(filteredFormData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await UserService.addSocialFlowContent(formData).then(
        async (response) => {
          console.log(response);
          if (response.ok) {
            navigate("/socialFlow");
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
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustomtitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomcontent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                name="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomcolor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                name="color"
                placeholder="Optional"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomicon">
              <Form.Label>Icon</Form.Label>
              <Form.Control
                type="text"
                name="icon"
                placeholder="Optional"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomtarget">
              <Form.Label>Target</Form.Label>
              <Form.Control
                type="text"
                name="target"
                placeholder="Optional"
                value={formData.target}
                onChange={(e) =>
                  setFormData({ ...formData, target: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomImage">
              <div>
                {selectedImage && (
                  <div>
                    <img
                      alt="not found"
                      width={"150px"}
                      src={URL.createObjectURL(selectedImage)}
                    />
                    <br />

                    <button onClick={handleDeleteClick}>Remove</button>
                  </div>
                )}

                <br />
                <br />

                <input
                  type="file"
                  name="myImage"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>

              {/* <div>Response Image URL : {responseImageURL}</div> */}
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomscore">
              <Form.Label>Score</Form.Label>
              <Form.Control
                type="text"
                name="score"
                value={formData.score}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    score: parseInt(e.target.value, 10) || "", // Parse to integer
                  })
                }
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomstart_of_display"
            >
              <Form.Label>Start of Display</Form.Label>
              <Form.Control
                type="datetime-local"
                name="start_of_display"
                value={
                  formData.start_of_display
                    ? formData.start_of_display.substring(0, 16)
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
                  setFormData({
                    ...formData,
                    start_of_display: formattedDateTime,
                  });
                }}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomsocialFlow_type_id"
            >
              <Form.Label>Social Flow Type</Form.Label>
              <Form.Select
                name="socialFlow_type_id"
                value={formData.socialFlow_type_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialFlow_type_id: e.target.value,
                  })
                }
              >
                <option hidden>Select Social Flow Type</option>
                {socialFlowTypeData.map((social) => (
                  <option key={social.id} value={social.id}>
                    {social.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </header>
    </div>
  );
};

export default TableAddItem;
