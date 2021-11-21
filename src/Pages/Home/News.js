import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const News = () => {
    return (
        <div className="my-3">
            <Container>
                <h2 className='mb-3'>News</h2>
                <Row>
                    <Col sm={12} md={6} lg={6}>
                        <div className="card mb-3" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="https://cdn.mos.cms.futurecdn.net/yWKxdTPDvtuk835owRewdf-450-80.jpg.webp" className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Cyclingnews.com</h5>
                                        <p className="card-text">Geraint Thomas reunited with stolen bike...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <div className="card mb-3" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="https://cdn.mos.cms.futurecdn.net/XvK4zg4mpi9rGQsJpJtHXn-970-80.jpg.webp" className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Simone Giuliani</h5>
                                        <p className="card-text">The 5 top sprinters in the women's...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <div className="card mb-3" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="https://cdn.mos.cms.futurecdn.net/HAgvc6Fsj63HfSQRJyZqw4-450-80.jpg.webp" className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Daniel Ostanek</h5>
                                        <p className="card-text">Fuglsang aims for Tour de France...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <div className="card mb-3" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="https://cdn.mos.cms.futurecdn.net/wBpaTPtKSVaRaaafTfTRC7-450-80.jpg.webp" className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Stephen Farrand </h5>
                                        <p className="card-text">Filippo Ganna tempted by 2022...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <div className="card mb-3" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="https://cdn.mos.cms.futurecdn.net/pmV7CpuX437K7DguajjmbW-1024-80.jpg.webp" className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Alasdair Fotheringham</h5>
                                        <p className="card-text">Vaughters: The Tour de France...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <div className="card mb-3" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="https://cdn.mos.cms.futurecdn.net/4cMuHLWWJzisTK6BTLgJT-1024-80.jpg.webp" className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Lance Branquinho</h5>
                                        <p className="card-text">Orbea launches 'All-terrain' Terra...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default News;