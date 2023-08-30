import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

const MakeAdmin = () => {
  const [email, setEmail] = useState();
  const [success, setSuccess] = useState(false);

  const handleOnBlur = (e) => {
    setEmail(e.target.value);
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    const user = { email };
    fetch("https://bike-mania.onrender.com/users/admin", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setSuccess(true);
        }
      });
  };

  return (
    <div>
      <h3>Make Admin</h3>
      {success && <Alert variant="success">New Admin Added</Alert>}
      <div className="w-50 mx-auto">
        <form onSubmit={handleAdminSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onBlur={handleOnBlur}
              placeholder="name@example.com"
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Make Admin
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MakeAdmin;
