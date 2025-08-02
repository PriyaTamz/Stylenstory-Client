import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/order/user-order",
          {
            withCredentials: true,
          }
        );

        if (res.data?.success && Array.isArray(res.data.orders)) {
          setOrders(res.data.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleReturn = async (orderId, productId) => {
    const reason = prompt("Enter reason for return:");
    if (!reason) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/order/return",
        { orderId, productId, reason },
        { withCredentials: true }
      );

      alert("Return request sent successfully");
      // Optionally reload orders:
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                cartItems: order.cartItems.map((item) =>
                  item.productId._id === productId
                    ? { ...item, returnRequested: true }
                    : item
                ),
              }
            : order
        )
      );
    } catch (err) {
      console.error("Return request error:", err);
      alert("Failed to request return");
    }
  };

  const toggleDetails = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      {loading ? (
        <p className="text-gray-600">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">You haven’t placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Delivered on{" "}
                  <span className="text-gray-700 font-medium">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
                <p className="text-base font-semibold text-gray-800">
                  Order ID: StyleNStore-
                  <span className="text-pink-600">
                    {order._id.slice(-6).toUpperCase()}
                  </span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <button
                  onClick={() => toggleDetails(order._id)}
                  className="text-pink-600 text-sm font-medium hover:underline transition"
                >
                  {expandedOrderId === order._id
                    ? "Hide Details"
                    : "View Details"}
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(order.cartItems || []).map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border p-3 rounded-md"
                >
                  <img
                    src={item.productId?.image}
                    alt={item.productId?.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {item.productId?.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} | Size: {item.size}
                    </p>

                    {(() => {
                      const diff =
                        (new Date() - new Date(order.createdAt)) /
                        (1000 * 60 * 60 * 24);
                      if (diff <= 7 && !item.returnRequested) {
                        return (
                          <button
                            onClick={() =>
                              handleReturn(order._id, item.productId._id)
                            }
                            className="text-sm text-white bg-pink-600 px-3 py-1 rounded hover:bg-pink-700 mt-2"
                          >
                            Request Return
                          </button>
                        );
                      } else if (item.returnRequested) {
                        return (
                          <p className="text-sm text-green-600 mt-2 font-medium">
                            Return already requested
                          </p>
                        );
                      }
                      return null;
                    })()}
                  </div>
                </div>
              ))}
            </div>

            {/* Expanded Details */}
            {expandedOrderId === order._id && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-700 space-y-1">
                  <p className="font-semibold text-gray-800 mb-1">
                    Shipping Address:
                  </p>
                  <p>{order.address?.fullName}</p>
                  <p>{order.address?.address}</p>
                  <p>
                    {order.address?.city}, {order.address?.state} -{" "}
                    {order.address?.pincode}
                  </p>
                  <p>Phone: {order.address?.phone}</p>
                </div>

                <div className="mt-4 text-sm">
                  <p className="text-gray-700 mb-1">
                    Payment Method:{" "}
                    <span className="font-medium text-gray-800">
                      {order.method}
                    </span>
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-900 mt-4">
                  Total Amount Paid: ₹{order.totalAmount}
                </p>

                {order.status === "Refunded" && (
                  <p className="text-sm mt-2 text-green-600 font-medium">
                    Refund Initialized — You can expect the amount within 3 to 5
                    working days.
                  </p>
                )}

                {order.status === "Returned" && (
                  <p className="text-sm mt-2 text-blue-600 font-medium">
                    Return has been requested. Awaiting refund initiation.
                  </p>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
