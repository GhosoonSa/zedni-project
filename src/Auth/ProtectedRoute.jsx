import React, { useContext } from "react";
import { userContext } from "./ContextProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("role");

  console.log("ProtectedRoute token:", token, "role:", userRole);

  if (!token) return <Navigate to="/LogIn" replace />;
  if (!roles.includes(userRole))
    return <Navigate to="/UnAuthenticated" replace />;

  return children;
};

export default ProtectedRoute;
