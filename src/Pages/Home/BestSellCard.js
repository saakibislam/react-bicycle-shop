import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BestSellCard = ({ bicycle }) => {
  const { img, description, price, _id } = bicycle;
  return (
    <Col>
      <Card className="p-2 rounded-2 shadow h-100">
        <Card.Img
          variant="top"
          className="mx-auto"
          alt="Image Source Unavailable"
          src={img}
        />
        <Card.Body>
          <Card.Title>{bicycle.name}</Card.Title>
          <Card.Text className="text-muted">
            {description.slice(0, 80)}
          </Card.Text>
        </Card.Body>
        <Card.Subtitle className="mb-2 text-danger">
          Price: ${price}
        </Card.Subtitle>
        <Link to={`/explore/${_id}`}>
          <Button className="w-100" variant="success">
            Purchase
          </Button>
        </Link>
      </Card>
    </Col>
  );
};

export default BestSellCard;
