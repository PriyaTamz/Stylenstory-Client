import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import authServices from "../service/authService";

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await authServices.getUserOrders();

        console.log("Fetching orders:", res);

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
      const res = await authServices.requestReturn({
        orderId,
        productId,
        reason,
      });

      // Update only the specific product in the order
      setOrders((prev) =>
        prev.map((order) => {
          if (order._id !== orderId) return order;

          const updatedCartItems = order.cartItems.map((item) => {
            if (item.productId._id !== productId) return item;
            return { ...item, returnRequested: true }; // mark as returned
          });

          return { ...order, cartItems: updatedCartItems };
        })
      );

      alert("Return request sent successfully");
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
        orders.flatMap((order) =>
          (order.cartItems || []).map((item, index) => (
            <div
              key={`${order._id}-${item._id || index}`}
              className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100"
            >
              <div className="flex items-center gap-4">
                {/* Product Image */}
                <img
                  src={item.productId?.images?.[0]}
                  alt={item.productId?.title}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-800 truncate">
                    {item.productId?.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} | Size: {item.size}
                  </p>
                </div>

                {/* View Details Button */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() =>
                      toggleDetails(`${order._id}-${item._id || index}`)
                    }
                    className="text-pink-600 text-sm font-medium hover:underline transition"
                  >
                    {expandedOrderId === `${order._id}-${item._id || index}`
                      ? "Hide Details"
                      : "View Details"}
                  </button>
                </div>
              </div>

              {expandedOrderId === `${order._id}-${item._id || index}` && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                  {/* Shipping Address */}
                  <div className="text-sm text-gray-700">
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

                  {/* Payment Info */}
                  <div className="text-sm text-gray-700 mt-2">
                    <p>
                      Amount Paid:{" "}
                      <span className="font-medium text-gray-800">
                        ₹
                        {Math.floor(
                          item.price * item.quantity ||
                            order.totalAmount / order.cartItems.length
                        )}
                      </span>
                    </p>
                    <p>
                      Payment Mode:{" "}
                      <span className="font-medium text-gray-800">
                        {order.method}
                      </span>
                    </p>
                  </div>

                  {/* Refund / Return Status */}
                  {item.returnRequested && (
                    <p className="text-sm mt-2 text-blue-600 font-medium">
                      Return has been requested. Awaiting refund initiation.
                    </p>
                  )}
                  {order.status === "Refunded" && (
                    <p className="text-sm mt-2 text-green-600 font-medium">
                      Refund Initialized — You can expect the amount within 3 to
                      5 working days.
                    </p>
                  )}

                  {/* Request Return Button */}
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
                    }
                    return null;
                  })()}
                </div>
              )}
            </div>
          ))
        )
      )}
    </div>
  );
};

export default OrdersPage;
