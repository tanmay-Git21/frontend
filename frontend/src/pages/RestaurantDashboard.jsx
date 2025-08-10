// src/pages/RestaurantDashboard.jsx
import React from "react";
import RestaurantNavbar from "../components/RestaurantNavbar";
import { Routes, Route, Outlet } from "react-router-dom";



const RestaurantDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <RestaurantNavbar />
      <Outlet />
    </div>
  );
};

export default RestaurantDashboard;
