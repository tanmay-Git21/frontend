// src/pages/restaurant/ViewReviews.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ViewReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const allReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    setReviews([...allReviews].reverse()); // Most recent first
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <motion.h1
        className="text-3xl font-bold text-orange-700 mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ⭐ All Customer Reviews
      </motion.h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500 text-lg">No reviews available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <motion.div
              key={r.id}
              className="bg-white rounded-xl shadow-lg p-5 flex flex-col"
              whileHover={{ scale: 1.02 }}
            >
              {/* Rating stars */}
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={
                      i <= r.rating
                        ? "text-orange-400 text-xl"
                        : "text-gray-300 text-xl"
                    }
                  >
                    ★
                  </span>
                ))}
                <span className="ml-1 font-semibold text-orange-600">
                  {r.rating}/5
                </span>
              </div>

              {/* Review text */}
              <p className="mb-3 text-gray-700">{r.comment}</p>

              {/* Meta info */}
              <div className="mt-auto text-sm text-gray-500 flex flex-col gap-1">
                <span>Restaurant: {r.restaurant}</span>
                <span>Order #{r.orderId.toString().slice(-6)}</span>
                <span className="italic">By: {r.customer}</span>
                <span>Date: {r.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
