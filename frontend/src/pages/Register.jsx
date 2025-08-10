import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "Login", path: "/login" },
  { label: "Contact Us", path: "/contact" },
];

const logo = "🍽️";

const Register = () => {
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    ownerName: "",
    restaurantName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    let data;
    if (role === "customer") {
      data = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      };
    } else {
      data = {
        ownerName: form.ownerName.trim(),
        restaurantName: form.restaurantName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      };
    }

    const result = registerUser(role, data);
    if (!result.success) {
      setError(result.message);
    } else {
      toast.success("Registration successful! Please login.", { autoClose: 1200 });
      setTimeout(() => navigate("/login"), 1300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Navbar links={navLinks} />
      <div className="flex flex-col justify-center items-center pt-12 px-4">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-orange-600 flex items-center justify-center gap-2">{logo} Register</h1>
          <p className="text-lg text-gray-600 mt-2">Create your account to get started.</p>
        </motion.div>

        {/* Toggle Switch */}
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }} className="flex space-x-3 mb-6">
          <button type="button" className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${role === "customer" ? "bg-orange-500 text-white shadow-md" : "bg-orange-50 text-orange-500 border"}`} onClick={() => setRole("customer")}>Customer</button>
          <button type="button" className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${role === "restaurant" ? "bg-red-600 text-white shadow-md" : "bg-orange-50 text-red-600 border"}`} onClick={() => setRole("restaurant")}>Restaurant</button>
        </motion.div>

        {/* Register Card */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleRegister}
          className="bg-gradient-to-tr from-orange-100 to-orange-50 rounded-2xl shadow-xl px-8 py-10 max-w-md w-full space-y-6"
        >
          {error && <div className="text-red-500 text-center font-semibold">{error}</div>}
          {/* Fields—same as your code above */}
          {role === "customer" && (
            <div>
              <label className="block text-orange-700 font-medium mb-1">Full Name</label>
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" className="w-full px-4 py-3 rounded-lg border focus:border-orange-400 focus:outline-none transition" required />
            </div>
          )}

          {role === "restaurant" && (
            <>
              <div>
                <label className="block text-red-700 font-medium mb-1">Owner Name</label>
                <input type="text" name="ownerName" value={form.ownerName} onChange={handleChange} placeholder="Enter owner's name" className="w-full px-4 py-3 rounded-lg border focus:border-red-400 focus:outline-none transition" required />
              </div>
              <div>
                <label className="block text-red-700 font-medium mb-1">Restaurant Name</label>
                <input type="text" name="restaurantName" value={form.restaurantName} onChange={handleChange} placeholder="Enter your restaurant name" className="w-full px-4 py-3 rounded-lg border focus:border-red-400 focus:outline-none transition" required />
              </div>
            </>
          )}

          <div>
            <label className="block text-orange-700 font-medium mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" className="w-full px-4 py-3 rounded-lg border focus:border-orange-400 focus:outline-none transition" required />
          </div>
          <div>
            <label className="block text-orange-700 font-medium mb-1">Phone Number</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" className="w-full px-4 py-3 rounded-lg border focus:border-orange-400 focus:outline-none transition" required />
          </div>
          <div>
            <label className="block text-orange-700 font-medium mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter password" className="w-full px-4 py-3 rounded-lg border focus:border-orange-400 focus:outline-none transition" required />
          </div>
          <div>
            <label className="block text-orange-700 font-medium mb-1">Confirm Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" className="w-full px-4 py-3 rounded-lg border focus:border-orange-400 focus:outline-none transition" required />
          </div>

          <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} type="submit" className="w-full bg-orange-600 text-white py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-orange-700 transition">
            Register as {role === "customer" ? "Customer" : "Restaurant"}
          </motion.button>

          <div className="text-center mt-2 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-orange-500 font-semibold hover:underline">Login</a>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Register;
