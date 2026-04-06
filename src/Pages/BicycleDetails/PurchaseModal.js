import { useRef } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import useFirebase from "../hooks/useFirebase";

const PurchaseModal = ({ bicycle, show, handleClose, toggleToast }) => {
  const { user } = useFirebase();
  const nameRef = useRef();
  const emailRef = useRef();
  const cycleRef = useRef();
  const dateRef = useRef();
  const priceRef = useRef();
  const phoneRef = useRef();
  const streetRef = useRef();
  const apartmentRef = useRef();
  const zipRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();

  const handleOnSubmit = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const cycleName = cycleRef.current.value;
    const purchasedDate = dateRef.current.value;
    const priceValue = priceRef.current.value;
    const phone = phoneRef.current.value;
    const street = streetRef.current.value;
    const apartment = apartmentRef.current.value;
    const zip = zipRef.current.value;
    const city = cityRef.current.value;
    const country = countryRef.current.value;

    const order = {
      name,
      email,
      phone,
      street,
      apartment,
      zip,
      city,
      country,
      cycleType: cycleName,
      purchasedOn: purchasedDate,
      price: priceValue,
    };
    // console.log(order);
    fetch("http://localhost:5000/api/v2/orders", {
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
          <Form>
            <Form.Group
              className="mb-3 text-start"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
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
            <Row xs={1} sm={1} md={2} className="g-4">
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
            </Row>
            <Row xs={1} sm={1} md={2} className="g-4">
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
              <Form.Group className="mb-3 text-start">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  ref={phoneRef}
                  placeholder="Phone Number"
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Street</Form.Label>
              <Form.Control
                required
                type="text"
                ref={streetRef}
                placeholder="Street Address"
              />
            </Form.Group>
            <Row xs={1} sm={1} md={2} className="g-4">
              <Form.Group className="mb-3 text-start">
                <Form.Label>Apartment</Form.Label>
                <Form.Control
                  type="text"
                  ref={apartmentRef}
                  placeholder="Apartment, suite, etc."
                />
              </Form.Group>
              <Form.Group className="mb-3 text-start">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  ref={cityRef}
                  placeholder="City"
                />
              </Form.Group>
            </Row>
            <Row xs={1} sm={1} md={2} className="g-4">
              <Form.Group className="mb-3 text-start">
                <Form.Label>ZIP Code</Form.Label>
                <Form.Control
                  required
                  type="text"
                  ref={zipRef}
                  placeholder="ZIP Code"
                />
              </Form.Group>
              <Form.Group className="mb-3 text-start">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  required
                  type="text"
                  ref={countryRef}
                  placeholder="Country"
                />
              </Form.Group>
            </Row>
          </Form>
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
