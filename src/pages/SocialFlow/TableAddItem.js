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
import axios from "axios";

const TableAddItem = () => {
  let navigate = useNavigate();

  let location = useLocation();

  let currentPage = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({});
  const [socialFlowTypeData, setSocialFlowTypeData] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const isValidFileType = validateFileType(file.name);

      if (isValidFileType) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        // Display an error or alert for an invalid file type
        alert("Invalid file type. Please select a .png, .jpeg, or .jpg file.");
        // Reset the file input value
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const validateFileType = (fileName) => {
    const allowedExtensions = [".png", ".jpeg", ".jpg"];
    const fileType = fileName.slice(
      ((fileName.lastIndexOf(".") - 1) >>> 0) + 2
    );

    return allowedExtensions.includes(`.${fileType}`);
  };

  const handleDeleteClick = () => {
    setSelectedImage(null);
    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedImage);

    const base64Data = selectedImage.split(",")[1];

    // Convert base64 to binary
    const binaryData = atob(base64Data);

    // Create a Uint8Array to hold the binary data
    const byteArray = new Uint8Array(binaryData.length);

    // Fill the Uint8Array with the binary data
    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }

    // Now 'byteArray' contains the binary data
    console.log(byteArray);

    if (selectedImage) {
      try {
        // Send the image to your server endpoint
        const response = await fetch("https://mj.imecar.com/uploads/uf.php", {
          method: "POST",
          body: byteArray,
        });
        const responseData = await response.json();
        console.log("Upload successful:", responseData);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      alert("Please select an image before uploading.");
    }

    /* try {
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
    } */
  };

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
      /* --------------------------------------------------------- */
      /* user_id: formData.user_id || "",
      company_id: formData.company_id || "",
      department_id: formData.department_id || "",
      color: formData.color || "",
      icon: formData.icon || "",
      target: formData.target || "", */
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

        const response = await fetch("https://mj.imecar.com/uploads/uf.php", {
          method: "POST",
          body: formImageData,
        });
        const responseData = await response.json();
        if (response.ok) {
          console.log("Image uploaded successfully!", responseData);
          // You can handle success here
        } else {
          console.error("Failed to upload image");
          // You can handle errors here
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.warn("No image selected");
    }
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustomtitle">
              <Form.Label>title</Form.Label>
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
              <Form.Label>content</Form.Label>
              <Form.Control
                type="text"
                name="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomphoto">
              <Form.Label>photo</Form.Label>
              <Form.Control
                type="text"
                name="photo"
                value={formData.photo}
                onChange={(e) =>
                  setFormData({ ...formData, photo: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomscore">
              <Form.Label>score</Form.Label>
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
              <Form.Label>start_of_display</Form.Label>
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
        {/* <Form onSubmit={handleImageSubmit}>
          <Form.Group>
            <Form.Label>Choose a photo</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </Form.Group>

          {selectedImage && (
            <div>
              <Image src={selectedImage} alt="Preview" thumbnail />
              <Button variant="danger" onClick={handleDeleteClick}>
                Delete
              </Button>
            </div>
          )}

          <Button variant="primary" type="submit">
            Upload
          </Button>
        </Form> */}

        <div>
          {selectedImage && (
            <div>
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button onClick={() => setSelectedImage(null)}>Remove</button>
              <button onClick={handleImageUpload}>Upload</button>
            </div>
          )}

          <br />
          <br />

          <input
            type="file"
            name="myImage"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
        </div>
      </header>
    </div>
  );
};

export default TableAddItem;
