import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { CheckCircleIcon, XCircleIcon, TruckIcon } from "lucide-react";

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [returnModal, setReturnModal] = useState({ open: false, orderId: null, productId: null });
  const [returnReason, setReturnReason] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://menstshirtstore-backend.onrender.com/api/order/user-order", {
          withCredentials: true,
        });
        setOrders(response.data.orders || []);
      } catch (err) {
        console.error("Error loading orders", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleDetails = (orderId) => {
    setExpandedOrderId(prev => (prev === orderId ? null : orderId));
  };

  const openReturnModal = (orderId, productId) => {
    setReturnReason("");
    setReturnModal({ open: true, orderId, productId });
  };

  const handleReturnSubmit = async () => {
    if (!returnReason.trim()) {
      alert("Please provide a reason for return.");
      return;
    }

    try {
      await axios.post(
        "https://menstshirtstore-backend.onrender.com/api/order/return",
        {
          ...returnModal,
          reason: returnReason,
        },
        { withCredentials: true }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === returnModal.orderId
            ? {
                ...order,
                cartItems: order.cartItems.map((item) =>
                  item.productId._id === returnModal.productId
                    ? { ...item, returnRequested: true }
                    : item
                ),
              }
            : order
        )
      );

      alert("Return request submitted.");
      setReturnModal({ open: false, orderId: null, productId: null });
    } catch (err) {
      console.error("Return error", err);
      alert("Failed to submit return request.");
    }
  };

  const diffDays = (date) => {
    return Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">📦 My Orders</h1>

      {loading ? (
        <p className="text-gray-500 text-lg">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="text-center bg-white py-10 rounded shadow">
          <XCircleIcon className="w-10 h-10 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">You have not placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-all"
            >
              {/* Order Header */}
              <div className="p-4 flex flex-col md:flex-row justify-between md:items-center gap-4 border-b">
                <div>
                  <p className="text-sm text-gray-500">
                    Placed on{" "}
                    <span className="font-medium text-gray-800">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    Order ID:{" "}
                    <span className="text-pink-600">
                      STY-{order._id.slice(-6).toUpperCase()}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.status === "Delivered" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Content - Two Column Layout */}
              <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Products */}
                <div className="lg:col-span-2 space-y-4">
                  {order.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-4 items-start p-3 border rounded-lg bg-gray-50"
                    >
                      <img
                        src={item.productId?.images[0]}
                        alt={item.productId?.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-gray-800 font-semibold mb-1">
                          {item.productId?.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} &bull; Size: {item.size}
                        </p>
                        <p className="text-sm font-medium text-gray-700 mt-1">
                          ₹{(item.productId?.price * item.quantity).toLocaleString()}
                        </p>

                        {diffDays(order.createdAt) <= 7 && !item.returnRequested && (
                          <button
                            onClick={() => openReturnModal(order._id, item.productId._id)}
                            className="mt-2 px-3 py-1.5 text-xs bg-pink-600 text-white rounded hover:bg-pink-700"
                          >
                            Request Return
                          </button>
                        )}

                        {item.returnRequested && (
                          <p className="text-green-600 text-sm mt-2 font-medium">
                            ✅ Return Requested
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column - Order Summary */}
                <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <TruckIcon className="w-4 h-4" />
                        Shipping Details
                      </h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{order.address.fullName}</p>
                        <p>{order.address.address}</p>
                        <p>
                          {order.address.city}, {order.address.state} - {order.address.pincode}
                        </p>
                        <p>Phone: {order.address.phone}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Payment Method</h4>
                      <p className="text-sm text-gray-600 capitalize">
                        {order.method === "cod" ? "Cash on Delivery" : order.method}
                      </p>
                    </div>

                    <div className="border-t pt-3">
                      <h4 className="font-semibold text-gray-800 mb-2">Order Summary</h4>
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal:</span>
                          <span>₹{order.totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping:</span>
                          <span>₹0</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-900 border-t pt-2">
                          <span>Total:</span>
                          <span>₹{order.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {order.status === "Returned" && (
                      <div className="bg-orange-50 text-orange-700 p-2 rounded text-sm">
                        Return in process
                      </div>
                    )}
                    {order.status === "Refunded" && (
                      <div className="bg-green-50 text-green-700 p-2 rounded text-sm">
                        Refund Completed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Return Modal */}
      {returnModal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Return Request</h2>
            <textarea
              rows={4}
              placeholder="Enter the reason for return..."
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-pink-500 text-sm"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setReturnModal({ open: false, orderId: null, productId: null })}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleReturnSubmit}
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;