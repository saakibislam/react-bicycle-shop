import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Toaster from "../Shared/Toaster/Toaster";
import AdminTable from "./AdminTable";
import NewAdminModal from "./NewAdminModal";

const AdminPanel = () => {
  const [success, setSuccess] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [toastShow, setToastShow] = useState(true);
  const { user } = useAuth();

  const fetchAdmins = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v2/users?role=admin",
      );
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
      <NewAdminModal setSuccess={setSuccess} fetchAdmins={fetchAdmins} />
      {/* {success && <Alert variant="success">New Admin Added</Alert>} */}
      {admins.length > 0 && (
        <AdminTable admins={admins} fetchAdmins={fetchAdmins} />
      )}
      <Toaster
        variant="success"
        message="New Admin Added"
        show={toastShow}
        setShow={setToastShow}
      />
    </div>
  );
};

export default AdminPanel;
