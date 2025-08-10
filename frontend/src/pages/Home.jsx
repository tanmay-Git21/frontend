import React from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Local images
import heroBanner from "../assets/images/hero-banner.jpg";
import fastDelivery from "../assets/images/fast-delivery.png";
import curatedMenu from "../assets/images/curated-menu.jpg";
import premiumQuality from "../assets/images/premiumquality.jpg";
import freshIngredients from "../assets/images/fresh.png";
import chefMeals from "../assets/images/chef-meals.png";
import contactless from "../assets/images/contact-less.png";
import support from "../assets/images/support.png";
import refund from "../assets/images/RefundPolicy.png";
import offers from "../assets/images/offers.png";

const Home = () => {
  const navigate = useNavigate();
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Menu", path: "/menu" },
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
    { label: "Contact Us", path: "/contact" },
  ];



  const navigateToMenu = () => {
    navigate("/menu");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Navbar links={navLinks} />

      {/* Hero Section */}
      <section
        className="relative h-[80vh] flex items-center justify-center text-white px-6 text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6 max-w-3xl bg-black/40 p-6 rounded-2xl shadow-lg backdrop-blur-sm"
        >
          <motion.h1
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold drop-shadow-lg"
          >
            Welcome to Aahar 🍽️
          </motion.h1>
          <p className="text-xl md:text-2xl font-medium opacity-90">
            Fresh, fast, and fabulous meals delivered to your doorstep.
          </p>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-100 transition duration-300 shadow-lg"
            onClick={navigateToMenu}
          >
            Explore Menu
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-orange-700 mb-4"
          >
            Why Choose Us?
          </motion.h2>
          <p className="text-gray-600 mb-10">
            Discover what makes Aahar the go-to food delivery app for thousands.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: fastDelivery,
                title: "Lightning Fast Delivery",
                desc: "Get piping hot food in under 30 minutes.",
              },
              {
                img: curatedMenu,
                title: "Curated Menu",
                desc: "Dishes from top chefs across multiple cuisines.",
              },
              {
                img: premiumQuality,
                title: "Premium Quality",
                desc: "Fresh ingredients, always. No compromises.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 8px 25px rgba(255,165,0,0.4)",
                }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-gradient-to-tr from-orange-100 to-orange-50 p-6 rounded-xl shadow-md cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="rounded-md w-full h-40 object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-orange-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-16 bg-gradient-to-br from-white to-orange-100 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-orange-800 mb-8"
          >
            Our Promise
          </motion.h2>
          <p className="text-gray-700 text-lg mb-12">
            We work with local chefs and fresh vendors to ensure every bite is a
            delight.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: freshIngredients, text: "Fresh Ingredients Daily" },
              { img: chefMeals, text: "Chef Curated Meals" },
              { img: contactless, text: "Safe & Contactless Delivery" },
              { img: support, text: "24/7 Customer Support" },
              { img: refund, text: "Easy Refund Policy" },
              { img: offers, text: "Exciting Offers & Coupons" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white p-5 rounded-lg shadow hover:shadow-xl transition duration-300"
              >
                <img
                  src={item.img}
                  alt={item.text}
                  className="mx-auto mb-3 w-20 h-16 object-contain"
                />
                <p className="text-orange-600 font-semibold">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-orange-600 text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto space-y-6 relative z-10"
        >
          <h2 className="text-4xl font-bold">Hungry Already?</h2>
          <p className="text-lg opacity-90">
            Start your food journey with Aahar and enjoy exclusive discounts
            today!
          </p>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-orange-700 px-10 py-4 rounded-full font-semibold hover:bg-orange-100 transition duration-300"
            onClick={navigateToMenu}
          >
            Order Now
          </motion.button>
        </motion.div>

        {/* Animated background circles */}
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

export default Home;
