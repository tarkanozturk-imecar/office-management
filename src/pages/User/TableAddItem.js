import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Container,
  Form,
  Col,
  Row,
  InputGroup,
} from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import "./user.css";

const TableAddItem = () => {
  let navigate = useNavigate();

  let location = useLocation();

  //console.log(location.pathname.split("/")[1]);

  let currentPage = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({});
  const [formData2, setFormData2] = useState({});

  const [roleData, setRoleData] = useState([]);

  const [companyData, setCompanyData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [responseImageURL, setResponseImageURL] = useState("");

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        //Getting the role_id for User Create
        await UserService.getRoleAllContent().then(async (response) => {
          /* console.log(response.data.body.data.records); */
          const allRoles = response.data.body.data.records;
          setRoleData(allRoles);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCompanyeData = async () => {
      try {
        //Getting the role_id for User Create
        await UserService.getCompanyAllContent().then(async (response) => {
          console.log(response.data.body.data.records);
          const allCompanies = response.data.body.data.records;
          setCompanyData(allCompanies);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDepartmentData = async () => {
      try {
        //Getting the role_id for User Create
        await UserService.getDepartmentAllContent().then(async (response) => {
          console.log(response.data.body.data.records);
          const allDepartments = response.data.body.data.records;
          setDepartmentData(allDepartments);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRoleData();
    fetchCompanyeData();
    fetchDepartmentData();
  }, []);

  useEffect(() => {
    const filteredFormData = {
      first_name: formData.first_name || "",
      last_name: formData.last_name || "",
      email: formData.email || "",
      password: formData.password || "",
      phone_number: formData.phone_number || "",
      date_of_birth: formData.date_of_birth || "",
      tenant_id: "55871330-723f-4e4b-b71f-90c9909efa8c",
      //tenant_id: formData.tenant_id || "",
      role_id: formData.role_id || "",
      company_id: formData.company_id || "",
      department_id: formData.department_id || "",
    };

    const filteredFormData2 = {
      tags: formData2.tags || "",
      business_phone: formData2.business_phone || "",
      start_date_of_work: formData2.start_date_of_work || "",
      blood_type: formData2.blood_type || "",
      status: formData2.status || null,
      job_title: formData2.job_title || "",
    };

    setFormData(filteredFormData);
    setFormData2(filteredFormData2);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log(formData);

    try {
      await UserService.addUserContent(formData).then(async (response) => {
        console.log(response);
        if (response.ok) {
          const resData = await response.json();
          console.log("userID : ", resData.body.data.records);
          let userID = resData.body.data.records;

          //For Getting the userDetail_id
          await UserService.getUserDetailAllContent(userID).then(
            async (response) => {
              console.log("GETTING", response);
              if (response.ok) {
                const data = await response.json();
                console.log("USER-DETAIL-ID : ", data.body.data.records.id);

                const userDetailID = data.body.data.records.id;

                await UserService.editUserDetailContent(
                  userDetailID,
                  formData2
                ).then(async (response) => {
                  if (response.ok) {
                    const data = await response.json();
                    console.log(data.body.data.records);
                    navigate("/user");
                  }
                });
              }
            }
          );

          //navigate("/user");
          console.log("Form submitted successfully", response);
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      });
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
            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomlast_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomemail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="example@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustompassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomphone_number"
            >
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                placeholder="(5xx xxx xx xx)"
                value={formData.phone_number}
                onChange={(e) => {
                  // Remove non-numeric characters
                  const numericValue = e.target.value.replace(/\D/g, "");

                  // Restrict to 11 digits
                  const truncatedValue = numericValue.slice(0, 10);

                  // Update the state with the cleaned and truncated value
                  setFormData({ ...formData, phone_number: truncatedValue });
                }}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomdate_of_birth"
            >
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={(e) =>
                  setFormData({ ...formData, date_of_birth: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomrole_id">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role_id"
                value={formData.role_id}
                onChange={(e) =>
                  setFormData({ ...formData, role_id: e.target.value })
                }
              >
                <option hidden>Select Role</option>
                {roleData.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomcompany_id">
              <Form.Label>Company</Form.Label>
              <Form.Select
                name="company_id"
                value={formData.company_id}
                onChange={(e) =>
                  setFormData({ ...formData, company_id: e.target.value })
                }
              >
                <option hidden>Select Company</option>
                {companyData.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomdepartment_id"
            >
              <Form.Label>Department</Form.Label>
              <Form.Select
                name="department_id"
                value={formData.department_id}
                onChange={(e) =>
                  setFormData({ ...formData, department_id: e.target.value })
                }
              >
                <option hidden>Select Department</option>
                {departmentData.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* ------------------------------------------------------------------------ */}

            {/* <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>User ID</Form.Label>
              <Form.Control disabled type="text" value={userID} />
            </Form.Group> */}

            <Form.Group as={Col} md="4" controlId="validationCustomStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData2.status || ""}
                onChange={(e) =>
                  setFormData2({
                    ...formData2,
                    status:
                      e.target.value !== "null"
                        ? parseInt(e.target.value, 10)
                        : null,
                  })
                }
              >
                <option hidden>Select Status</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomdate_of_birth"
            >
              <Form.Label>Start Date of Work</Form.Label>
              <Form.Control
                type="date"
                name="start_date_of_work"
                value={formData2.start_date_of_work}
                onChange={(e) =>
                  setFormData2({
                    ...formData2,
                    start_date_of_work: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={formData2.tags}
                onChange={(e) =>
                  setFormData2({ ...formData2, tags: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>Blood Type</Form.Label>
              <Form.Control
                type="text"
                name="blood_type"
                value={formData2.blood_type}
                onChange={(e) =>
                  setFormData2({ ...formData2, blood_type: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>Business Phone</Form.Label>
              <Form.Control
                type="text"
                name="business_phone"
                placeholder="(5xx xxx xx xx)"
                value={formData2.business_phone}
                onChange={(e) => {
                  // Remove non-numeric characters
                  const numericValue = e.target.value.replace(/\D/g, "");

                  // Restrict to 11 digits
                  const truncatedValue = numericValue.slice(0, 10);

                  // Update the state with the cleaned and truncated value
                  setFormData2({
                    ...formData2,
                    business_phone: truncatedValue,
                  });
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomjob_title">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="job_title"
                value={formData2.job_title}
                onChange={(e) =>
                  setFormData2({ ...formData2, job_title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
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
                {selectedImage ? (
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
                      src={URL.createObjectURL(selectedImage)}
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

                {selectedImage ? (
                  ""
                ) : (
                  <>
                    <label htmlFor="file-upload" className="custom-file-upload">
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
            </Form.Group>
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </header>
    </div>
  );
};

export default TableAddItem;
