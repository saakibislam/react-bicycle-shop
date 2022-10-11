import React from 'react';
import Footer from '../Shared/Footer/Footer';
import Navigation from '../Shared/Navigation/Navigation';
import { Col, Container, Row } from 'react-bootstrap';

const Contact = () => {
    return (
        <div>
            <Navigation></Navigation>
            <Container className="my-3">
                <h1 className="my-4 display-6">Contact us</h1>
                <Row>
                    <Col className='col-md-6 mx-auto'>
                        <input className="form-control mb-3" type="text" placeholder="Your Email" required />
                        <input className="form-control mb-3" type="text" placeholder="Subject" />
                        <textarea className="form-control" rows={8} placeholder="Leave your message here" id="floatingTextarea"></textarea>
                        <button type='submit' className="btn btn-lg btn-outline-success mt-3">Subimt</button>
                    </Col>
                </Row>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default Contact;