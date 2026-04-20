import { Button, Form, Modal, Row } from "react-bootstrap";
import useFirebase from "../hooks/useFirebase";
import { postApi } from "../api";

const PurchaseModal = ({ product, show, handleClose, toggleToast }) => {
  const { user } = useFirebase();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const form = e.target.elements;

    const order = {
      item: product?._id,
      apartment: form.apartment.value,
      street: form.street.value,
      city: form.city.value,
      zip: form.zip.value,
      country: form.country.value,
      phone: form.phone.value,
      price: product?.price,
      user: user?._id,
    };

    try {
      await postApi("/orders", order);
      handleClose();
      toggleToast();
    } catch (error) {
      console.error("Error submitting order: ", error);
    }
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
          Purchase Form for {product?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Form id="purchase-form" onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={user.name}
                placeholder="Your Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                defaultValue={user.email}
                placeholder="name@example.com"
                required
              />
            </Form.Group>
            <Row xs={1} sm={1} md={2} className="g-4">
              <Form.Group className="mb-3 text-start">
                <Form.Label>Cycle Type</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={product?.name}
                  placeholder="Cycle Name"
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3 text-start">
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={new Date().toLocaleDateString()}
                  disabled
                  placeholder="Purchased Date"
                />
              </Form.Group>
            </Row>
            <Row xs={1} sm={1} md={2} className="g-4">
              <Form.Group className="mb-3 text-start">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={product?.price}
                  disabled
                  placeholder="Product Price"
                />
              </Form.Group>
              <Form.Group className="mb-3 text-start">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="phone"
                  defaultValue={user.phone}
                  placeholder="Phone Number"
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Street</Form.Label>
              <Form.Control
                required
                type="text"
                name="street"
                defaultValue={user.street}
                placeholder="Street Address"
              />
            </Form.Group>
            <Row xs={1} sm={1} md={2} className="g-4">
              <Form.Group className="mb-3 text-start">
                <Form.Label>Apartment</Form.Label>
                <Form.Control
                  type="text"
                  name="apartment"
                  defaultValue={user.apartment}
                  placeholder="Apartment, suite, etc."
                />
              </Form.Group>
              <Form.Group className="mb-3 text-start">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="city"
                  defaultValue={user.city}
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
                  name="zip"
                  defaultValue={user.zip}
                  placeholder="ZIP Code"
                />
              </Form.Group>
              <Form.Group className="mb-3 text-start">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="country"
                  defaultValue={user.country}
                  placeholder="Country"
                />
              </Form.Group>
            </Row>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="purchase-form" variant="success">
          Purchase
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseModal;
