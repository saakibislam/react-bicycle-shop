import React, { useEffect, useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';

const Feedback = () => {
    const [reviews, setReviews] = useState()
    useEffect(() => {
        let isMounted = true;
        fetch('https://dry-atoll-55407.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setReviews(data)
                }
            })
        return () => { isMounted = false };
    }, [])
    return (
        <Container>
            <h1>Feedback</h1>
            <Carousel variant="dark" fade>

                {
                    reviews?.map(review => <Carousel.Item key={review._id}>
                        <div style={{ height: '350px', paddingTop: '30px', margin: '10px' }}>
                            <img style={{ width: '100px' }} className='mb-5 rounded-circle' src={review.img} alt="User Avatar Cannot Load" />
                            <h5>{review.name}</h5>
                            <p>{review.description}</p>
                        </div>
                    </Carousel.Item>)
                }

            </Carousel>
        </Container>

    );
};

export default Feedback;
