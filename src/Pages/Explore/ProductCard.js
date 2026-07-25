import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  const { name, image, description, price, _id } = product;
  return (
    <Card className="p-2 rounded-2 shadow h-100">
      <div className="h-50">
        <Card.Img variant="top" className="w-75 mx-auto" src={image} />
      </div>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description.slice(0, 80)}</Card.Text>
      </Card.Body>
      <Card.Subtitle className="mb-2 text-danger">
        Price: ${price}
      </Card.Subtitle>
      <Link to={`/product/${_id}`}>
        <Button className="w-100" variant="success">
          Purchase
        </Button>
      </Link>
    </Card>
  );
};
export default ProductCard;
