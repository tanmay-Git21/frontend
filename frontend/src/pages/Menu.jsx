// src/pages/Menu.jsx
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import dishes from "../data/dishesData"; // <-- Import hardcoded data

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "Cart", path: "/cart" },
  { label: "Orders", path: "/orders" },
  { label: "Profile", path: "/profile" },
  { label: "Contact Us", path: "/contact" },
];

const Menu = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", ...new Set(dishes.map((d) => d.category))];

  const filteredDishes = dishes.filter((dish) => {
    const nameMatch = dish.name.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = categoryFilter === "All" || dish.category === categoryFilter;
    return nameMatch && categoryMatch;
  });

  const handleAddToCart = (dish) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((item) => item.id === dish.id);
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...dish, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${dish.name} added to cart!`);
  };
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Navbar links={navLinks} />

      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <motion.h1
          className="text-4xl font-bold text-orange-700 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🍽️ Our Delicious Menu
        </motion.h1>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Hand-picked dishes from our expert chefs!
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="🔍 Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-3 border rounded-lg focus:border-orange-400 outline-none w-full sm:w-1/3"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border rounded-lg focus:border-orange-400 outline-none w-full sm:w-48"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Dishes Grid */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredDishes.map((dish) => (
            <motion.div
              key={dish.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-bold text-orange-700">{dish.name}</h3>
                {dish.category && (
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full inline-block my-2">
                    {dish.category}
                  </span>
                )}
                <p className="text-gray-600 text-sm mb-3">{dish.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-800">₹ {dish.price}</p>
                  <button
                    onClick={() => handleAddToCart(dish)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Menu;
