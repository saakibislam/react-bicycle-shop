import React from 'react';
import {
    CDBSidebar,
    CDBSidebarFooter,
    CDBSidebarHeader
} from "cdbreact";
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import MakeAdmin from './MakeAdmin';
import AddProduct from './AddProduct';
import DashboardHome from './DashboardHome';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
    let { path, url } = useRouteMatch();
    const { admin } = useAuth();
    return (

        <div style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}>
            {/* Sidebar  */}
            <div>
                <CDBSidebar textColor="#fff" backgroundColor="#333">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                        <a
                            href="/"
                            className="text-decoration-none"
                            style={{ color: "inherit" }}
                        >
                            Sidebar
                        </a>
                    </CDBSidebarHeader>

                    {/* Dashboard Links (nested route)  */}
                    <div>
                        <ul className='list-unstyled m-5'>
                            <li>
                                <Link to='/explore'>Explore Bicycles</Link>
                            </li>
                            <li>
                                <Link to={`${url}`}>Dashboard</Link>
                            </li>
                            {admin && <><li>
                                <Link to={`${url}/makeAdmin`}>Make Admin</Link>
                            </li>
                                <li>
                                    <Link to={`${url}/addProduct`}>Add Product</Link>
                                </li></>}
                        </ul>
                    </div>

                    <CDBSidebarFooter style={{ textAlign: "center" }}>
                        <div
                            className="sidebar-btn-wrapper"
                            style={{
                                padding: "20px 5px"
                            }}
                        >
                            Sidebar Footer
                        </div>
                    </CDBSidebarFooter>
                </CDBSidebar>
            </div>
            {/* Dashboard panel  */}
            <div className='w-100'>
                <div>
                    <h1 className='text-white' style={{ backgroundColor: '#333', padding: '13px' }}>Dashboard</h1>
                    <div>
                        {/* Dashboard Home Goes here  */}
                        <Switch>
                            <Route exact path={path}>
                                <DashboardHome></DashboardHome>
                            </Route>
                            <Route path={`${path}/makeAdmin`}>
                                <MakeAdmin></MakeAdmin>
                            </Route>
                            <Route path={`${path}/addProduct`}>
                                <AddProduct></AddProduct>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;