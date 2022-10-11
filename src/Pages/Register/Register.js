import React, { useState } from 'react';
import { Alert, Container, Form, Row, Toast } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Footer from '../Shared/Footer/Footer';
import Navigation from '../Shared/Navigation/Navigation';
import { CDBSpinner, CDBContainer } from "cdbreact";

const Register = () => {
    const [registerData, setRegisterData] = useState({});
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [show, setShow] = useState(true);
    const { user, registerUser, isLoading, authError } = useAuth();
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;

        const newRegisterData = { ...registerData };
        newRegisterData[field] = value;
        setRegisterData(newRegisterData);
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        if (registerData.password !== registerData.password2) {
            setPasswordMatch(true);
            return
        }
        registerUser(registerData.email, registerData.password, registerData.name, history)
    }
    return (
        <div>
            <Navigation></Navigation>
            <Container>
                {user?.email && <Toast bg="success" className='ms-auto' onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Body className='text-white'>Woohoo, you're reading this text in a Toast!</Toast.Body>
                </Toast>}
                <Row className='col-md-6 mx-auto my-4'>
                    {authError && <Alert variant="danger">
                        {authError}
                    </Alert>}
                    {/* w-75 mx-auto my-2 shadow p-5 */}
                    {!isLoading && <form onSubmit={handleOnSubmit}>
                        <h3>Sign up</h3>
                        <Form.Group className="mb-3 text-start" controlId="formUserName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                onBlur={handleOnBlur}
                                placeholder="Your name" />
                        </Form.Group>

                        <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                onBlur={handleOnBlur}
                                placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3 text-start" controlId="formUserPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onBlur={handleOnBlur}
                                placeholder="Enter password" />
                        </Form.Group>

                        <Form.Group className="mb-3 text-start" controlId="formUserPassword2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password2"
                                onBlur={handleOnBlur}
                                placeholder="Re-Type your password" />
                        </Form.Group>

                        {passwordMatch && <p className='text-danger text-start'>Password do not match</p>}

                        <p>Already registered? <Link to='/login'><span className='text-success fw-bold'>Login</span></Link></p>
                        <button type="submit" className="w-50 mx-auto my-2 btn btn-dark btn-lg btn-block">Sign up</button>
                    </form>}
                    {isLoading && <CDBContainer>
                        <CDBSpinner danger size="big" />
                    </CDBContainer>}
                </Row>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default Register;