import React, { useState } from "react";
import { Alert, Container, Form, Row } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Footer from "../Shared/Footer/Footer";
import Navigation from "../Shared/Navigation/Navigation";

const Login = () => {
  const { loginUser, loginWithGoogle, authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const history = useHistory();

  //   Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password, location, history);
  };

  //   Google Sing In Submission
  const handleLoginWithGoogle = () => {
    loginWithGoogle(location, history);
  };
  return (
    <div>
      <Navigation></Navigation>
      <Container>
        {/* Login Failed Alert  */}
        {authError && (
          <Alert className="col-md-6 mx-auto" variant="danger">
            {authError}
          </Alert>
        )}
        <Row className="col-md-6 mx-auto shadow py-2 my-5">
          <form onSubmit={handleOnSubmit}>
            <h3 className="my-3">Log in</h3>
            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3 text-start"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                required
              />
            </Form.Group>

            <p>
              <small>
                New User?{" "}
                <Link to="/register">
                  <span className="text-success fw-bold">
                    Create an account
                  </span>
                </Link>
              </small>
            </p>

            <div>
              {/* Normal Sign In  */}
              <button
                type="submit"
                className="btn btn-dark btn-lg btn-block w-75 mx-auto my-2"
              >
                Sign in
              </button>
              {/* Google Sign In Button  */}
              <button
                onClick={handleLoginWithGoogle}
                className="btn btn-outline-dark btn-lg btn-block w-75 mx-auto my-2"
              >
                Google Sign in
              </button>
            </div>
          </form>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Login;
