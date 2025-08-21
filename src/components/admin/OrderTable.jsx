import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderTable = ({ orders }) => {
  const [orderList, setOrderList] = useState(orders);
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleReason = (orderId) => {
    setExpandedRow(expandedRow === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Refunded":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  const handleRefund = async (order) => {
    const confirm = window.confirm("Are you sure you want to issue a refund?");
    if (!confirm) return;

    try {
      const res = await axios.post(
        "https://menstshirtstore-backend.onrender.com/api/order/admin/refund",
        {
          orderId: order.id,
          paymentId: order.paymentId,
          amount: order.amount,
        },
        {
          withCredentials: true,
        }
      );

      alert("Refund successful!");

      setOrderList((prevOrders) =>
        prevOrders.map((o) =>
          o.id === order.id ? { ...o, status: "Refunded" } : o
        )
      );
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred";
      alert("Refund failed: " + errorMessage);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6 border-b">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          All Orders
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Return
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orderList.map((order) => {
              const hasReturn = order.items.some(
                (item) => item.returnRequested
              );
              const returnReason =
                order.items.find((item) => item.returnRequested)
                  ?.returnReason || "No reason provided";

              return (
                <React.Fragment key={order.id}>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      StyleNStore-{order.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customer.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {hasReturn ? (
                        <>
                          <button
                            className="text-blue-600 underline mr-2"
                            onClick={() => toggleReason(order.id)}
                          >
                            Requested
                          </button>
                          {order.status === "Paid" ? (
                            <button
                              className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                              onClick={() => handleRefund(order)}
                            >
                              Refund
                            </button>
                          ) : order.status === "Refunded" ? (
                            <span className="text-green-600 font-semibold text-xs">
                              Refunded
                            </span>
                          ) : null}
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>

                  {/* Conditional row to show reason */}
                  {expandedRow === order.id && (
                    <tr className="bg-gray-50">
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-sm text-gray-700"
                      >
                        <strong>Return Reason:</strong> {returnReason}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
