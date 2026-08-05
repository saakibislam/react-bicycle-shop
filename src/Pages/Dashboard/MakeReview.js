import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import StarRating from "../../components/Shared/StarRating/StarRating";
import { postApi } from "../../hooks/api";
import useAuth from "../../hooks/useAuth";

const EMPTY = { description: "", rating: 0 };

const MakeReview = ({ orders }) => {
  const { user } = useAuth();
  const [form, setForm] = useState(EMPTY);
  const [success, setSuccess] = useState(false);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (form.rating === 0) return;
    try {
      const data = await postApi("/reviews", {
        name: user.displayName,
        img: user.photoURL,
        description: form.description,
        rating: form.rating,
      });
      if (data.insertedId) {
        setSuccess(true);
        setForm(EMPTY);
      }
    } catch (error) {
      console.error("Error submitting review: ", error);
    }
  };

  return (
    <div>
      <h3>Review Products</h3>
      <Container>
        <Row>
          <Col className="col-md-8 mx-auto">
            <form onSubmit={handleReviewSubmit}>
              <Form.Select aria-label="Select product" className="my-3">
                {orders?.map((order) => (
                  <option key={order._id} value={order?.item?.name}>
                    {order?.item?.name}
                  </option>
                ))}
              </Form.Select>
              <div className="mb-3 text-start">
                <Form.Label>Your Rating</Form.Label>
                <div>
                  <StarRating
                    value={form.rating}
                    onChange={(r) => setForm((f) => ({ ...f, rating: r }))}
                    size="1.8rem"
                  />
                </div>
              </div>
              <Form.Group className="mb-3 text-start">
                <Form.Control
                  required
                  as="textarea"
                  placeholder="Comments"
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                />
              </Form.Group>
              <Button
                className="px-5 py-2"
                type="submit"
                variant="primary"
                disabled={form.rating === 0}
              >
                Post
              </Button>
            </form>
          </Col>
        </Row>
        {success && (
          <Alert className="mt-3" variant="success">
            Thank You. We appreciate your review.
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default MakeReview;
