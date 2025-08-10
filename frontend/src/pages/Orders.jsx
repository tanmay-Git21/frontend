import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext"; // For getting customer name/email

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "Cart", path: "/cart" },
  { label: "Orders", path: "/orders" },
  { label: "Profile", path: "/profile" },
  { label: "Logout", path: "/logout" },
];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [reviewModal, setReviewModal] = useState({ open: false, order: null, restaurant: null });
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders([...storedOrders].reverse());
  }, []);

  // Find if an order has already been reviewed
  const isOrderReviewed = (orderId, restro) => {
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    // If multiple restros per order, match by both order and restro.
    return reviews.some(r => r.orderId === orderId && r.restaurant === restro);
  };

  const handleOpenReview = (order, restaurant) => {
    setRating(5); setComment(""); // reset
    setReviewModal({ open: true, order, restaurant });
  };
  const handleCloseReview = () => setReviewModal({ open: false, order: null, restaurant: null });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const { order, restaurant } = reviewModal;
    if (!rating || !comment.trim()) {
      toast.warn("Please fill both rating and feedback!");
      return;
    }
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    reviews.push({
      id: Date.now(),
      orderId: order.id,
      restaurant,
      customer: user?.fullName || user?.ownerName || user?.email || "Anonymous",
      rating,
      comment,
      date: new Date().toLocaleString()
    });
    localStorage.setItem("reviews", JSON.stringify(reviews));
    toast.success("Thank you for your review!");
    handleCloseReview();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Navbar links={navLinks} />
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-orange-700 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📦 Your Orders
        </motion.h1>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders placed yet.</p>
        ) : (
          <div className="space-y-12">
            {orders.map(order => {
              // Assumption: all dishes in an order are from same restaurant (or take restaurant from first item)
              const restro = order.items[0]?.restaurant || "Unknown";
              const reviewed = isOrderReviewed(order.id, restro);
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2 sm:gap-0">
                    <div>
                      <h2 className="font-bold text-lg text-orange-800">
                        Order #{order.id.toString().slice(-6)}
                      </h2>
                      <span className="text-sm text-gray-500">
                        Placed: {order.date}
                      </span>
                    </div>
                    <div className="font-bold text-xl text-orange-700">
                      ₹ {order.total.toFixed(2)}
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border divide-y divide-orange-100">
                      <thead>
                        <tr className="bg-orange-50 text-left text-sm text-orange-700">
                          <th className="py-2 px-1">Dish</th>
                          <th className="py-2 px-1 hidden sm:table-cell">Category</th>
                          <th className="py-2 px-1">Qty</th>
                          <th className="py-2 px-1">Price</th>
                          <th className="py-2 px-1">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map(item => (
                          <tr key={item.id}>
                            <td className="py-2 flex items-center gap-2">
                              <img className="w-12 h-12 object-cover rounded" src={item.image} alt={item.name} />
                              <span>{item.name}</span>
                            </td>
                            <td className="py-2 hidden sm:table-cell">{item.category}</td>
                            <td className="py-2">{item.quantity}</td>
                            <td className="py-2">₹ {item.price.toFixed(2)}</td>
                            <td className="py-2">₹ {(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center text-sm mt-4 text-gray-500 gap-2">
                    <span>
                      Status: <span className="font-bold text-orange-600">{order.status}</span>
                    </span>
                    <span>Order Date: {order.date}</span>
                  </div>
                  {/* Show Review button if status completed and not reviewed */}
                  {order.status === "Completed" && !reviewed && (
                    <button
                      className="mt-4 bg-orange-500 text-white px-5 py-2 rounded font-bold shadow hover:bg-orange-700 transition"
                      onClick={() => handleOpenReview(order, restro)}
                    >
                      Review This Order
                    </button>
                  )}
                  {/* Show already reviewed message if status completed */}
                  {order.status === "Completed" && reviewed && (
                    <div className="mt-4 text-green-600 font-medium">You already reviewed!</div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Review Modal */}
        <AnimatePresence>
          {reviewModal.open && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.form
                className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md mx-auto flex flex-col gap-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onSubmit={handleSubmitReview}
              >
                <h2 className="text-2xl font-bold text-orange-600 mb-2">Leave a Review</h2>
                <p className="mb-2 text-sm text-gray-500">
                  For <span className="font-semibold">{reviewModal.restaurant}</span>
                </p>
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span className="font-medium">Your Rating:</span>
                  {[1,2,3,4,5].map(num =>
                    <span
                      key={num}
                      onClick={() => setRating(num)}
                      className={`text-2xl cursor-pointer ${rating >= num ? "text-orange-400" : "text-gray-300"} hover:text-orange-500`}
                    >★</span>
                  )}
                  <span className="ml-2 text-orange-600 font-semibold">{rating}/5</span>
                </div>
                {/* Comment */}
                <textarea
                  rows={4}
                  className="border rounded p-2 w-full focus:border-orange-400 outline-none"
                  placeholder="Write your feedback..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  maxLength={350}
                  required
                />
                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-medium"
                    onClick={handleCloseReview}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 font-semibold"
                  >
                    Submit Review
                  </button>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
