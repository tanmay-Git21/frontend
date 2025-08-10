// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import ManageOrders from "./pages/restaurant/ManageOrders";
import ManageInventory from "./pages/restaurant/ManageInventory";
import ViewReviews from "./pages/restaurant/ViewReviews";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";

function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/contact" element={<Contact/>} />

        {/* Restaurant Dashboard and its subroutes */}
        <Route path="/restaurant-dashboard" element={<RestaurantDashboard />}>
          <Route index element={<ManageOrders />} /> {/* default child route */}
          <Route path="orders" element={<ManageOrders />} />
          <Route path="inventory" element={<ManageInventory />} />
          <Route path="reviews" element={<ViewReviews />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
