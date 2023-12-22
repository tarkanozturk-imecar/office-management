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

  //console.log(location.pathname.split("/")[1]);

  let currentPage = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({});
  const [roleData, setRoleData] = useState([]);
  const [moduleData, setModuleData] = useState([]);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        //Getting the role_id for User Create
        await UserService.getRoleAllContent().then(async (response) => {
          console.log(response.data.body.data.records);
          const allRoles = response.data.body.data.records;
          setRoleData(allRoles);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchModule = async () => {
      try {
        await UserService.getModuleAllContent().then(async (response) => {
          console.log(response.data.body.data.records);
          const allModules = response.data.body.data.records;
          setModuleData(allModules);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRole();
    fetchModule();
  }, []);

  useEffect(() => {
    const filteredFormData = {
      view: formData.view || "",
      add: formData.add || "",
      edit: formData.edit || "",
      delete: formData.delete || "",
      mask: formData.mask || "",
      role_id: formData.role_id || "",
      module_id: formData.module_id || "",
    };

    setFormData(filteredFormData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await UserService.addUserContent(formData).then(async (response) => {
        console.log(response);
        if (response.ok) {
          navigate("/permission");
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
            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>View</Form.Label>
              <Form.Check
                type="checkbox"
                name="view"
                checked={formData.view}
                onChange={(e) =>
                  setFormData({ ...formData, view: e.target.checked })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>Add</Form.Label>
              <Form.Check
                type="checkbox"
                name="add"
                checked={formData.add}
                onChange={(e) =>
                  setFormData({ ...formData, add: e.target.checked })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>Edit</Form.Label>
              <Form.Check
                type="checkbox"
                name="edit"
                checked={formData.edit}
                onChange={(e) =>
                  setFormData({ ...formData, edit: e.target.checked })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>Delete</Form.Label>
              <Form.Check
                type="checkbox"
                name="delete"
                checked={formData.delete}
                onChange={(e) =>
                  setFormData({ ...formData, delete: e.target.checked })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomfirst_name">
              <Form.Label>Mask</Form.Label>
              <Form.Check
                type="checkbox"
                name="mask"
                checked={formData.mask}
                onChange={(e) =>
                  setFormData({ ...formData, mask: e.target.checked })
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
                <option value="">Select Role</option>
                {roleData.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomrole_id">
              <Form.Label>Module</Form.Label>
              <Form.Select
                name="module_id"
                value={formData.module_id}
                onChange={(e) =>
                  setFormData({ ...formData, module_id: e.target.value })
                }
              >
                <option value="">Select Module</option>
                {moduleData.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.name}
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
