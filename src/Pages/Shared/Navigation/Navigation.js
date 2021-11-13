import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const Navigation = () => {
    const { user, logOut } = useAuth();
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/explore">Explore</Nav.Link>
                        {user.email && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {user?.email ?
                            <Link to='/home'>
                                <Button
                                    onClick={logOut}
                                    variant='outline-danger' size="lg">
                                    Logout
                                </Button>
                            </Link>
                            :
                            <Link to='/login'>
                                <Button variant='outline-warning' size="lg">
                                    Login
                                </Button>
                            </Link>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navigation;