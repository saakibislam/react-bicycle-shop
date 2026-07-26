import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Toaster from "../../../components/Shared/Toaster/Toaster";
import { postApi } from "../../../hooks/api";

const AddProduct = () => {
  const [productData, setProductData] = useState({});
  const [success, setSuccess] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState({});

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newProductData = { ...productData };
    newProductData[field] = value;
    setProductData(newProductData);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await postApi("/products", productData);
      setSuccess(true);
      setProductData({});
      e.target.reset();
      setToastMessage({ variant: "success", message: result.message });
      setToastShow(true);
    } catch (error) {
      setToastMessage({ variant: "danger", message: error.message });
      setToastShow(true);
    }
  };
  return (
    <Container className="w-75 mx-auto px-5 py-2 shadow">
      <Toaster toast={toastMessage} show={toastShow} setShow={setToastShow} />
      <h3 className="mb-5">Add a Product</h3>
      <Form onSubmit={handleProductSubmit}>
        <Form.Group
          className="mb-3 text-start"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            onBlur={handleOnBlur}
            placeholder="Product Name"
          />
        </Form.Group>
        <Form.Group
          className="mb-3 text-start"
          controlId="exampleForm.ControlInput2"
        >
          <Form.Label>Product Image URL</Form.Label>
          <Form.Control
            required
            type="text"
            name="image"
            onBlur={handleOnBlur}
            placeholder="Product Image Link"
          />
        </Form.Group>
        <Form.Group
          className="mb-3 text-start"
          controlId="exampleForm.ControlInput3"
        >
          <Form.Label>Price ($)</Form.Label>
          <Form.Control
            required
            type="number"
            name="price"
            step="any"
            onBlur={handleOnBlur}
            placeholder="Product Price"
          />
        </Form.Group>
        <Form.Group
          className="mb-3 text-start"
          controlId="exampleForm.ControlInput4"
        >
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            name="description"
            onBlur={handleOnBlur}
            rows={5}
            placeholder="Tell something about the product"
          />
        </Form.Group>
        {success ? (
          <Button
            type="reset"
            className="m-2 px-4"
            variant="primary"
            onClick={() => setSuccess(false)}
          >
            Add Another
          </Button>
        ) : (
          <Button type="submit" className="px-5" variant="primary">
            Add
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default AddProduct;
