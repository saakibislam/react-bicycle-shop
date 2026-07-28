import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import Loading from "./components/Shared/Loading/Loading";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Explore = lazy(() => import("./pages/Explore/Explore"));
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Login = lazy(() => import("./pages/Login/Login"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const ProductDetails = lazy(() => import("./pages/ProductDetails/ProductDetails"));
const Register = lazy(() => import("./pages/Register/Register"));
const Success = lazy(() => import("./pages/Success/Success"));

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route path="/home">
                <Homepage />
              </Route>
              <Route exact path="/explore">
                <Explore />
              </Route>
              <PrivateRoute path="/product/:id">
                <ProductDetails />
              </PrivateRoute>
              <PrivateRoute path="/dashboard">
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path="/success">
                <Success />
              </PrivateRoute>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
