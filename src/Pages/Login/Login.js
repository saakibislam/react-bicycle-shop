import React, { useState } from 'react';
import { Alert, Container, Form, Spinner } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Footer from '../Shared/Footer/Footer';
import Navigation from '../Shared/Navigation/Navigation';

const Login = () => {
    const { setUser, isLoading, setIsLoading, loginUser, authError, loginWithGoogle } = useAuth();
    const [loginData, setLoginData] = useState({});
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/home';

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;

        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        loginUser(loginData.email, loginData.password);
    }

    const handleLoginWithGoogle = (e) => {
        e.preventDefault();
        loginWithGoogle()
            .then(result => {
                setUser(result.user)
                history.push(redirect_uri)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }
    return (
        <div>
            <Navigation></Navigation>
            <Container>
                {isLoading && <div className="m-5 mx-auto"><Spinner animation="border" size="lg" variant="success" /></div>}
                {authError && <Alert variant="danger">
                    {authError}
                </Alert>}
                <div className='w-50 mx-auto my-5 shadow p-5'>
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
                            className="w-100 my-2 btn btn-dark btn-lg btn-block">
                            Sign in
                        </button>

                        <button
                            onClick={handleLoginWithGoogle}
                            className="w-100 btn btn-outline-dark btn-lg btn-block">
                            Google Sign in
                        </button>
                    </form>
                </div>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default Login;