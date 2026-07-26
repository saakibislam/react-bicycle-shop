import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { patchApi } from "../../../hooks/api";

const NewAdminModal = ({ refetch, setToastMessage, setToastShow }) => {
  const [email, setEmail] = useState();
  const [adminModalShow, setAdminModalShow] = useState(false);
  const handleAdminModalClose = () => setAdminModalShow(false);
  const handleAdminModalShow = () => setAdminModalShow(true);

  const handleAdminSubmit = async () => {
    // Promotes a user to admin and updates the UI based on the API response.
    try {
      const result = await patchApi("/users/admin", { email, role: "admin" });
      handleAdminModalClose();
      setToastMessage({ variant: "success", message: result.message });
      setToastShow(true);
      setEmail("");
      refetch();
    } catch (error) {
      setToastMessage({
        variant: "danger",
        message: error.message || "Failed to add admin",
      });
      setToastShow(true);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end m-3">
        <Button variant="success" onClick={handleAdminModalShow}>
          Add Admin
        </Button>
      </div>
      <Modal show={adminModalShow} onHide={handleAdminModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                autoFocus
                required
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAdminModalClose}>
            Close
          </Button>
          <Button variant="outline-success" onClick={handleAdminSubmit}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewAdminModal;
