import {
  CDBBadge,
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Badge, Button } from "react-bootstrap";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Loading from "../../components/Shared/Loading/Loading";
import { useApi } from "../../hooks/api";
import useAuth from "../../hooks/useAuth";
import AdminPanel from "./AdminPanel/AdminPanel";
import DashboardHome from "./DashboardHome";
import MakeReview from "./MakeReview";
import Pay from "./Pay";
import ProductsDashboard from "./Products/ProductsDashboard";

const Dashboard = () => {
  let { path, url } = useRouteMatch();
  const { user, logOut } = useAuth();
  const {
    data: orders,
    loading,
    error,
    setData: setOrders,
  } = useApi(`/orders/my-orders/${user._id}`);

  const activeMenuStyles = {
    color: "orange",
    fontWeight: "bold",
    fontSize: "18px",
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar  */}
      <div
        style={{
          height: "100vh",
        }}
      >
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
              className="d-block mt-3 fs-5 text-truncate"
              color="success"
              borderType="pill"
            >
              {user.name}
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
                <NavLink to={`${url}/pay`} activeStyle={activeMenuStyles}>
                  <i className="fas fa-money-check-alt m-1"></i>
                  Pay
                </NavLink>
              </CDBSidebarMenuItem>

              {user.isAdmin ? (
                <>
                  <CDBSidebarMenuItem>
                    <NavLink
                      to={`${url}/admin-panel`}
                      activeStyle={activeMenuStyles}
                    >
                      <i className="fas fa-user-plus m-1"></i>
                      Admin Panel
                    </NavLink>
                  </CDBSidebarMenuItem>
                  <CDBSidebarMenuItem>
                    <NavLink
                      to={`${url}/addProduct`}
                      activeStyle={activeMenuStyles}
                    >
                      <i className="fas fa-cart-plus m-1"></i>
                      Add Product
                    </NavLink>
                  </CDBSidebarMenuItem>
                </>
              ) : (
                <CDBSidebarMenuItem>
                  <NavLink
                    to={`${url}/makeReview`}
                    activeStyle={activeMenuStyles}
                  >
                    <i className="far fa-comment-dots m-1"></i>
                    Review Product
                  </NavLink>
                </CDBSidebarMenuItem>
              )}
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
                <DashboardHome
                  orders={orders}
                  setOrders={setOrders}
                ></DashboardHome>
              </Route>
              <Route path={`${path}/pay`}>
                <Pay orders={orders} setOrders={setOrders}></Pay>
              </Route>
              {user?.isAdmin && (
                <Route path={`${path}/admin-panel`}>
                  <AdminPanel></AdminPanel>
                </Route>
              )}
              {user?.isAdmin && (
                <Route path={`${path}/addProduct`}>
                  <ProductsDashboard />
                </Route>
              )}
              <Route path={`${path}/makeReview`}>
                <MakeReview orders={orders}></MakeReview>
              </Route>
              <Route path="*">
                <Redirect to={path} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
