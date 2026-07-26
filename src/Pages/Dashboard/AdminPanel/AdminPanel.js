import { useState } from "react";
import Loading from "../../../components/Shared/Loading/Loading";
import Toaster from "../../../components/Shared/Toaster/Toaster";
import { useApi } from "../../../hooks/api";
import useAuth from "../../../hooks/useAuth";
import AdminTable from "./AdminTable";
import NewAdminModal from "./NewAdminModal";

const AdminPanel = () => {
  const { user } = useAuth();
  const {
    data: admins,
    loading,
    error,
    setData: setAdmins,
    refetch,
  } = useApi("/users?role=admin");
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState({});

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const otherAdmins = admins?.filter((admin) => admin._id !== user._id);

  return (
    <div>
      {otherAdmins?.length ? <h3>Admin Panel</h3> : <h3>No Admins Found</h3>}
      <NewAdminModal
        refetch={refetch}
        setToastMessage={setToastMessage}
        setToastShow={setToastShow}
      />
      {otherAdmins?.length > 0 && (
        <AdminTable
          admins={otherAdmins}
          setAdmins={setAdmins}
          setToastMessage={setToastMessage}
          setToastShow={setToastShow}
        />
      )}
      <Toaster toast={toastMessage} show={toastShow} setShow={setToastShow} />
    </div>
  );
};

export default AdminPanel;
