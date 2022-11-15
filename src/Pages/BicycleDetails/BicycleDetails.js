import React, { useEffect, useState } from "react";
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

const BicycleDetails = () => {
  const { id } = useParams();
  const [bicycle, setBicycle] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  const toggleToast = () => setToastShow(!toastShow);

  useEffect(() => {
    let isMounted = true;
    fetch(`/explore/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setBicycle(data);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div>
      <Navigation></Navigation>
      <h1 className="my-3 text-success">{bicycle.name}</h1>
      <Container className="my-5">
        <Row>
          <Col>
            <img className="img-fluid" src={bicycle.img} alt="" />
          </Col>
          <Col>
            <div
              style={{
                boxShadow: "0px 0px 15px lightgray",
                height: "500px",
                padding: "20px",
              }}
            >
              <div>
                <h2>{bicycle.name}</h2>
                <p>{bicycle.description}</p>
              </div>
              <div className="my-3">
                <h4 className="text-success">Price: ${bicycle.price}</h4>
              </div>
              <Button variant="success" onClick={handleShow}>
                Buy Now
              </Button>
            </div>
          </Col>
        </Row>
        <PurchaseModal
          show={modalShow}
          handleClose={handleClose}
          bicycle={bicycle}
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

export default BicycleDetails;
