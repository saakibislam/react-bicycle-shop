import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Footer = () => {
  return (
    <div className="bg-dark tex-white p-5">
      <Container>
        <Row>
          <Col sm={12} md={6} lg={3}>
            <h3 className="text-white">Bike Mania</h3>
          </Col>
          <Col sm={12} md={6} lg={3}>
            <h5 className="text-white">Quick Links</h5>
            <ul className="list-unstyled mt-4">
              <Link to="/explore">
                <li className="bg-dark m-2 text-white">Explore</li>
              </Link>
              <Link to="/about">
                <li className="bg-dark m-2 text-white">About</li>
              </Link>
              <Link to="/contact">
                <li className="bg-dark m-2 text-white">Contact</li>
              </Link>
            </ul>
          </Col>
          <Col sm={12} md={6} lg={3}>
            <h5 className="text-white">Features</h5>
            <ul className="list-unstyled mt-4">
              <li className="bg-dark m-2 text-white">Explore</li>
              <li className="bg-dark m-2 text-white">About</li>
              <li className="bg-dark m-2 text-white">Contact</li>
            </ul>
          </Col>
          <Col sm={12} md={6} lg={3}>
            <Form.Group controlId="formSubscribeEmail">
              <Form.Control
                type="email"
                name="email"
                placeholder="Subscribe Now for latest updates"
                required
              />
              <Button className="mt-3 btn btn-secondary">Submit</Button>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
