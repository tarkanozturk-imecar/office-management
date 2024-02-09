import React, { useState, useEffect, useRef } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addData,
  getData,
  getUserDetailByIdData,
  editData,
  uploadImageData,
} from "../../services/test.service";
import "./user.css";

const TableAddItem = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let currentPageName = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    date_of_birth: "",
    role_id: "",
    company_id: "",
    department_id: "",
  });

  const [formData2, setFormData2] = useState({
    tags: "",
    business_phone: "",
    start_date_of_work: "",
    blood_type: "",
    status: null,
    job_title: "",
  });

  const [roleData, setRoleData] = useState([]);

  const [companyData, setCompanyData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [responseImageURL, setResponseImageURL] = useState("");

  //VALIDATION
  const [isRoleSelected, setIsRoleSelected] = useState(false);
  const [isCompanySelected, setIsCompanySelected] = useState(false);
  const [isDepartmentSelected, setIsDepartmentSelected] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        //Getting the role_id for User Create
        await getData("role").then(async (response) => {
          const allRoles = response.body.data.records;
          setRoleData(allRoles);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCompanyeData = async () => {
      try {
        await getData("company").then(async (response) => {
          const allCompanies = response.body.data.records;
          setCompanyData(allCompanies);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDepartmentData = async () => {
      try {
        await getData("department").then(async (response) => {
          const allDepartments = response.body.data.records;
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

    setFormSubmitted(true);

    try {
      await addData(currentPageName, formData).then(async (response) => {
        if (response) {
          console.log("userID : ", response.body.data.records);
          let userID = response.body.data.records; //This returns an ID as response

          //For Getting the user_detail_id
          await getUserDetailByIdData("user_detail", userID).then(
            async (response) => {
              console.log("GETTING", response);
              if (response) {
                const user_detailID = response.body.data.records.id;

                await editData("user_detail", user_detailID, formData2).then(
                  async (response) => {
                    if (response) {
                      console.log(response.body.data.records);
                      navigate("/user");
                    }
                  }
                );
              }
            }
          );

          navigate("/user");
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

        await uploadImageData(formImageData).then(async (response) => {
          console.log(response);

          if (response) {
            setFormData({ ...formData, photo: response.result });

            setResponseImageURL(response.result);

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
              <Form.Label>
                First Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const onlyTurkishCharactersWithSpaces =
                    /^[A-Za-zÇçĞğİıÖöŞşÜü\s]+$/;

                  if (
                    onlyTurkishCharactersWithSpaces.test(inputValue) ||
                    inputValue === ""
                  ) {
                    setFormData({ ...formData, first_name: inputValue });
                  }
                }}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomlast_name">
              <Form.Label>
                Last Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const onlyTurkishCharactersWithSpaces =
                    /^[A-Za-zÇçĞğİıÖöŞşÜü\s]+$/;

                  if (
                    onlyTurkishCharactersWithSpaces.test(inputValue) ||
                    inputValue === ""
                  ) {
                    setFormData({ ...formData, last_name: inputValue });
                  }
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomemail">
              <Form.Label>
                Email<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
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
              <Form.Label>
                Password<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
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
              <Form.Label>
                Phone Number<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
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
              <Form.Label>
                Date of Birth<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={(e) =>
                  setFormData({ ...formData, date_of_birth: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomrole_id">
              <Form.Label>
                Role<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Select
                name="role_id"
                value={formData.role_id}
                onChange={(e) => {
                  setFormData({ ...formData, role_id: e.target.value });
                  setIsRoleSelected(true);
                }}
                isInvalid={!isRoleSelected && formSubmitted}
              >
                <option hidden>Select Role</option>
                {roleData.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a Role.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomcompany_id">
              <Form.Label>
                Company<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Select
                name="company_id"
                value={formData.company_id}
                onChange={(e) => {
                  setFormData({ ...formData, company_id: e.target.value });
                  setIsCompanySelected(true);
                }}
                isInvalid={!isCompanySelected && formSubmitted}
              >
                <option hidden>Select Company</option>
                {companyData.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a Company.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomdepartment_id"
            >
              <Form.Label>
                Department<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Select
                name="department_id"
                value={formData.department_id}
                onChange={(e) => {
                  setFormData({ ...formData, department_id: e.target.value });
                  setIsDepartmentSelected(true);
                }}
                isInvalid={!isDepartmentSelected && formSubmitted}
              >
                <option hidden>Select Department</option>
                {departmentData.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a Department.
              </Form.Control.Feedback>
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
                onChange={(e) => {
                  setFormData2({
                    ...formData2,
                    status:
                      e.target.value !== "null"
                        ? parseInt(e.target.value, 10)
                        : null,
                  });
                }}
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
                placeholder="Optional"
                type="text"
                name="tags"
                value={formData2.tags}
                onChange={(e) =>
                  setFormData2({ ...formData2, tags: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomBlood_type">
              <Form.Label>Blood Type</Form.Label>
              <Form.Select
                name="blood_type"
                value={formData2.blood_type || ""}
                onChange={(e) =>
                  setFormData2({
                    ...formData2,
                    blood_type:
                      e.target.value !== "null" ? e.target.value : null,
                  })
                }
              >
                <option hidden>Select Blood Type</option>
                <option value="A Rh +">A Rh +</option>
                <option value="A Rh -">A Rh -</option>
                <option value="B Rh +">B Rh +</option>
                <option value="B Rh -">B Rh -</option>
                <option value="AB Rh +">AB Rh +</option>
                <option value="AB Rh -">AB Rh -</option>
                <option value="0 Rh +">0 Rh +</option>
                <option value="0 Rh -">0 Rh -</option>
              </Form.Select>
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
                placeholder="Optional"
                type="text"
                name="job_title"
                value={formData2.job_title}
                onChange={(e) => {
                  setFormData2({ ...formData2, job_title: e.target.value });
                }}
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
