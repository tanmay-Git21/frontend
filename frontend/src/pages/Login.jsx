import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "Register", path: "/register" },
  { label: "Contact Us", path: "/contact" },
];

const logo = "🍽️";

const Login = () => {
  const [role, setRole] = useState("customer");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const res = loginUser(role, form.email.trim(), form.password);

// inside handleLogin in Login.js
if (res.success) {
    const username = res.user.fullName || res.user.ownerName;
    toast.success(`Login successful! Welcome ${username}`, { autoClose: 1200 });
  
    setTimeout(() => {
      if (role === "restaurant") {
        navigate("/restaurant-dashboard");
      } else {
        navigate("/menu");
      }
    }, 1300);
  } else {
    setError(res.message);
  }
  
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Navbar links={navLinks} />
      <div className="flex flex-col justify-center items-center pt-12 px-4">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-orange-600 flex items-center justify-center gap-2">{logo} Login</h1>
          <p className="text-lg text-gray-600 mt-2">Welcome back! Please log in to continue.</p>
        </motion.div>

        {/* Toggle Switch */}
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }} className="flex space-x-3 mb-6">
          <button type="button" className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${role === "customer" ? "bg-orange-500 text-white shadow-md" : "bg-orange-50 text-orange-500 border"}`} onClick={() => setRole("customer")}>Customer Login</button>
          <button type="button" className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${role === "restaurant" ? "bg-red-600 text-white shadow-md" : "bg-orange-50 text-red-600 border"}`} onClick={() => setRole("restaurant")}>Restaurant Login</button>
        </motion.div>

        {/* Login Card */}
        <motion.form initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} onSubmit={handleLogin} className="bg-gradient-to-tr from-orange-100 to-orange-50 rounded-2xl shadow-xl px-8 py-10 max-w-md w-full space-y-6">
          {error && (
            <div className="text-red-500 text-center font-semibold">{error}</div>
          )}
          <div>
            <label className="block text-orange-700 font-medium mb-1" htmlFor="email">Email Address</label>
            <input className="w-full px-4 py-3 rounded-lg border focus:border-orange-400 focus:outline-none transition"
              type="email" name="email" id="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
          </div>
          <div>
            <label className="block text-orange-700 font-medium mb-1" htmlFor="password">Password</label>
            <input className="w-full px-4 py-3 rounded-lg border focus:border-orange-400 focus:outline-none transition"
              type="password" name="password" id="password" value={form.password} onChange={handleChange} placeholder="Enter password" required />
          </div>
          <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} type="submit" className="w-full bg-orange-600 text-white py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-orange-700 transition">
            Log In as {role === "customer" ? "Customer" : "Restaurant"}
          </motion.button>
          <div className="flex justify-between mt-2 text-sm">
            <a href="/register" className="text-orange-500 font-semibold hover:underline">
              New user? Register
            </a>
            <a href="#" className="text-orange-500 hover:underline">
              Forgot Password?
            </a>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
