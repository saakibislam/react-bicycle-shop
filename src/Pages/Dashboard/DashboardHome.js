import { Button, Container } from "react-bootstrap";

const DashboardHome = ({ orders, setOrders }) => {
  // Cancel Order
  const handleOrderCancel = (orderId) => {
    const confirmationForDelete = window.confirm(
      "Are you sure you want to cancel this order?",
    );
    if (confirmationForDelete) {
      fetch(`http://localhost:5000/api/v2/orders/${orderId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            const remainingOrders = orders.filter(
              (order) => order._id !== orderId,
            );
            setOrders(remainingOrders);
          }
        })
        .catch((error) => console.error("Error cancelling order:", error));
    }
  };

  if (orders.length === 0)
    return (
      <h3>
        Orders: <small>{orders?.length}</small>
      </h3>
    );

  return (
    <div>
      {/* Table  */}
      <Container>
        <div className="card my-4">
          <div className="card-header">
            <i className="fas fa-table mr-1"></i>
            Manage Orders
          </div>
          <div className="card-body">
            <div className="table-responsive-md">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Bicycle Type</th>
                    <th>Price ($)</th>
                    <th>Purchased date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order._id}>
                      <td>{order.user.name}</td>
                      <td>
                        {[
                          order.apartment,
                          order.street,
                          order.city,
                          order.zip,
                          order.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </td>
                      <td>{order.item?.name}</td>
                      <td>{order.item?.price}</td>
                      <td>
                        {new Date(order.dateOrdered).toLocaleDateString()}
                      </td>
                      <td>
                        <span
                          className={`fw-bold ${order.status === "Confirmed" ? "text-success" : "text-warning"}`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                      <td>
                        {order.status === "Confirmed" ? (
                          <span
                            className="text-muted"
                            style={{ fontSize: "0.9rem" }}
                          >
                            Not Allowed
                          </span>
                        ) : (
                          <Button
                            onClick={() => handleOrderCancel(order._id)}
                            variant="danger"
                            size="sm"
                          >
                            Cancel
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardHome;
