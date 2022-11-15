import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";

const AddProduct = () => {
  const [productData, setProductData] = useState();
  const [success, setSuccess] = useState(false);

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newProductData = { ...productData };
    newProductData[field] = value;
    setProductData(newProductData);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    fetch("addProduct", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccess(true);
        }
      });
  };
  return (
    <div>
      <Container className="w-75 mx-auto px-5 py-2 shadow">
        {success && <Alert variant="info">Product Added Successfully</Alert>}
        <h3 className="mb-5">Add a Product</h3>
        <form onSubmit={handleProductSubmit}>
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
              name="img"
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
        </form>
      </Container>
    </div>
  );
};

export default AddProduct;
