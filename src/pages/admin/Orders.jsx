import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Loader2,
  RefreshCcw,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://menstshirtstore-backend.onrender.com/api/order/admin/orders",
        { withCredentials: true }
      );
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefund = async (orderId) => {
    if (!window.confirm("Are you sure you want to refund this order?")) return;

    setUpdating(orderId);
    try {
      await axios.post(
        "https://menstshirtstore-backend.onrender.com/api/order/admin/refund",
        { orderId },
        { withCredentials: true }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Refunded" } : order
        )
      );
    } catch (err) {
      console.error("Refund error:", err);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin w-8 h-8 text-pink-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🛠 Admin Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center bg-white py-10 rounded shadow">
          <XCircleIcon className="w-10 h-10 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No orders found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-center">Total</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {orders.map((order) =>
                order.cartItems.map((item) => (
                  <tr
                    key={order._id + item._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3 font-mono text-xs text-gray-600">
                      STY-{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="p-3">
                      {new Date(order.createdAt).toLocaleDateString("en-US")}
                    </td>
                    <td className="p-3">
                      {order.userId?.user}
                      <br />
                      <span className="text-xs text-gray-500">
                        {order.userId?.email}
                      </span>
                    </td>
                    <td className="p-3">{item.productId?.title}</td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-center font-medium">
                      ₹
                      {(item.productId?.price * item.quantity).toLocaleString()}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Refunded"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 text-center space-y-1">
                      <button
                        onClick={() => handleRefund(order._id)}
                        disabled={updating === order._id}
                        className="w-full px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-1"
                      >
                        <RefreshCcw className="w-3 h-3" />
                        {updating === order._id ? "..." : "Refund"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
