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
  const [debitVoucherData, setDebitVoucherData] = useState([]);
  const [userEmailData, setUserEmailData] = useState([]);

  useEffect(() => {
    const fetchDebitVoucherData = async () => {
      try {
        await UserService.getDebitVoucherAllContent().then(async (response) => {
          const allDebitVouchers = response.data.body.data.records;
          setDebitVoucherData(allDebitVouchers);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUserEmailData = async () => {
      try {
        await UserService.getUserAllContent().then(async (response) => {
          const data = await response.json();
          const allUserEmails = data.body.data.records;
          setUserEmailData(allUserEmails);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDebitVoucherData();
    fetchUserEmailData();
  }, []);

  useEffect(() => {
    const filteredFormData = {
      debit_voucher_id: formData.debit_voucher_id || "",
      to_user_email: formData.to_user_email || "",
      sender_note: formData.sender_note || "",
    };

    setFormData(filteredFormData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await UserService.addDebitRequestContent(formData).then(
        async (response) => {
          console.log(response);
          if (response.ok) {
            navigate("/debit_request");
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

  return (
    <div className="container">
      <header className="jumbotron">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomDebit_voucher_id"
            >
              <Form.Label>Debit Voucher</Form.Label>
              <Form.Select
                name="debit_voucher_id"
                value={formData.debit_voucher_id}
                onChange={(e) =>
                  setFormData({ ...formData, debit_voucher_id: e.target.value })
                }
              >
                <option hidden>Select Debit Voucher</option>
                {debitVoucherData.map((voucher) => (
                  <option key={voucher.id} value={voucher.id}>
                    {voucher.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomTo_user_email"
            >
              <Form.Label>User Email</Form.Label>
              <Form.Select
                name="to_user_email"
                value={formData.to_user_email}
                onChange={(e) =>
                  setFormData({ ...formData, to_user_email: e.target.value })
                }
              >
                <option hidden>Select User Email</option>
                {userEmailData.map((email) => (
                  <option key={email.id} value={email.email}>
                    {email.email}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomSender_note">
              <Form.Label>Sender Note</Form.Label>
              <Form.Control
                required
                type="text"
                name="sender_note"
                value={formData.sender_note}
                onChange={(e) =>
                  setFormData({ ...formData, sender_note: e.target.value })
                }
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
