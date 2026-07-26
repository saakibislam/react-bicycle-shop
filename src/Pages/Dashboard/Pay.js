import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { putApi } from "../../hooks/api";

// Replace with your own Stripe Publishable Key.
// This is a standard Stripe test key for demo purposes.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const CheckoutForm = ({ order, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    const card = elements.getElement(CardElement);

    // In a real application, you would fetch a client_secret from your backend via a PaymentIntent.
    // Here, we simulate the checkout process by simply creating a payment method.
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    if (error) {
      setError(error.message);
      setSuccess(false);
      setProcessing(false);
    } else {
      // Update order status in the backend
      try {
        await putApi(`/orders/${order._id}`, { ...order, status: "Confirmed" });
        setError(null);
        setSuccess(true);
        setProcessing(false);
        console.log("[PaymentMethod created]", paymentMethod);
        if (onSuccess) onSuccess(order._id);
      } catch (err) {
        setError(err.message);
        setSuccess(false);
        setProcessing(false);
      }
    }
  };
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-4">
        <Form.Label className="text-muted">Card Details</Form.Label>
        <div
          className="p-3 border rounded"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">Demo Payment Processed Successfully!</Alert>
      )}

      <Button
        variant="primary"
        type="submit"
        disabled={!stripe || processing || success}
        className="w-100 py-2 mt-2"
      >
        {processing ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          `Pay $${order?.item?.price || "0.00"}`
        )}
      </Button>
    </Form>
  );
};

const testCards = [
  {
    brand: "Visa",
    number: "4242424242424242",
    display: "4242 4242 4242 4242",
    cvv: "123",
    exp: "12/30",
  },
  {
    brand: "Mastercard",
    number: "5555555555554444",
    display: "5555 5555 5555 4444",
    cvv: "123",
    exp: "12/30",
  },
  {
    brand: "Amex",
    number: "378282246310005",
    display: "3782 8224 6310 005",
    cvv: "123",
    exp: "12/30",
  },
];

const Pay = ({ orders, setOrders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showTestCards, setShowTestCards] = useState(false);

  // Only show orders that haven't been confirmed yet
  const pendingOrders = orders?.filter((o) => o.status !== "Confirmed") || [];

  const handleOrderChange = (e) => {
    const orderId = e.target.value;
    const order = pendingOrders.find((o) => o._id === orderId);
    setSelectedOrder(order);
  };

  const handlePaymentSuccess = (orderId) => {
    if (setOrders) {
      const updatedOrders = orders.map((o) =>
        o._id === orderId ? { ...o, status: "Confirmed" } : o,
      );
      setOrders(updatedOrders);
    }
    // Reset the selection after a brief delay to allow the user to see the success message
    setTimeout(() => setSelectedOrder(null), 3000);
  };

  const copyToClipboard = (number) => {
    navigator.clipboard.writeText(number);
    setShowTestCards(false);
    alert(
      "Card number copied to clipboard! You can now paste it into the card field.",
    );
  };

  return (
    <div className="position-relative">
      {/* Top Right Floating Button */}
      <Button
        variant="warning"
        className="shadow-sm"
        style={{
          position: "absolute",
          top: "15px",
          right: "20px",
          zIndex: 1000,
        }}
        onClick={() => setShowTestCards(true)}
      >
        Demo Cards
      </Button>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm border-0 rounded-lg">
              <Card.Body className="p-5">
                <h2
                  className="text-center mb-4"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Secure Checkout
                </h2>

                <Form.Group className="mb-4">
                  <Form.Label className="text-muted">
                    Select an Order to Pay
                  </Form.Label>
                  <Form.Select
                    onChange={handleOrderChange}
                    value={selectedOrder?._id || ""}
                  >
                    <option value="" disabled>
                      -- Choose your order --
                    </option>
                    {pendingOrders.map((order) => (
                      <option key={order._id} value={order._id}>
                        {order.item?.name} - ${order.item?.price}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {selectedOrder ? (
                  <>
                    <p className="text-center text-muted mb-4">
                      Click the <strong>Demo Cards</strong> button in the top
                      right to get a test card.
                    </p>
                    <Elements stripe={stripePromise}>
                      <CheckoutForm
                        order={selectedOrder}
                        onSuccess={handlePaymentSuccess}
                      />
                    </Elements>
                  </>
                ) : (
                  <Alert variant="info" className="text-center mt-4">
                    Please select an order from the dropdown above to proceed
                    with the payment.
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for Test Cards */}
      <Modal
        show={showTestCards}
        onHide={() => setShowTestCards(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            Available Test Cards
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-3">
            Click any card below to copy its number.
          </p>
          <div className="d-flex flex-column gap-3">
            {testCards.map((card, idx) => (
              <Card
                key={idx}
                className="shadow-sm border-primary"
                onClick={() => copyToClipboard(card.number)}
                style={{ cursor: "pointer" }}
              >
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong className="text-primary">
                      {card.brand} Test Card
                    </strong>
                    <small className="text-muted">📋 Click to copy</small>
                  </div>
                  <div style={{ fontSize: "16px" }}>
                    <strong>Number:</strong> {card.display}
                  </div>
                  <div className="text-muted mt-1" style={{ fontSize: "14px" }}>
                    <strong>Exp:</strong> {card.exp} &nbsp;|&nbsp;{" "}
                    <strong>CVV:</strong> {card.cvv}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Pay;
