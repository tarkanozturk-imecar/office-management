import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { addData, getData } from "../../services/test.service";
import { FormattedMessage } from "react-intl";

const TableAddItem = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let currentPageName = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({
    debit_voucher_id: "",
    to_user_email: "",
    sender_note: "",
  });

  const [debitVoucherData, setDebitVoucherData] = useState([]);
  const [userEmailData, setUserEmailData] = useState([]);

  //VALIDATION
  const [isDebitVoucherSelected, setIsDebitVoucherSelected] = useState(false);
  const [isUserEmailSelected, setIsUserEmailSelected] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchDebitVoucherData = async () => {
      try {
        await getData("debit_voucher").then(async (response) => {
          const allDebitVouchers = response.body.data.records;
          setDebitVoucherData(allDebitVouchers);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUserEmailData = async () => {
      try {
        await getData("user").then(async (response) => {
          const allUserEmails = response.body.data.records;
          setUserEmailData(allUserEmails);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDebitVoucherData();
    fetchUserEmailData();
  }, []);

  /* useEffect(() => {
    const filteredFormData = {
      debit_voucher_id: formData.debit_voucher_id || "",
      to_user_email: formData.to_user_email || "",
      sender_note: formData.sender_note || "",
    };

    setFormData(filteredFormData);
  }, []); */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    try {
      await addData(currentPageName, formData).then(async (response) => {
        if (response.header.status !== 400) {
          navigate("/debit_request");
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
              controlId="validationCustomDebit_voucher_id"
            >
              <Form.Label>Debit Voucher</Form.Label>
              <Form.Select
                name="debit_voucher_id"
                value={formData.debit_voucher_id}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    debit_voucher_id: e.target.value,
                  });
                  setIsDebitVoucherSelected(true);
                }}
                isInvalid={!isDebitVoucherSelected && formSubmitted}
              >
                <option hidden>Select Debit Voucher</option>
                {debitVoucherData.map((voucher) => (
                  <option key={voucher.id} value={voucher.id}>
                    {voucher.title}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a Debit Voucher.
              </Form.Control.Feedback>
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
                onChange={(e) => {
                  setFormData({ ...formData, to_user_email: e.target.value });
                  setIsUserEmailSelected(true);
                }}
                isInvalid={!isUserEmailSelected && formSubmitted}
              >
                <option hidden>Select User Email</option>
                {userEmailData.map((email) => (
                  <option key={email.id} value={email.email}>
                    {email.email}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a User Email.
              </Form.Control.Feedback>
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
          <Button type="submit">
            <FormattedMessage id="Submit Form" />
          </Button>
        </Form>
      </header>
    </div>
  );
};

export default TableAddItem;
