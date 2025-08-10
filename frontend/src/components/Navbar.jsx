// src/Components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const Navbar = ({ links = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem("logged_in_user");
    localStorage.removeItem("logged_in_role");
    localStorage.removeItem("cart"); // Optional: clear cart
    toast.info("You have been logged out");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <div
          className="text-2xl font-extrabold tracking-wide cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={() => navigate("/")}
        >
          🍽️ Aahar
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {links.map((link) =>
            link.label === "Logout" ? (
              <button
                key={link.label}
                onClick={handleLogout}
                className="relative font-medium transition duration-200 hover:text-yellow-200 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </button>
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative font-medium transition duration-200 ${
                    isActive ? "text-yellow-300" : "hover:text-yellow-200"
                  } after:content-[''] after:block after:w-0 after:h-[2px] after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-orange-600 p-4 space-y-3 animate-slide-down">
          {links.map((link) =>
            link.label === "Logout" ? (
              <button
                key={link.label}
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="block font-medium hover:text-yellow-200 w-full text-left"
              >
                {link.label}
              </button>
            ) : (
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
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
