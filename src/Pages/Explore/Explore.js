import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../Shared/Footer/Footer";
import Loading from "../Shared/Loading/Loading";
import Navigation from "../Shared/Navigation/Navigation";
import ProductCard from "./ProductCard";

const Explore = () => {
  const [products, setProducts] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  if (!products) return <Loading></Loading>;

  return (
    <div>
      <Navigation></Navigation>
      <h1 className="my-2 display-6">Top bikes of the world</h1>
      <Container>
        <Row xs={1} sm={1} md={2} lg={3} className="gy-3 py-3">
          {products?.map((product) => (
            <Col key={product._id}>
              <ProductCard product={product}></ProductCard>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Explore;
