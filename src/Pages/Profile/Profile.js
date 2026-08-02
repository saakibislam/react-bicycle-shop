import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Footer from "../../components/Shared/Footer/Footer";
import Navigation from "../../components/Shared/Navigation/Navigation";
import CountrySelect from "../../components/Shared/CountrySelect/CountrySelect";
import { patchApi } from "../../hooks/api";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || user?.displayName || "",
    phone: user?.phone || "",
    street: user?.street || "",
    apartment: user?.apartment || "",
    city: user?.city || "",
    zip: user?.zip || "",
    country: user?.country || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setIsSaving(true);
    setSuccess(false);
    setError("");

    try {
      await patchApi("/users/profile", form);
      const updatedUser = { ...user, ...form };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const avatar = user?.photoURL;
  const initial = (user?.name || user?.displayName || user?.email || "?")[0].toUpperCase();

  return (
    <div>
      <Navigation />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={7}>
            <Card className="shadow-sm p-4">
              <div className="text-center mb-4">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Profile"
                    className="rounded-circle mb-3"
                    style={{ width: 90, height: 90, objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: 90, height: 90, fontSize: "2rem", color: "#fff" }}
                  >
                    {initial}
                  </div>
                )}
                <h5 className="mb-0">{user?.name || user?.displayName}</h5>
                <p className="text-muted small">{user?.email}</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <h6 className="text-muted mb-3">Personal Info</h6>

                <Row xs={1} md={2} className="g-3 mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={user?.email || ""} disabled />
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
                        placeholder="Phone number"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h6 className="text-muted mb-3">Shipping Address</h6>

                <Form.Group className="mb-3">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    placeholder="Street address"
                  />
                </Form.Group>

                <Row xs={1} md={2} className="g-3 mb-3">
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
                      />
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
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Country</Form.Label>
                      <CountrySelect
                        value={form.country}
                        onChange={(val) =>
                          setForm((f) => ({ ...f, country: val }))
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {success && (
                  <Alert variant="success" className="py-2">
                    Profile updated successfully.
                  </Alert>
                )}
                {error && (
                  <Alert variant="danger" className="py-2">
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="success"
                  className="w-100"
                  disabled={isSaving || !form.name.trim()}
                >
                  {isSaving ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Profile;
