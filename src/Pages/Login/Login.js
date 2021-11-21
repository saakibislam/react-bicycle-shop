import React, { useState } from 'react';
import { Alert, Container, Form } from 'react-bootstrap';
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
                {isLoading && <CDBContainer>
                    <CDBSpinner danger size="big" />
                </CDBContainer>}
                {authError && <Alert variant="danger">
                    {authError}
                </Alert>}
                <Container className='w-75 mx-auto my-5 shadow py-2'>
                    <form onSubmit={handleOnSubmit}>
                        <h3 className='mb-3'>Log in</h3>
                        <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                onBlur={handleOnBlur}
                                placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onBlur={handleOnBlur}
                                placeholder="Password" />
                        </Form.Group>

                        <p>New User? <Link to='/register'><span className='text-success fw-bold'>Create an account</span></Link></p>

                        <button
                            type="submit"
                            className="my-2 btn btn-dark btn-lg btn-block">
                            Sign in
                        </button>

                        <button
                            onClick={handleLoginWithGoogle}
                            className="my-2 btn btn-outline-dark btn-lg btn-block">
                            Google Sign in
                        </button>
                    </form>
                </Container >
            </Container >
            <Footer></Footer>
        </div >
    );
};

export default Login;