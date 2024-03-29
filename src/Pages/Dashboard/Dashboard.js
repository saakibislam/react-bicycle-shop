import {
  CDBBadge,
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import React, { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AddProduct from "./AddProduct";
import DashboardHome from "./DashboardHome";
import MakeAdmin from "./MakeAdmin";
import MakeReview from "./MakeReview";
import Pay from "./Pay";

const Dashboard = () => {
  let { path, url } = useRouteMatch();
  const { user, admin, logOut } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetch(`https://bike-mania.onrender.com/allorders?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setOrders(data);
        }
      })
      .catch((error) => console.log(error));
    return () => (isMounted = false);
  }, [user, orders]);
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar  */}
      <div>
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader
            prefix={<i className="fa fa-bars fa-large m-1"></i>}
          >
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Logo Here
            </a>
            <CDBBadge
              className="d-block mt-3 fs-5"
              color="success"
              borderType="pill"
            >
              {user?.displayName}
            </CDBBadge>
          </CDBSidebarHeader>

          <CDBSidebarContent>
            <CDBSidebarMenu>
              <CDBSidebarMenuItem>
                <NavLink to="/home">
                  <i className="fas fa-house-user m-1"></i>
                  Home
                </NavLink>
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem>
                <NavLink to="/explore">
                  <i className="fas fa-bicycle m-1"></i>
                  Explore Bicycles
                </NavLink>
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem>
                <NavLink to={`${url}`}>
                  <i className="fas fa-th-large m-1 "></i>
                  Dashboard
                  <Badge className="ms-1" bg="warning" text="dark">
                    {orders?.length}
                  </Badge>
                </NavLink>
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem>
                <NavLink
                  to={`${url}/pay`}
                  activeStyle={{
                    color: "orange",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  <i className="fas fa-money-check-alt m-1"></i>
                  Pay
                </NavLink>
              </CDBSidebarMenuItem>

              {admin ? (
                <>
                  <CDBSidebarMenuItem>
                    <NavLink
                      to={`${url}/makeAdmin`}
                      activeStyle={{
                        color: "orange",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      <i className="fas fa-user-plus m-1"></i>
                      Make Admin
                    </NavLink>
                  </CDBSidebarMenuItem>
                  <CDBSidebarMenuItem>
                    <NavLink
                      to={`${url}/addProduct`}
                      activeStyle={{
                        color: "orange",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      <i className="fas fa-cart-plus m-1"></i>
                      Add Product
                    </NavLink>
                  </CDBSidebarMenuItem>
                </>
              ) : (
                <></>
              )}

              <CDBSidebarMenuItem>
                <NavLink
                  to={`${url}/makeReview`}
                  activeStyle={{
                    color: "orange",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  <i className="far fa-comment-dots m-1"></i>
                  Review Product
                </NavLink>
              </CDBSidebarMenuItem>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              className="sidebar-btn-wrapper"
              style={{
                padding: "20px 5px",
              }}
            >
              <Button onClick={logOut} variant="danger" size="sm">
                Logout
              </Button>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
      {/* Dashboard panel  */}
      <div className="w-100">
        <div>
          <h1
            className="text-white"
            style={{ backgroundColor: "#333", padding: "13px" }}
          >
            Dashboard
          </h1>
          <div>
            {/* Dashboard Home Goes here  */}
            <Switch>
              <Route exact path={path}>
                <DashboardHome orders={orders}></DashboardHome>
              </Route>
              <Route path={`${path}/pay`}>
                <Pay></Pay>
              </Route>
              <Route path={`${path}/makeAdmin`}>
                <MakeAdmin></MakeAdmin>
              </Route>
              <Route path={`${path}/addProduct`}>
                <AddProduct></AddProduct>
              </Route>
              <Route path={`${path}/makeReview`}>
                <MakeReview orders={orders}></MakeReview>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
