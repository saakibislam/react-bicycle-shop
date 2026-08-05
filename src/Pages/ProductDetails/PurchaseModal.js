import { useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import CountrySelect from "../../components/Shared/CountrySelect/CountrySelect";
import { postApi } from "../../hooks/api";
import useFirebase from "../../hooks/useFirebase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s().-]{7,15}$/;
const ZIP_REGEX = /^[a-zA-Z0-9\s\-]{3,10}$/;

const PurchaseModal = ({ product, show, handleClose, toggleToast }) => {
  const { user } = useFirebase();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    street: user?.street || "",
    apartment: user?.apartment || "",
    city: user?.city || "",
    zip: user?.zip || "",
    country: user?.country || "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_REGEX.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    else if (!PHONE_REGEX.test(form.phone)) next.phone = "Enter a valid phone number.";
    if (!form.street.trim()) next.street = "Street address is required.";
    if (!form.city.trim()) next.city = "City is required.";
    if (!form.zip.trim()) next.zip = "ZIP code is required.";
    else if (!ZIP_REGEX.test(form.zip)) next.zip = "Enter a valid ZIP code.";
    if (!form.country.trim()) next.country = "Country is required.";
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: "" }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await postApi("/orders", {
        item: product?._id,
        apartment: form.apartment,
        street: form.street,
        city: form.city,
        zip: form.zip,
        country: form.country,
        phone: form.phone,
        totalPrice: product?.price,
        user: user?._id,
      });
      setIsSubmitting(false);
      handleClose();
      toggleToast();
    } catch (error) {
      console.error("Error submitting order: ", error);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-success">
          Purchase Form for {product?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="purchase-form" noValidate onSubmit={handleOnSubmit}>
          <Row xs={1} md={2} className="g-3">
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Cycle</Form.Label>
                <Form.Control type="text" value={product?.name || ""} disabled />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  value={product?.price ? `$${product.price}` : ""}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mt-3">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={form.street}
              onChange={handleChange}
              placeholder="Street Address"
              isInvalid={!!errors.street}
            />
            <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
          </Form.Group>

          <Row xs={1} md={2} className="g-3 mt-0">
            <Col>
              <Form.Group>
                <Form.Label>
                  Apartment{" "}
                  <span className="text-muted small">(optional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="apartment"
                  value={form.apartment}
                  onChange={handleChange}
                  placeholder="Apartment, suite, etc."
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>ZIP Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  placeholder="ZIP Code"
                  isInvalid={!!errors.zip}
                />
                <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Country</Form.Label>
                <CountrySelect
                  value={form.country}
                  onChange={(val) => {
                    setForm((f) => ({ ...f, country: val }));
                    if (errors.country)
                      setErrors((err) => ({ ...err, country: "" }));
                  }}
                  isInvalid={!!errors.country}
                />
                {errors.country && (
                  <div className="invalid-feedback d-block">{errors.country}</div>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="purchase-form"
          variant="success"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Placing Order...
            </>
          ) : (
            "Purchase"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseModal;
