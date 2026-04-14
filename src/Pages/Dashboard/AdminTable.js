import { Button, Card, Table } from "react-bootstrap";

const AdminTable = ({ admins, fetchAdmins }) => {
  const removeAdmin = async (adminId) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v2/users/admin/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            adminId,
            role: "user",
          }),
        },
      );
      const data = await response.json();
      if (data.user) {
        fetchAdmins();
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
                  variant="outline-danger"
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
