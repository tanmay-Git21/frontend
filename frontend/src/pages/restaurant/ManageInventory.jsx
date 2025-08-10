// src/pages/restaurant/ManageInventory.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext"; // adjust path

export default function ManageInventory() {
  const { user } = useAuth(); // Restaurant currently logged in
  const [dishes, setDishes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (!user?.email) {
      console.warn("No logged-in restaurant owner.");
      return;
    }
    const allDishes = JSON.parse(localStorage.getItem("restaurant_dishes") || "{}");
    const restaurantDishes = allDishes[user.email] || [];
    setDishes(restaurantDishes);
  }, [user]);
      

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Convert uploaded image to Base64 for storage
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const saveToLocalStorage = (updatedDishes) => {
    if (!user?.email) {
      console.error("No user email found, cannot save dishes.");
      return;
    }
    
    const allDishes = JSON.parse(localStorage.getItem("restaurant_dishes") || "{}");
    allDishes[user.email] = updatedDishes;
    localStorage.setItem("restaurant_dishes", JSON.stringify(allDishes));
  
    // Merge all dishes into a global menu array
    const globalMenu = Object.values(allDishes).flat();
    localStorage.setItem("global_menu", JSON.stringify(globalMenu));
  
    console.log("Updated global_menu:", globalMenu);
  };
  

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, price, category, image } = form;
    if (!name || !price || !image) {
      toast.error("Please fill in all required fields");
      return;
    }
    const newDish = {
      id: Date.now(),
      name,
      description,
      price: parseFloat(price),
      category,
      image,
      restaurant: user.restaurantName || user.ownerName,
    };
    const updatedDishes = [...dishes, newDish];
    setDishes(updatedDishes);
    saveToLocalStorage(updatedDishes);
    toast.success("Dish added successfully!");
    setForm({ name: "", description: "", price: "", category: "", image: "" });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-orange-700 mb-6"
      >
        🍳 Manage Inventory
      </motion.h1>

      {/* Add Dish Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">Dish Name*</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            placeholder="Enter dish name"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Price*</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            placeholder="Enter price"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            placeholder="Describe the dish"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            placeholder="E.g., Appetizer, Main Course, Dessert"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Upload Image*</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-lg"
          />
          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="mt-2 w-20 h-20 object-cover rounded"
            />
          )}
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
          >
            Add Dish
          </button>
        </div>
      </motion.form>

      {/* List of Dishes */}
      <motion.h2 className="text-2xl font-semibold text-orange-600 mb-4">
        📋 Your Menu Items
      </motion.h2>
      {dishes.length === 0 ? (
        <p className="text-gray-500">No dishes added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <motion.div
              key={dish.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              whileHover={{ scale: 1.02 }}
            >
              <img src={dish.image} alt={dish.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg text-orange-700">{dish.name}</h3>
                <p className="text-gray-600 text-sm">{dish.description}</p>
                <p className="mt-2 font-semibold text-gray-800">₹ {dish.price.toFixed(2)}</p>
                {dish.category && (
                  <span className="inline-block mt-2 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    {dish.category}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
