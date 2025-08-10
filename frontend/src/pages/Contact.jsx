// src/pages/Contact.jsx
import React from "react";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useState } from "react";
import contactBg from "../assets/images/contact-bg.jpg"; // Add a nice background image

const Contact = () => {
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Menu", path: "/menu" },
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
    { label: "Contact Us", path: "/contact" },
  ];

  // Form state
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can integrate with backend/api/email service
    toast.success("Your message has been sent! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Navbar links={navLinks} />

      {/* Hero Section */}
      <section
        className="relative h-[50vh] flex items-center justify-center text-white px-6 text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-4 max-w-2xl bg-black/40 p-8 rounded-xl shadow-lg backdrop-blur-sm"
        >
          <h1 className="text-4xl md:text-5xl font-bold">Contact Us 📬</h1>
          <p className="text-lg md:text-xl opacity-90">
            Have any questions or feedback? We’re here to help!
          </p>
        </motion.div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-orange-700 mb-4"
            >
              Get in Touch
            </motion.h2>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-xl font-semibold text-orange-600 mb-2">
                📍 Address
              </h3>
              <p className="text-gray-700">
                123 Food Street, Pune, Maharashtra, India
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-xl font-semibold text-orange-600 mb-2">📞 Phone</h3>
              <p className="text-gray-700">+91 98765 43210</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-xl font-semibold text-orange-600 mb-2">📧 Email</h3>
              <p className="text-gray-700">support@aahar.com</p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8 space-y-6"
          >
            <h2 className="text-2xl font-bold text-orange-700">Send us a Message</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Your Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 resize-none"
                placeholder="Write your message..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition duration-300 w-full"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange-600 text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto space-y-6 relative z-10"
        >
          <h2 className="text-4xl font-bold">Let’s Talk About Your Food Cravings!</h2>
          <p className="text-lg opacity-90">
            Contact us anytime — we’ll help you get the food you love.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 2 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-orange-500 opacity-20 rounded-full"
        />
      </section>
    </div>
  );
};

export default Contact;
