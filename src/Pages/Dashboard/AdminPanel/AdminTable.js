import { Button, Card, Table } from "react-bootstrap";
import { patchApi } from "../../../hooks/api";

const AdminTable = ({ admins, setAdmins, setToastMessage, setToastShow }) => {
  const removeAdmin = async (adminId) => {
    try {
      const data = await patchApi("/users/admin", {
        adminId,
        role: "user",
      });
      if (data.user) {
        setToastMessage({
          variant: "danger",
          message: data.message || "Admin removed successfully",
        });
        setToastShow(true);
        setAdmins(admins.filter((admin) => admin._id !== adminId));
      }
    } catch (error) {
      console.error("Error removing admin:", error);
    }
  };
  return (
    <Card.Body>
      <Table striped responsive="md">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin._id}>
              <td>{index + 1}</td>
              <td>{admin.name}</td>
              <td>{admin.isAdmin ? "Admin" : "User"}</td>
              <td>{admin.email}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeAdmin(admin._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card.Body>
  );
};

export default AdminTable;
