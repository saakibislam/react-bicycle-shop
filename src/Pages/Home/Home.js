import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navigation from '../Shared/Navigation/Navigation';
import Banner from './Banner';

const Home = () => {
    const [bicycles, setBicycles] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/explore')
            .then(res => res.json())
            .then(data => setBicycles(data.slice(0, 4)))
    }, [])
    return (
        <div>
            <Navigation></Navigation>
            <Banner></Banner>
            <Container className="my-3 p-3">
                <h1 className='my-2'>Best sell</h1>
                <Row xs={1} sm={1} md={2} lg={4} className="g-4">
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

export default Home;