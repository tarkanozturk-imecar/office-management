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

  let navigate = useNavigate();

  const fieldLabels = {
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    date_of_birth: "Date of Birth",
    phone_number: "Phone Number",
    role_id: "Role Name",
    company_id: "Company ID",
    department_id: "Department ID",
    status: "Status",
    photo: "Photo",
  };

  const [formData, setFormData] = useState({});
  const [roleData, setRoleData] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const [responseImageURL, setResponseImageURL] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUserContentById(id);
        const data = await response.json();
        setFormData(data.body.data.records);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    const fetchRoleData = async () => {
      try {
        await UserService.getRoleAllContent().then(async (response) => {
          const data = await response.json();
          const allRoles = data.body.data.records;
          setRoleData(allRoles);
        });
      } catch (error) {
        console.error("Error fetching role data:", error);
      }
    };

    fetchData();
    fetchRoleData();
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
      await UserService.editUserContent(id, formData).then(async (response) => {
        if (response.ok) {
          navigate("/user");
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
                {key === "date_of_birth" ? (
                  <Form.Control
                    required
                    type="date"
                    name={key}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  />
                ) : key === "role_id" ? (
                  <Form.Select
                    name={key}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  >
                    {/* <option hidden>Select a Role</option> */}
                    {roleData.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </Form.Select>
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
          <Button type="submit">Submit form</Button>
        </Form>
      </header>
    </div>
  );
};

export default TableEditItem;
