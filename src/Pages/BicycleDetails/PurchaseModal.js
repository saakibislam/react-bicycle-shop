import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useFirebase from "../hooks/useFirebase";

const PurchaseModal = ({ bicycle, show, handleClose, toggleToast }) => {
  const { user } = useFirebase();
  const nameRef = useRef();
  const emailRef = useRef();
  const cycleRef = useRef();
  const dateRef = useRef();
  const priceRef = useRef();
  const addressRef = useRef();

  const handleOnSubmit = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const cycleName = cycleRef.current.value;
    const purchasedDate = dateRef.current.value;
    const priceValue = priceRef.current.value;
    const deliverAddress = addressRef.current.value;

    const order = {
      buyerName: name,
      buyerEmail: email,
      cycleType: cycleName,
      purchasedOn: purchasedDate,
      price: priceValue,
      address: deliverAddress,
    };
    // console.log(order);
    fetch("https://bike-mania.onrender.com/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then(() => {
        handleClose();
        toggleToast();
      });
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-success">
          Purchase Form for {bicycle.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form>
            <Form.Group
              className="mb-3 text-start"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="email"
                defaultValue={user.displayName}
                ref={nameRef}
                placeholder="Your Name"
              />
            </Form.Group>
            <Form.Group
              className="mb-3 text-start"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                defaultValue={user.email}
                ref={emailRef}
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group
              className="mb-3 text-start"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Cycle Type</Form.Label>
              <Form.Control
                type="text"
                defaultValue={bicycle.name}
                ref={cycleRef}
                placeholder="Cycle Name"
                disabled
              />
            </Form.Group>
            <Form.Group
              className="mb-3 text-start"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Purchase Date</Form.Label>
              <Form.Control
                type="text"
                defaultValue={new Date().toLocaleDateString()}
                ref={dateRef}
                disabled
                placeholder="Purchased Date"
              />
            </Form.Group>
            <Form.Group
              className="mb-3 text-start"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                defaultValue={bicycle.price}
                ref={priceRef}
                disabled
                placeholder="Product Price"
              />
            </Form.Group>
            <Form.Group
              className="mb-3 text-start"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                autoFocus
                required
                type="text"
                ref={addressRef}
                placeholder="Deliver Address"
              />
            </Form.Group>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleOnSubmit} variant="success">
          Purchase
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseModal;
