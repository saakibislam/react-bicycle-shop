import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import Navigation from '../Shared/Navigation/Navigation';
import { Button } from 'react-bootstrap';
import Footer from '../Shared/Footer/Footer';
import PurchaseModal from './PurchaseModal';

const BicycleDetails = () => {
    const { id } = useParams();
    const [bicycle, setBicycle] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let isMounted = true;
        fetch(`/explore/${id}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setBicycle(data)
                }
            })
        return () => { isMounted = false };
    }, [id])


    return (
        <div>
            <Navigation></Navigation>
            <h1 className='my-3 text-success'>{bicycle.name}</h1>
            <Container className='my-5'>
                <Row>
                    <Col>
                        <img className='img-fluid' src={bicycle.img} alt="" />
                    </Col>
                    <Col>
                        <div style={{ boxShadow: '0px 0px 15px lightgray', height: '500px', padding: '20px' }}>
                            <div>
                                <h2>{bicycle.name}</h2>
                                <p>{bicycle.description}</p>
                            </div>
                            <div className='my-3'>
                                <h4 className="text-success">Price: ${bicycle.price}</h4>
                            </div>
                            <Button variant='success' onClick={handleShow}>Buy Now</Button>
                        </div>
                    </Col>
                </Row>
                <PurchaseModal show={show} handleClose={handleClose} bicycle={bicycle}></PurchaseModal>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default BicycleDetails;