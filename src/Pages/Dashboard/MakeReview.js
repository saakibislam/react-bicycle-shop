import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const MakeReview = () => {
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
        fetch('https://dry-atoll-55407.herokuapp.com/reviews', {
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
                <form onSubmit={handleReviewSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control
                            required
                            as="textarea" rows={3}
                            onBlur={handleOnBlur}
                        />
                    </Form.Group>
                    <Button
                        className="px-5 py-2"
                        type='submit'
                        variant="primary"
                    >Post</Button>
                </form>
                {success && <Alert className='mt-3' variant="success">
                    Thank You. We appreciate your review.
                </Alert>}
            </Container>
        </div>
    );
};

export default MakeReview;