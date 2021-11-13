import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import Navigation from '../Shared/Navigation/Navigation';
import { Button } from 'react-bootstrap';
import useFirebase from '../hooks/useFirebase';
import { Link } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';

const BicycleDetails = () => {
    const { id } = useParams();
    const [bicycle, setBicycle] = useState({});
    const { user } = useFirebase();

    const nameRef = useRef();
    const emailRef = useRef();
    const cycleRef = useRef();
    const dateRef = useRef();
    const priceRef = useRef();

    useEffect(() => {
        fetch(`https://dry-atoll-55407.herokuapp.com/explore/${id}`)
            .then(res => res.json())
            .then(data => setBicycle(data))
    }, [])

    const handleOnSubmit = () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const cycleName = cycleRef.current.value;
        const purchasedDate = dateRef.current.value;
        const priceValue = priceRef.current.value;

        const order = {
            buyerName: name,
            buyerEmail: email,
            cycleType: cycleName,
            purchasedOn: purchasedDate,
            price: priceValue
        }
        fetch('https://dry-atoll-55407.herokuapp.com/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

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
                        <div style={{ backgroundColor: 'lightgray', height: '500px', padding: '20px' }}>
                            <div>
                                <h2>{bicycle.name}</h2>
                                <p>{bicycle.description}</p>
                            </div>
                            <div className='mt-5'>
                                <h4>Price: ${bicycle.price}</h4>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div>
                    <div className='w-50 mx-auto my-5 p-5' style={{ boxShadow: '0 0 10px gray', borderRadius: '5px' }}>
                        <h4 className='text-primary'>Purchase Form</h4>
                        <form>
                            <Form.Group
                                className="mb-3 text-start"
                                controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="email"
                                    defaultValue={user.displayName}
                                    ref={nameRef}
                                    placeholder="Your Name" />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 text-start"
                                controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    defaultValue={user.email}
                                    ref={emailRef}
                                    placeholder="name@example.com" />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 text-start"
                                controlId="exampleForm.ControlInput1">
                                <Form.Label>Cycle Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={bicycle.name}
                                    ref={cycleRef}
                                    placeholder="Cycle Name" />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 text-start"
                                controlId="exampleForm.ControlInput1">
                                <Form.Label>Purchase Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={new Date().toLocaleDateString()}
                                    ref={dateRef}
                                    disabled
                                    placeholder="Purchased Date" />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 text-start"
                                controlId="exampleForm.ControlInput1">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={bicycle.price}
                                    ref={priceRef}
                                    disabled
                                    placeholder="Product Price" />
                            </Form.Group>
                        </form>
                    </div>
                    <Link to='/success'>
                        <Button
                            onClick={handleOnSubmit}
                            size="lg" variant="success">
                            Purchase
                        </Button>
                    </Link>
                </div>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default BicycleDetails;