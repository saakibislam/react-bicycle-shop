import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Toaster from "../../Shared/Toaster/Toaster";
import AdminTable from "./AdminTable";
import NewAdminModal from "./NewAdminModal";

const AdminPanel = () => {
  const [admins, setAdmins] = useState([]);
  const { user } = useAuth();
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchAdmins = async () => {
    try {
      const response = await fetch(`${apiUrl}/users?role=admin`);
      const data = await response.json();
      const otherAdmins = data.filter((admin) => admin._id !== user._id);
      setAdmins(otherAdmins);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div>
      {admins.length ? <h3>Admin Panel</h3> : <h3>No Admins Found</h3>}
      <NewAdminModal
        fetchAdmins={fetchAdmins}
        toastShow={toastShow}
        setToastShow={setToastShow}
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
      {admins.length > 0 && (
        <AdminTable
          admins={admins}
          fetchAdmins={fetchAdmins}
          toastShow={toastShow}
          setToastShow={setToastShow}
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        />
      )}
      <Toaster toast={toastMessage} show={toastShow} setShow={setToastShow} />
    </div>
  );
};

export default AdminPanel;
