import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../hooks/useAuth";
import { CDBSpinner, CDBContainer } from "cdbreact";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <CDBContainer>
        <CDBSpinner danger />
      </CDBContainer>
    );
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
