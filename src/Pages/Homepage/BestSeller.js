import { Container, Row } from "react-bootstrap";
import { useApi } from "../api";
import Loading from "../Shared/Loading/Loading";
import BestSellerCard from "./BestSellerCard";

const BestSeller = () => {
  const { data: products, loading, error } = useApi("/products");

  if (loading) return <Loading></Loading>;
  if (error) return <p>Error: {error.message}</p>;

  const slicedProducts = products?.slice(0, 4);

  return (
    <Container className="py-5">
      <h1 className="display-6">Best sell</h1>
      <Row xs={1} sm={1} md={2} lg={4} className="g-4 py-5">
        {slicedProducts?.map((product) => (
          <BestSellerCard key={product._id} product={product}></BestSellerCard>
        ))}
      </Row>
    </Container>
  );
};
export default BestSeller;
