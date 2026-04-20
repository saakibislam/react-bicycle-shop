import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navigation from "../../components/Shared/Navigation/Navigation";

const Success = () => {
  return (
    <div>
      <Navigation></Navigation>
      <div className="mt-3">
        <h1>Order Successful</h1>
        <img
          className="mx-auto w-25"
          src="https://image.freepik.com/free-vector/online-ordering-purchase-making-buying-goods-internet-store-website-female-customer-with-tablet-adding-product-cart-cartoon-character_335657-2561.jpg"
          alt=""
        />
      </div>
      <Link to="/">
        <Button variant="primary" size="lg">
          Homepage
        </Button>
      </Link>
      <Link to="/explore">
        <Button className="m-3" variant="primary" size="lg">
          Order more
        </Button>
      </Link>
    </div>
  );
};

export default Success;
