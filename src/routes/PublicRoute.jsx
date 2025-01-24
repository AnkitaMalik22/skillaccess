import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ isAuthenticated, redirectUrl }) => {
  return isAuthenticated ? <Navigate to={redirectUrl} /> : <Outlet />;
};

export default PublicRoute;
