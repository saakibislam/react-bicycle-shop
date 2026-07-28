import { Alert, Col, Container, Row } from "react-bootstrap";
import SkeletonCard from "../../components/Shared/Loading/SkeletonCard";
import { useApi } from "../../hooks/api";
import BestSellerCard from "./BestSellerCard";

const BestSeller = () => {
  const { data: products, loading, error } = useApi("/products");

  if (loading) {
    return (
      <Container className="py-5">
        <h1 className="display-6">Best sell</h1>
        <Row xs={1} sm={1} md={2} lg={4} className="g-4 py-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Col key={i}>
              <SkeletonCard />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  if (error) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <Container className="py-5">
      <h1 className="display-6">Best sell</h1>
      <Row xs={1} sm={1} md={2} lg={4} className="g-4 py-5">
        {products?.slice(0, 4).map((product) => (
          <BestSellerCard key={product._id} product={product} />
        ))}
      </Row>
    </Container>
  );
};

export default BestSeller;
