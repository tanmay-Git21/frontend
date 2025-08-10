// src/pages/restaurant/ManageOrders.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const statusList = [
  "Placed",
  "Pending",
  "Preparing",
  "Out for delivery",
  "Completed",
  "Cancelled",
];

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  // Load all orders from localStorage
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders.reverse()); // show most recent first
  };

  // ✅ Change order status and persist to localStorage
  const updateOrderStatus = (orderId, newStatus) => {
    let storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    storedOrders = storedOrders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem("orders", JSON.stringify(storedOrders));
    toast.success(`Order #${orderId.toString().slice(-6)} status updated to ${newStatus}`);
    setOrders(storedOrders.reverse());
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-orange-700 mb-8"
      >
        📦 Manage Orders
      </motion.h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-10">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-xl border border-orange-100 p-6"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div>
                  <span className="font-bold text-orange-600">
                    Order #{order.id.toString().slice(-6)}
                  </span>
                  <span className="block text-gray-400 text-xs">
                    Placed: {order.date}
                  </span>
                </div>

                {/* Status Change */}
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <label className="text-sm font-medium mr-2">Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="rounded bg-orange-50 text-orange-600 px-2 py-1 border focus:border-orange-400"
                  >
                    {statusList.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Total */}
                <div className="font-bold text-xl text-orange-700 mt-2 md:mt-0">
                  ₹{" "}
                  {order.items
                    .reduce(
                      (sum, i) => sum + i.price * (i.quantity || 1),
                      0
                    )
                    .toFixed(2)}
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto mt-4">
                <table className="w-full border divide-y divide-orange-100">
                  <thead>
                    <tr className="bg-orange-50 text-left text-xs text-orange-700">
                      <th className="py-2 px-1">Dish</th>
                      <th className="py-2 px-1 hidden sm:table-cell">Category</th>
                      <th className="py-2 px-1">Qty</th>
                      <th className="py-2 px-1">Price</th>
                      <th className="py-2 px-1">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2 flex items-center gap-2">
                          <img
                            className="w-10 h-10 object-cover rounded"
                            src={item.image}
                            alt={item.name}
                          />
                          <span>{item.name}</span>
                        </td>
                        <td className="py-2 hidden sm:table-cell">{item.category}</td>
                        <td className="py-2">{item.quantity || 1}</td>
                        <td className="py-2">₹ {item.price?.toFixed(2)}</td>
                        <td className="py-2">
                          ₹ {(item.price * (item.quantity || 1)).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 text-sm text-gray-500">
                <span>
                  Status:{" "}
                  <span
                    className={`font-bold ${
                      order.status === "Completed"
                        ? "text-green-600"
                        : order.status === "Cancelled"
                        ? "text-red-500"
                        : "text-orange-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </span>
                <span>Order Date: {order.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
