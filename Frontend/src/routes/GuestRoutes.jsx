import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoutes = () => {
  if (localStorage.getItem("site")) return <Navigate to="home" />;
  return <Outlet />;
};

export default GuestRoutes;
