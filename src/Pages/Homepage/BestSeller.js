import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Loading from "../Shared/Loading/Loading";
import BestSellerCard from "./BestSellerCard";

const BestSeller = () => {
  const [products, setProducts] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 4)))
      .catch((error) => console.log(error));

    return () => setProducts([]);
  }, []);

  if (!products) return <Loading></Loading>;

  return (
    <Container className="py-5">
      <h1 className="display-6">Best sell</h1>
      <Row xs={1} sm={1} md={2} lg={4} className="g-4 py-5">
        {products?.map((product) => (
          <BestSellerCard key={product._id} product={product}></BestSellerCard>
        ))}
      </Row>
    </Container>
  );
};

export default BestSeller;
