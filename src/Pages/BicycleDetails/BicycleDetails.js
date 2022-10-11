import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Form, Row, Buy } from 'react-bootstrap';
import { useParams } from 'react-router';
import Navigation from '../Shared/Navigation/Navigation';
import { Button } from 'react-bootstrap';
import useFirebase from '../hooks/useFirebase';
import { Link } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import PurchaseModal from './PurchaseModal';

const BicycleDetails = () => {
    const { id } = useParams();
    const [bicycle, setBicycle] = useState({});
    const { user } = useFirebase();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const nameRef = useRef();
    const emailRef = useRef();
    const cycleRef = useRef();
    const dateRef = useRef();
    const priceRef = useRef();
    const addressRef = useRef();

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

    /* const handleOnSubmit = () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const cycleName = cycleRef.current.value;
        const purchasedDate = dateRef.current.value;
        const priceValue = priceRef.current.value;
        const deliverAddress = addressRef.current.value;

        const order = {
            buyerName: name,
            buyerEmail: email,
            cycleType: cycleName,
            purchasedOn: purchasedDate,
            price: priceValue,
            address: deliverAddress
        }
        console.log(order);
        fetch('/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
    } */

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