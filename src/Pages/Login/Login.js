import React, { useState } from 'react';
import { Alert, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Footer from '../Shared/Footer/Footer';
import Navigation from '../Shared/Navigation/Navigation';
import { CDBSpinner, CDBContainer } from "cdbreact";
import { useLocation, useHistory } from "react-router-dom";

const Login = () => {
    const { isLoading, loginUser, loginWithGoogle, authError } = useAuth();
    const [loginData, setLoginData] = useState({});
    const location = useLocation();
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;

        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleOnSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history)
        e.preventDefault();
    }

    const handleLoginWithGoogle = () => {
        loginWithGoogle(location, history)
    }
    return (
        <div>
            <Navigation></Navigation>
            <Container>
                {isLoading && <CDBContainer className="my-2">
                    <CDBSpinner danger />
                </CDBContainer>}
                {authError && <Alert className='col-md-6 mx-auto' variant="danger">
                    {authError}
                </Alert>}
                <Row className="col-md-6 mx-auto shadow py-2 my-5">
                    <form onSubmit={handleOnSubmit}>
                        <h3 className='my-3'>Log in</h3>
                        <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                onBlur={handleOnBlur}
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onBlur={handleOnBlur}
                                placeholder="Password"
                                required
                            />
                        </Form.Group>

                        <p>New User? <Link to='/register'><span className='text-success fw-bold'>Create an account</span></Link></p>

                        <button
                            type="submit"
                            className="w-50 mx-auto my-2 btn btn-dark btn-lg btn-block">
                            Sign in
                        </button>

                        <button
                            onClick={handleLoginWithGoogle}
                            className="w-50 mx-auto my-2 btn btn-outline-dark btn-lg btn-block">
                            Google Sign in
                        </button>
                    </form>
                </Row >
            </Container >
            <Footer></Footer>
        </div >
    );
};

export default Login;