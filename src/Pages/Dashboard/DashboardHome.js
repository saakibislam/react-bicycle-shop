import React from "react";
import { Button, Container } from "react-bootstrap";

const DashboardHome = ({ orders }) => {
  // Cancel Order
  const handleOrderCancel = (orderId) => {
    const confirmationForDelete = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (confirmationForDelete) {
      fetch(`/cancel?orderId=${orderId}`, {
        method: "DELETE",
      });
    }
  };

  if (orders?.length === 0)
    return (
      <h3>
        Orders: <small>{orders?.length}</small>
      </h3>
    );

  return (
    <div>
      {/* Table  */}
      <Container>
        <div className="card m-4">
          <div className="card-header">
            <i className="fas fa-table mr-1"></i>
            Manage Orders
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Bicycle Type</th>
                    <th>Price ($)</th>
                    <th>Purchased date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order._id}>
                      <td>{order.buyerName}</td>
                      <td>{order.buyerEmail}</td>
                      <td>{order.cycleType}</td>
                      <td>{order.price}</td>
                      <td>{order.purchasedOn}</td>
                      <td>
                        <Button
                          onClick={() => handleOrderCancel(order._id)}
                          variant="danger"
                          size="sm"
                        >
                          Cancel
                        </Button>
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
