// src/Components/RestaurantNavbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

const RestaurantNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("logged_in_user"); // optional if you store separately
    window.location.href = "/login";
  };

  const links = [
    { label: "Manage Orders", path: "/restaurant-dashboard/orders" },
    { label: "Manage Inventory", path: "/restaurant-dashboard/inventory" },
    { label: "View Reviews", path: "/restaurant-dashboard/reviews" },
  ];

  return (
    <nav className="bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <div className="text-2xl font-extrabold cursor-pointer hover:scale-105 transition">
          🍽️ {user?.restaurantName || "Restaurant"}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative font-medium transition duration-200 ${
                  isActive ? "text-yellow-300" : "hover:text-yellow-200"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-orange-600 p-4 space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block font-medium ${
                  isActive ? "text-yellow-300" : "hover:text-yellow-200"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="block w-full bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default RestaurantNavbar;
