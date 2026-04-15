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
  Row,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";

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
        const response = await fetch(
          `http://localhost:5000/api/v2/orders/${order._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...order, status: "Confirmed" }),
          },
        );

        if (response.ok) {
          setError(null);
          setSuccess(true);
          setProcessing(false);
          console.log("[PaymentMethod created]", paymentMethod);
          if (onSuccess) onSuccess(order._id);
        } else {
          throw new Error(
            "Payment succeeded, but failed to update order status.",
          );
        }
      } catch (err) {
        setError(err.message);
        setSuccess(false);
        setProcessing(false);
      }
    }
  };

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
    alert(
      "Card number copied to clipboard! You can now paste it into the card field.",
    );
  };

  return (
    <>
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
                      Please use one of the floating test cards provided to
                      simulate a payment.
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

      {/* Floating Test Cards */}
      <ToastContainer
        position="bottom-end"
        className="p-4"
        style={{ zIndex: 1050, position: "fixed" }}
      >
        {testCards.map((card, idx) => (
          <Toast
            key={idx}
            onClose={() => {}}
            show={true}
            className="mb-2 shadow-lg border-0"
          >
            <Toast.Header closeButton={false} className="bg-light">
              <strong className="me-auto text-primary">
                {card.brand} Test Card
              </strong>
              <small className="text-muted">Click to copy</small>
            </Toast.Header>
            <Toast.Body
              style={{ cursor: "pointer", backgroundColor: "#fff" }}
              onClick={() => copyToClipboard(card.number)}
              title="Click to copy card number"
            >
              <div className="mb-1" style={{ fontSize: "15px" }}>
                <strong>Number:</strong> {card.display} 📋
              </div>
              <div className="text-muted" style={{ fontSize: "13px" }}>
                <strong>Exp:</strong> {card.exp} &nbsp;|&nbsp;{" "}
                <strong>CVV:</strong> {card.cvv}
              </div>
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </>
  );
};

export default Pay;
