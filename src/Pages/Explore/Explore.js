import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navigation from '../Shared/Navigation/Navigation';

const Explore = () => {
    const [bicycles, setBicycles] = useState();

    useEffect(() => {
        let isMounted = true;
        fetch('https://dry-atoll-55407.herokuapp.com/explore')
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setBicycles(data)
                }
            })
        return () => { isMounted = false };
    }, [])
    return (
        <div>
            <Navigation></Navigation>
            <h1 className='my-2'>Top bikes of the world</h1>
            <Container>
                <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                    {
                        bicycles?.map(bicycle => <Col key={bicycle._id}>
                            <Card className='p-2 rounded-2 shadow'>
                                <Card.Img variant="top" className='w-75 mx-auto' src={bicycle.img} />
                                <Card.Body>
                                    <Card.Title>{bicycle.name}</Card.Title>
                                    <Card.Text>
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
            <Footer></Footer>
        </div>
    );
};

export default Explore;