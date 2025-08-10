// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, setUser } = useAuth(); // Assuming AuthContext exposes setUser
  const [currentUser, setCurrentUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Menu", path: "/menu" },
    { label: "Cart", path: "/cart" },
    { label: "Orders", path: "/orders" },
    { label: "Profile", path: "/profile" },
    { label: "Logout", path: "/logout" },
  ];

  useEffect(() => {
    const storedUser = user || JSON.parse(localStorage.getItem("logged_in_user") || "null");
    if (storedUser) {
      setCurrentUser(storedUser);
      setFormData(storedUser);
    }
  }, [user]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        <p>No user logged in.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    // Update state & localStorage
    setCurrentUser(formData);
    localStorage.setItem("logged_in_user", JSON.stringify(formData));

    // Also update the AuthContext's user state if available
    if (setUser) setUser(formData);

    // Persist in "app_users" so data is consistent everywhere
    const allUsers = JSON.parse(localStorage.getItem("app_users") || "[]");
    const updatedUsers = allUsers.map(u =>
      u.email === formData.email && u.role === formData.role ? formData : u
    );
    localStorage.setItem("app_users", JSON.stringify(updatedUsers));

    toast.success("Profile updated successfully");
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Navbar links={navLinks} />

      <section className="py-16 px-4 max-w-3xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-orange-700 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          👤 Profile
        </motion.h1>

        {/* Profile Info Card */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          {/* Role */}
          <div>
            <span className="text-sm font-semibold text-gray-500">Role</span>
            <p className="text-lg font-bold text-orange-600 capitalize">
              {currentUser.role}
            </p>
          </div>

          {/* Fields */}
          {currentUser.role === "restaurant" ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-500">Owner Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="ownerName"
                    className="border p-2 rounded w-full"
                    value={formData.ownerName || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{currentUser.ownerName || "-"}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500">Restaurant Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="restaurantName"
                    className="border p-2 rounded w-full"
                    value={formData.restaurantName || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{currentUser.restaurantName || "-"}</p>
                )}
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-500">Full Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="fullName"
                  className="border p-2 rounded w-full"
                  value={formData.fullName || ""}
                  onChange={handleChange}
                />
              ) : (
                <p>{currentUser.fullName || "-"}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-500">Email</label>
            {/* Email should typically not be editable */}
            <p>{currentUser.email}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500">Phone</label>
            {editMode ? (
              <input
                type="text"
                name="phone"
                className="border p-2 rounded w-full"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            ) : (
              <p>{currentUser.phone || "-"}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            {editMode ? (
              <>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
