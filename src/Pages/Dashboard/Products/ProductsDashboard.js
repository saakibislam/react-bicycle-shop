import { useState } from "react";
import Loading from "../../../components/Shared/Loading/Loading";
import Toaster from "../../../components/Shared/Toaster/Toaster";
import { useApi } from "../../../hooks/api";
import AddProduct from "./AddProduct";
import RemoveProduct from "./RemoveProduct";

const ProductsDashboard = () => {
  const {
    data: products,
    loading,
    error,
    setData: setProducts,
  } = useApi("/products");
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState({});

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <RemoveProduct
        products={products}
        setProducts={setProducts}
        setToastMessage={setToastMessage}
        setToastShow={setToastShow}
      />
      <AddProduct />
      <Toaster toast={toastMessage} show={toastShow} setShow={setToastShow} />
    </>
  );
};

export default ProductsDashboard;
