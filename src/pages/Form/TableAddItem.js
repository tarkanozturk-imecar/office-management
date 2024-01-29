import React, { useState, useEffect } from "react";
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

const TableAddItem = () => {
  let navigate = useNavigate();

  let location = useLocation();

  console.log(location.pathname.split("/")[1]);

  let currentPage = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({});
  const [formTypeData, setFormTypeData] = useState([]);

  const [isFormTypeSelected, setIsFormTypeSelected] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Getting the role_id for User Create
        await UserService.getFormTypeAllContent().then(async (response) => {
          const data = await response.json();
          /* console.log(response.data.body.data.records); */
          const allFormTypes = data.body.data.records;
          setFormTypeData(allFormTypes);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredFormData = {
      form_type_id: formData.form_type_id || "",
      leave_start_date: formData.leave_start_date || "",
      end_of_leave: formData.end_of_leave || "",
      note: formData.note || "",
    };

    setFormData(filteredFormData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FORMDATAAAAAA", formData);

    setFormSubmitted(true);

    try {
      await UserService.addFormContent(formData).then(async (response) => {
        console.log(response);
        if (response.ok) {
          navigate("/form");
          console.log("Form submitted successfully", response);
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomForm_Type_Id"
            >
              <Form.Label>
                Form Type Id<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Select
                as="select"
                name="form_type_id"
                value={formData.form_type_id}
                onChange={(e) => {
                  setFormData({ ...formData, form_type_id: e.target.value });
                  setIsFormTypeSelected(true);
                }}
                isInvalid={!isFormTypeSelected && formSubmitted}
              >
                <option hidden>Select Form Type Id</option>
                {formTypeData.map((formType) => (
                  <option key={formType.id} value={formType.id}>
                    {formType.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomleave_start_date"
            >
              <Form.Label>
                Leave Start Date<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="datetime-local"
                name="leave_start_date"
                value={
                  formData.leave_start_date
                    ? formData.leave_start_date.substring(0, 16)
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
                    leave_start_date: formattedDateTime,
                  });
                }}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomend_of_leave"
            >
              <Form.Label>
                End of Leave<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="datetime-local"
                name="end_of_leave"
                value={
                  formData.end_of_leave
                    ? formData.end_of_leave.substring(0, 16)
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
                    end_of_leave: formattedDateTime,
                  });
                }}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomnote">
              <Form.Label>
                Note<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="note"
                value={formData.note}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const onlyTurkishCharactersWithSpaces =
                    /^[A-Za-zÇçĞğİıÖöŞşÜü\s]+$/;

                  if (
                    onlyTurkishCharactersWithSpaces.test(inputValue) ||
                    inputValue === ""
                  ) {
                    setFormData({ ...formData, note: inputValue });
                  }
                }}
              />
            </Form.Group>
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </header>
    </div>
  );
};

export default TableAddItem;
