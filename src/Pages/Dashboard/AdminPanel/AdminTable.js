import { Button, Card, Table } from "react-bootstrap";
import { patchApi } from "../../../hooks/api";

const AdminTable = ({ admins, setAdmins, setToastMessage, setToastShow }) => {
  const removeAdmin = async (email) => {
    try {
      const result = await patchApi("/users/admin", {
        email,
        role: "user",
      });
      if (result.data) {
        setToastMessage({
          variant: "danger",
          message: result.message || "Admin removed successfully",
        });
        setToastShow(true);
        setAdmins(admins.filter((admin) => admin.email !== email));
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
                  onClick={() => removeAdmin(admin.email)}
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
