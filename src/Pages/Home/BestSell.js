import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BestSell = () => {
    const [bicycles, setBicycles] = useState();

    useEffect(() => {
        let isMounted = true;
        fetch('https://dry-atoll-55407.herokuapp.com/explore')
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setBicycles(data.slice(0, 4))
                }
            })
        return () => { isMounted = false };
    }, [])
    return (
        <Container className="my-3 p-3">
            <h1 className='my-2'>Best sell</h1>
            <Row xs={1} sm={1} md={2} lg={4} className="g-4">
                {
                    bicycles?.map(bicycle => <Col key={bicycle._id}>
                        <Card className='p-2 rounded-2 shadow h-100'>
                            <Card.Img variant="top" className='mx-auto' alt="Image Source Unavailable" src={bicycle.img} />
                            <Card.Body>
                                <Card.Title>{bicycle.name}</Card.Title>
                                <Card.Text className="text-muted">
                                    {bicycle.description.slice(0, 80)}
                                </Card.Text>
                            </Card.Body>
                            <Card.Subtitle className="mb-2 text-danger">Price: ${bicycle.price}</Card.Subtitle>
                            <Link to={`/explore/${bicycle._id}`}>
                                <Button className='w-100' variant="success">
                                    Purchase
                                </Button>
                            </Link>
                        </Card>
                    </Col>)
                }
            </Row>
        </Container>
    )
}

export default BestSell