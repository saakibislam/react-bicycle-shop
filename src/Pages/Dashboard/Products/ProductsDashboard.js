import { useEffect, useState } from "react";
import Toaster from "../../Shared/Toaster/Toaster";
import AddProduct from "./AddProduct";
import RemoveProduct from "./RemoveProduct";

const ProductsDashboard = () => {
  const [products, setProducts] = useState([]);
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();

    return () => {};
  }, []);
  return (
    <>
      <RemoveProduct
        fetchProducts={fetchProducts}
        products={products}
        setToastMessage={setToastMessage}
        setToastShow={setToastShow}
      />
      <AddProduct />
      <Toaster toast={toastMessage} show={toastShow} setShow={setToastShow} />
    </>
  );
};

export default ProductsDashboard;
