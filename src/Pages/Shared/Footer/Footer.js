import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <div className='bg-dark tex-white p-5'>
            <Container>
                <Row>
                    <Col>
                        <h3 className='text-white'>Logo Here</h3>
                    </Col>
                    <Col>
                        <h5 className='text-white'>Quick Links</h5>
                        <ul className='list-unstyled mt-4'>
                            <li className='bg-dark m-2 text-white'>Explore</li>
                            <li className='bg-dark m-2 text-white'>About</li>
                            <li className='bg-dark m-2 text-white'>Contact</li>
                        </ul>
                    </Col>
                    <Col>
                        <h5 className='text-white'>Features</h5>
                        <ul className='list-unstyled mt-4'>
                            <li className='bg-dark m-2 text-white'>Explore</li>
                            <li className='bg-dark m-2 text-white'>About</li>
                            <li className='bg-dark m-2 text-white'>Contact</li>
                        </ul>
                    </Col>
                    <Col>
                        <h5 className='text-white'>Subscribe Box</h5>
                        <ul className='list-unstyled mt-4'>
                            <li className='bg-dark m-2 text-white'>Explore</li>
                            <li className='bg-dark m-2 text-white'>About</li>
                            <li className='bg-dark m-2 text-white'>Contact</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;