import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const NewAdminModal = ({ setSuccess, fetchAdmins }) => {
  const [email, setEmail] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdminSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v2/users/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role: "admin" }),
      });
      const data = await response.json();
      if (data.user) {
        handleClose();
        setSuccess(true);
        fetchAdmins();
      }
    } catch (error) {
      console.error("Failed to add new admin:", error);
    }
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add New Admin
      </Button>
      <Modal show={show} onHide={handleClose}>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdminSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewAdminModal;
