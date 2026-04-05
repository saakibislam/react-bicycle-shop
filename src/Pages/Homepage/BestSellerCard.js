import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const BestSellerCard = ({ product }) => {
  const { name, image, description, price, _id } = product;
  return (
    <Col>
      <Card className="p-2 rounded-2 shadow h-100">
        <Card.Img
          variant="top"
          className="mx-auto"
          alt="Image Source Unavailable"
          src={image}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
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

export default BestSellerCard;
