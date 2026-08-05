import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { deleteApi, putApi } from "../../../hooks/api";

const EMPTY_FORM = { name: "", image: "", price: "", description: "" };

const RemoveProduct = ({ products, setProducts, setToastMessage, setToastShow }) => {
  const [removeModalShow, setRemoveModalShow] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  const [editModalShow, setEditModalShow] = useState(false);
  const [editProductId, setEditProductId] = useState("");
  const [editForm, setEditForm] = useState(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);

  // --- Remove handlers ---
  const handleRemoveProduct = async () => {
    if (!selectedProductId) return;
    try {
      const data = await deleteApi(`/products/${selectedProductId}`);
      setProducts(products.filter((p) => p._id !== selectedProductId));
      setRemoveModalShow(false);
      setSelectedProductId("");
      setToastMessage({ variant: "danger", message: data.message });
      setToastShow(true);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  // --- Edit handlers ---
  const handleEditProductSelect = (e) => {
    const id = e.target.value;
    setEditProductId(id);
    if (!id) {
      setEditForm(EMPTY_FORM);
      return;
    }
    const product = products.find((p) => p._id === id);
    if (product) {
      setEditForm({
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
      });
    }
  };

  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditProduct = async () => {
    if (!editProductId) return;
    setIsSaving(true);
    try {
      const data = await putApi(`/products/${editProductId}`, editForm);
      setProducts(
        products.map((p) =>
          p._id === editProductId ? { ...p, ...editForm } : p
        )
      );
      handleEditModalClose();
      setToastMessage({
        variant: "success",
        message: data.message || "Product updated successfully",
      });
      setToastShow(true);
    } catch (error) {
      setToastMessage({ variant: "danger", message: error.message });
      setToastShow(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditModalClose = () => {
    setEditModalShow(false);
    setEditProductId("");
    setEditForm(EMPTY_FORM);
  };

  return (
    <>
      <div className="d-flex justify-content-end gap-2 m-3">
        <Button variant="warning" onClick={() => setEditModalShow(true)}>
          Edit Product
        </Button>
        <Button variant="danger" onClick={() => setRemoveModalShow(true)}>
          Remove Product
        </Button>
      </div>

      {/* ── Edit Modal ── */}
      <Modal show={editModalShow} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Product</Form.Label>
              <Form.Select value={editProductId} onChange={handleEditProductSelect}>
                <option value="">Select a product to edit</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditFormChange}
                disabled={!editProductId}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={editForm.image}
                onChange={handleEditFormChange}
                disabled={!editProductId}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={editForm.price}
                step="any"
                min={0}
                onChange={handleEditFormChange}
                disabled={!editProductId}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={editForm.description}
                rows={4}
                onChange={handleEditFormChange}
                disabled={!editProductId}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Cancel
          </Button>
          <Button
            variant="warning"
            onClick={handleEditProduct}
            disabled={!editProductId || isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ── Remove Modal ── */}
      <Modal
        show={removeModalShow}
        onHide={() => setRemoveModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Product</Form.Label>
              <Form.Select
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
          <Button variant="secondary" onClick={() => setRemoveModalShow(false)}>
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
