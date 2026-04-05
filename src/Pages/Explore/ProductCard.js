import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  return (
    <Card className="p-2 rounded-2 shadow h-100">
      <div className="h-50">
        <Card.Img variant="top" className="w-75 mx-auto" src={product.image} />
      </div>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description.slice(0, 80)}</Card.Text>
      </Card.Body>
      <Card.Subtitle className="mb-2 text-danger">
        Price: ${product.price}
      </Card.Subtitle>
      <Link to={`/explore/${product._id}`}>
        <Button className="w-100" variant="success">
          Purchase
        </Button>
      </Link>
    </Card>
  );
};
export default ProductCard;
