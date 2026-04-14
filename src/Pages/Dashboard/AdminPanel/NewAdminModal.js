import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const NewAdminModal = ({
  fetchAdmins,
  toastShow,
  setToastShow,
  toastMessage,
  setToastMessage,
}) => {
  const [email, setEmail] = useState();
  const [adminModalShow, setAdminModalShow] = useState(false);
  const handleAdminModalClose = () => setAdminModalShow(false);
  const handleAdminModalShow = () => setAdminModalShow(true);

  const handleAdminSubmit = async () => {
    // Promotes a user to admin and updates the UI based on the API response.
    try {
      const response = await fetch("http://localhost:5000/api/v2/users/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email, role: "admin" }),
      });
      const data = await response.json();

      if (!data.user) {
        setToastMessage({
          variant: "danger",
          message: data.message || "Failed to add admin",
        });
        setToastShow(true);
        return;
      }

      handleAdminModalClose();
      fetchAdmins();
      setToastMessage({
        variant: "success",
        message: data.message || "Admin added successfully",
      });
      setToastShow(true);
      setEmail("");
    } catch (error) {
      console.error("Failed to add new admin:", error);
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
