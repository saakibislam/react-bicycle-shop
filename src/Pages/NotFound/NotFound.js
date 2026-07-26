import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100 text-center">
        <Col>
          <h1 className="display-1 fw-bold text-primary mb-3">404</h1>
          <h2 className="h3 mb-3">Oops! Page Not Found</h2>
          <p className="text-muted mb-4">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Link to="/home">
            <Button variant="primary" size="lg" className="px-5">
              Back to Home
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
