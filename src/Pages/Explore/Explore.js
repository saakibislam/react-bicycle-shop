import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Loading from "../Shared/Loading/Loading";
import Navigation from "../Shared/Navigation/Navigation";

const Explore = () => {
  const [bicycles, setBicycles] = useState();

  useEffect(() => {
    axios.get("explore").then((res) => setBicycles(res.data));
  }, []);

  if (!bicycles) return <Loading></Loading>;

  return (
    <div>
      <Navigation></Navigation>
      <h1 className="my-2 display-6">Top bikes of the world</h1>
      <Container>
        <Row xs={1} sm={1} md={2} lg={3} className="gy-3 py-3">
          {bicycles?.map((bicycle) => (
            <Col key={bicycle._id}>
              <Card className="p-2 rounded-2 shadow h-100">
                <div className="h-50">
                  <Card.Img
                    variant="top"
                    className="w-75 mx-auto"
                    src={bicycle.img}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{bicycle.name}</Card.Title>
                  <Card.Text>{bicycle.description.slice(0, 80)}</Card.Text>
                </Card.Body>
                <Card.Subtitle className="mb-2 text-danger">
                  Price: ${bicycle.price}
                </Card.Subtitle>
                <Link to={`/explore/${bicycle._id}`}>
                  <Button className="w-100" variant="success">
                    Purchase
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Explore;
