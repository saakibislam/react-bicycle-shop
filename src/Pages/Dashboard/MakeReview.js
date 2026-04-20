import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { postApi } from "../api";
import useAuth from "../hooks/useAuth";

const MakeReview = ({ orders }) => {
  const { user } = useAuth();
  const [reviewData, setReviewData] = useState();
  const [success, setSuccess] = useState(false);

  const handleOnBlur = (e) => {
    const newReviewData = {
      name: user.displayName,
      img: user.photoURL,
      description: e.target.value,
    };
    setReviewData(newReviewData);
    e.target.value = "";
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postApi("/reviews", reviewData);
      if (data.insertedId) {
        setSuccess(true);
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
              <Form.Select aria-label="Default select example" className="my-3">
                {orders?.map((order) => (
                  <option key={order._id} value={order?.cycleType}>
                    {order?.cycleType}
                  </option>
                ))}
              </Form.Select>
              <Form.Group
                className="mb-3 text-start"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  required
                  as="textarea"
                  placeholder="Comments"
                  rows={3}
                  onBlur={handleOnBlur}
                />
              </Form.Group>
              <Button className="px-5 py-2" type="submit" variant="primary">
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
