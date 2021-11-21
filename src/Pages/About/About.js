import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../Shared/Footer/Footer';
import Navigation from '../Shared/Navigation/Navigation';

const About = () => {
    return (
        <div>
            <Navigation></Navigation>
            <h1 className='my-4'>About us</h1>
            <Container className='mb-3'>
                <Row>
                    <Col sm={12} md={6} lg={6}>
                        <img className="w-75" src="https://images.unsplash.com/photo-1618762044398-ec1e7e048bbd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=327&q=80" alt="" />
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <div>
                            <h2>Why Choose Us</h2>
                            <p>In our huge local retail store you will find lots of bikes, parts, apparel and accessories on display, it's worth a look so please visit us once you're in or near Frankfurt (Main).

                                One of the annual highlights is our Testival, a bike event where lots of new products are presented by the manufacturers and distributors. Not only are the products shown, but we want the customers to test these goods and give us feedback so we can sell what our customers need!

                                HIBIKE wants you to enjoy one of the greatest hobbies in the world and would love to provide you with the required products!
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default About;