import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../components/Shared/Footer/Footer";
import Loading from "../../components/Shared/Loading/Loading";
import Navigation from "../../components/Shared/Navigation/Navigation";
import { useApi } from "../../hooks/api";
import ProductCard from "./ProductCard";

const Explore = () => {
  const { data: products, loading, error } = useApi("/products");

  if (loading) return <Loading></Loading>;
  if (error) return <p>Error: {error.message}</p>;

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
