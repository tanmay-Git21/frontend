import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Menu", path: "/menu" },
    { label: "Cart", path: "/cart" },
    { label: "Orders", path: "/orders" },
    { label: "Profile", path: "/profile" },
    { label: "Logout", path: "/logout" },
  ];

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const clearCart = () => {
    updateCart([]);
    toast.info("Cart cleared");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  // Load Razorpay script
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleCheckout = async () => {
    if (!cartItems.length) {
      toast.error("Your cart is empty!");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Failed to load Razorpay SDK.");
      return;
    }

    const options = {
      key: "rzp_test_6c7w5jVrmCGqQ6", // Razorpay test key
      amount: total * 100,
      currency: "INR",
      name: "Your Restaurant App",
      description: "Test Transaction",
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
        const newOrder = {
          id: Date.now(),
          items: cartItems,
          date: new Date().toLocaleString(),
          total: total,
          status: "Placed",
          paymentId: response.razorpay_payment_id,
        };
        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));
        updateCart([]);
        toast.success("Payment successful! Order placed.");
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#F97316",
      },
      modal: {
        ondismiss: function () {
          toast.info("Payment cancelled.");
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Navbar links={navLinks} />
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-orange-700 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🛒 Your Cart
        </motion.h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid gap-6">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row items-center gap-4"
                  whileHover={{ scale: 1.01 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-orange-700">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{item.category}</p>
                    <p className="mt-1">₹ {item.price}</p>
                    <div className="mt-2">
                      <span>Quantity: {item.quantity || 1}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-semibold">
                      ₹ {(item.price * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 bg-white rounded-xl shadow p-6 max-w-md ml-auto">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (5%)</span>
                <span>₹ {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>₹ {total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium"
              >
                Checkout with Razorpay
              </button>
              {/* ✅ Clear Cart button restored */}
              <button
                onClick={clearCart}
                className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Cart;
