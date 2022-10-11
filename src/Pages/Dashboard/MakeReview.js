import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const MakeReview = ({ orders }) => {
    const { user } = useAuth();
    const [reviewData, setReviewData] = useState();
    const [success, setSuccess] = useState(false);

    const handleOnBlur = e => {
        const newReviewData = {
            name: user.displayName,
            img: user.photoURL,
            description: e.target.value
        }
        setReviewData(newReviewData);
        e.target.value = '';
    }

    const handleReviewSubmit = e => {
        e.preventDefault();
        fetch('/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setSuccess(true);
                }
            })
    }

    return (
        <div>
            <h3>Review Products</h3>
            <Container>
                <Row>
                    <Col className='col-md-8 mx-auto'>
                        <form onSubmit={handleReviewSubmit}>
                            <Form.Select aria-label="Default select example" className='my-3'>
                                {
                                    orders.map(order => <option key={order._id} value={order?.cycleType}>{order?.cycleType}</option>)
                                }
                            </Form.Select>
                            <Form.Group className="mb-3 text-start" controlId="exampleForm.ControlInput1">
                                <Form.Control
                                    required
                                    as="textarea"
                                    placeholder='Comments'
                                    rows={3}
                                    onBlur={handleOnBlur}
                                />
                            </Form.Group>
                            <Button
                                className="px-5 py-2"
                                type='submit'
                                variant="primary"
                            >Post</Button>
                        </form>
                    </Col>
                </Row>
                {success && <Alert className='mt-3' variant="success">
                    Thank You. We appreciate your review.
                </Alert>}
            </Container>
        </div >
    );
};

export default MakeReview;