import { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Row } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import Footer from "../../components/Shared/Footer/Footer";
import Navigation from "../../components/Shared/Navigation/Navigation";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { user, loginUser, loginWithGoogle, authError, setAuthError } =
    useAuth();
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

  useEffect(() => {
    // If the user object has an email (or _id), they are logged in
    // Redirects to homepage and replaces the history entry
    if (user && user.email) {
      history.replace("/");
    }
  }, [user, history]);

  return (
    <div>
      <Navigation></Navigation>
      <Container>
        {/* Login Failed Alert  */}
        {authError && (
          <Alert className="col-md-6 mx-auto my-2" variant="danger">
            {authError}
          </Alert>
        )}
        <Row className="col-md-6 mx-auto shadow p-3 my-5">
          <Form onSubmit={handleOnSubmit}>
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
                <Link to="/register" onClick={() => setAuthError("")}>
                  <span className="text-success fw-bold">
                    Create an account
                  </span>
                </Link>
              </small>
            </p>

            <div className="d-grid gap-2">
              {/* Normal Sign In  */}
              <Button
                className="w-50 mx-auto"
                variant="dark"
                size="lg"
                type="submit"
              >
                Sign In
              </Button>

              {/* Google Sign In Button  */}

              <Button
                className="w-50 mx-auto"
                onClick={handleLoginWithGoogle}
                variant="outline-dark"
                size="lg"
              >
                Google Sign In
              </Button>
            </div>
          </Form>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Login;
