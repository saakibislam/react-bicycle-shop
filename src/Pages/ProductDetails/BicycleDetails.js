import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useParams } from "react-router";
import Footer from "../Shared/Footer/Footer";
import Navigation from "../Shared/Navigation/Navigation";
import PurchaseModal from "./PurchaseModal";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  const toggleToast = () => setToastShow(!toastShow);

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/api/v2/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setProduct(data);
        }
      })
      .catch((error) => console.log(error));
    return () => {
      isMounted = false;
    };
  }, [id]);

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
