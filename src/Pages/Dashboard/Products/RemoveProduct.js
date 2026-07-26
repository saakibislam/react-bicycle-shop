import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { deleteApi } from "../../../hooks/api";

const RemoveProduct = ({
  products,
  setProducts,
  setToastMessage,
  setToastShow,
}) => {
  const [adminModalShow, setAdminModalShow] = useState(false);
  const handleRemoveProductModalClose = () => setAdminModalShow(false);
  const handleRemoveProductModalShow = () => setAdminModalShow(true);
  const [selectedProductId, setSelectedProductId] = useState("");

  const handleRemoveProduct = async () => {
    if (!selectedProductId) return;

    try {
      const data = await deleteApi(`/products/${selectedProductId}`);
      setProducts(products.filter((p) => p._id !== selectedProductId));
      handleRemoveProductModalClose();
      setSelectedProductId("");
      setToastMessage({
        variant: "danger",
        message: data.message,
      });
      setToastShow(true);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end m-3">
        <Button variant="danger" onClick={handleRemoveProductModalShow}>
          Remove Product
        </Button>
      </div>
      <Modal show={adminModalShow} onHide={handleRemoveProductModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Select Product</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
              >
                <option value="">Select a product to remove</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRemoveProductModalClose}>
            Close
          </Button>
          <Button variant="outline-danger" onClick={handleRemoveProduct}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveProduct;
