import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, redirectUrl = "/login" }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectUrl} />;
};

export default PrivateRoute;
