import React, { useEffect, useState } from "react";
import { Loader2, XCircleIcon } from "lucide-react";
import authServices from "../../service/authService";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingProduct, setUpdatingProduct] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await authServices.getAllOrders();
      console.log("fetchorder:", res);
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

  const handleRefund = async (orderId, item) => {
    if (!window.confirm("Are you sure you want to refund this product?"))
      return;

    setUpdatingProduct(item._id);

    try {
      const order = orders.find((o) => o._id === orderId);

      if (!order?.razorpayPaymentId) {
        alert("Payment ID not found. Cannot process refund.");
        return;
      }

      // Refund only this product's amount
      await authServices.refundOrder({
        orderId,
        paymentId: order.razorpayPaymentId,
        amount: item.productId.price * item.quantity,
      });

      // Update frontend state to mark this product as refunded
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId
            ? {
                ...o,
                cartItems: o.cartItems.map((p) =>
                  p._id === item._id ? { ...p, status: "Refunded" } : p
                ),
              }
            : o
        )
      );
    } catch (err) {
      console.error("Refund error:", err);
    } finally {
      setUpdatingProduct(null);
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
                <th className="p-3 text-center">Price</th>
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
                    {/* Order ID */}
                    <td className="p-3 font-mono text-xs text-gray-600">
                      StyleNStore-{order._id.slice(-6).toUpperCase()}
                    </td>

                    {/* Order Date */}
                    <td className="p-3">
                      {new Date(order.createdAt).toLocaleDateString("en-US")}
                    </td>

                    {/* Customer Details */}
                    <td className="p-3">
                      {order.user?.firstName} {order.user?.lastName}
                      <br />
                      <span className="text-xs text-gray-500">
                        {order.user?.email}
                      </span>
                      <br />
                      <span className="text-xs text-gray-500">
                        {order.address?.fullName}, {order.address?.address},{" "}
                        {order.address?.city}, {order.address?.state} -{" "}
                        {order.address?.pincode}
                        <br />
                        📞 {order.address?.phone}
                      </span>
                    </td>

                    {/* Product */}
                    <td className="p-3">
                      {item.productId?.title || item.productId?.name}
                    </td>

                    {/* Quantity */}
                    <td className="p-3 text-center">{item.quantity}</td>

                    {/* Price per item */}
                    <td className="p-3 text-center font-medium">
                      ₹{(item.productId?.price || 0).toFixed(0)}
                    </td>

                    {/* Total for this item */}
                    <td className="p-3 text-center font-medium">
                      ₹
                      {((item.productId?.price || 0) * item.quantity).toFixed(
                        0
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-3 text-center">
                      {item.refunded ? (
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">
                          Refunded
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          {order.status}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-center space-y-1">
                      {/* Refund Button */}
                      {item.returnRequested && order.status !== "Refunded" ? (
                        <button
                          onClick={() => handleRefund(order._id, item)}
                          disabled={updatingProduct === item._id}
                          className="w-full px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 disabled:opacity-50"
                        >
                          {updatingProduct === item._id ? "..." : "Refund"}
                        </button>
                      ) : null}

                      {/* Refunded Label */}
                      {order.status === "Refunded" && (
                        <span className="w-full inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded text-center">
                          Refunded
                        </span>
                      )}

                      {/* Return Reason Link */}
                      {item.returnRequested && (
                        <button
                          onClick={() => alert(item.returnReason)}
                          className="mt-1 text-blue-600 underline text-xs hover:text-blue-800"
                          style={{ display: "block" }}
                        >
                          View Reason
                        </button>
                      )}

                      {/* Placeholder if nothing to show */}
                      {!item.returnRequested && order.status !== "Refunded" && (
                        <span>-</span>
                      )}
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
