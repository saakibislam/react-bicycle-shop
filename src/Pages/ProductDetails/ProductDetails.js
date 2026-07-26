import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useParams } from "react-router";
import Footer from "../../components/Shared/Footer/Footer";
import Loading from "../../components/Shared/Loading/Loading";
import Navigation from "../../components/Shared/Navigation/Navigation";
import { useApi } from "../../hooks/api";
import PurchaseModal from "./PurchaseModal";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, loading, error } = useApi(`/products/${id}`);
  const [modalShow, setModalShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  const toggleToast = () => setToastShow(!toastShow);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <Navigation></Navigation>
      <h1 className="my-3 text-success">{product.name}</h1>
      <Container className="my-5">
        <Row xs={1} md={2} className="g-5 align-items-center">
          <Col>
            <img className="img-fluid" src={product.image} alt="" />
          </Col>
          <Col>
            <div
              style={{
                boxShadow: "0px 0px 15px lightgray",
                padding: "20px",
              }}
              className="text-start"
            >
              <div>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
              </div>
              <div className="my-3">
                <h4 className="text-success">Price: ${product.price}</h4>
              </div>
              <div className="d-grid d-lg-block text-lg-center mt-4">
                <Button
                  variant="success"
                  onClick={handleShow}
                  className="px-lg-5 py-lg-2"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <PurchaseModal
          show={modalShow}
          handleClose={handleClose}
          product={product}
          toggleToast={toggleToast}
        ></PurchaseModal>
      </Container>
      <ToastContainer className="p-3" position="top-end">
        <Toast
          bg="success text-white"
          show={toastShow}
          onClose={toggleToast}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={true}>
            &nbsp;
            <strong className="me-auto">Success!</strong>
            <small>3 sec ago</small>
          </Toast.Header>
          <Toast.Body>Your order has been placed successfully.</Toast.Body>
        </Toast>
      </ToastContainer>
      <Footer></Footer>
    </div>
  );
};

export default ProductDetails;
