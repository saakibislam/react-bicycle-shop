import { useState } from "react";
import { useApi } from "../../api";
import Loading from "../../Shared/Loading/Loading";
import Toaster from "../../Shared/Toaster/Toaster";
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
