import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../Shared/Footer/Footer';
import Navigation from '../Shared/Navigation/Navigation';

const About = () => {
    return (
        <div>
            <Navigation></Navigation>
            <h1 className='my-4'>About us</h1>
            <Container>
                <Row>
                    <Col>
                        <img className="w-75" src="https://images.unsplash.com/photo-1584467735871-8e85353a8413?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" alt="" />
                    </Col>
                    <Col>
                        <div>
                            <h2>Why Choose Us</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti blanditiis rerum quaerat deserunt quidem impedit, quasi voluptates dolores perspiciatis maiores. Hic deserunt rerum necessitatibus dignissimos velit odio accusantium ipsum facilis provident corporis accusamus vero sapiente laudantium placeat dolor, ipsa amet perferendis eum. Iure mollitia dignissimos, unde cumque consectetur sequi dolores magnam expedita facere labore quod aspernatur maxime modi doloribus voluptatem eum exercitationem vitae eos praesentium enim dolorem explicabo obcaecati reprehenderit ratione! Ratione nemo vitae totam cumque officiis maiores corrupti, explicabo quis provident saepe minus minima, pariatur similique quae quia veniam unde. Praesentium vel eligendi iste. Debitis nemo libero molestiae nihil.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default About;