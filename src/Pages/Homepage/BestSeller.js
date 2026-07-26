import { Alert, Container, Row } from "react-bootstrap";
import Loading from "../../components/Shared/Loading/Loading";
import { useApi } from "../../hooks/api";
import BestSellerCard from "./BestSellerCard";

const BestSeller = () => {
  const { data: products, loading, error } = useApi("/products");

  if (loading) return <Loading></Loading>;
  if (error) return <Alert variant="danger">{error.message}</Alert>;

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
