import React, { useEffect, useState } from "react";
import OrderTable from "../../components/admin/OrderTable";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/order/admin/orders",
          {
            withCredentials: true, // If using cookies/session auth
          }
        );

        const formattedOrders = res.data.orders.map((order) => ({
          id: order._id,
          customer: {
            name: order.address?.fullName || "Unknown",
            email: order.user?.email || "N/A",
          },
          date: new Date(order.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          amount: order.totalAmount,
          status: order.status || "Paid", // fallback in case status is missing
          items: order.cartItems.map((item) => ({
            product: item.productId?.title || "Product",
            quantity: item.quantity,
            price: item.productId?.price || 0,
            returnRequested: item.returnRequested || false,
            returnReason: item.returnReason || "",
          })),
          paymentId: order.razorpayPaymentId,
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error("Error fetching admin orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return <OrderTable orders={orders} />;
};

export default Orders;
