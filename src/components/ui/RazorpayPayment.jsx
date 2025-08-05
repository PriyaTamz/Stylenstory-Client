// src/components/RazorpayPayment.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

const RazorpayPayment = ({
  cartTotal,
  addressId,
  setCheckoutStep,
  userInfo,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (!addressId) {
      toast.error("Please select a shipping address");
      return;
    }

    if (paymentMethod === "upi") {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast.error("Failed to load Razorpay SDK");
        return;
      }

      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.post(
          "http://localhost:5000/api/order/checkout",
          {
            addressId,
            method: "razorpay",
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { razorpayOrderId, totalAmount } = res.data;

        const options = {
          key: "rzp_test_AIlWQhWt8qVNVK",
          amount: totalAmount * 100,
          currency: "INR",
          name: "Style N Store",
          description: "Order Payment",
          order_id: razorpayOrderId,
          handler: async function (response) {
            try {
              const verifyRes = await axios.post(
                "http://localhost:5000/api/order/verify",
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderId: res.data.orderId,
                },
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              await clearCart();
              navigate("/orders");
              toast.success("Order placed successfully!");
            } catch (err) {
              console.error("Verification error:", err);
              toast.error("Payment verification failed");
            }
          },
          prefill: {
            name: userInfo.fullName,
            email: userInfo.email || "example@email.com",
            contact: userInfo.phone,
          },
          theme: {
            color: "#4f46e5",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        console.error(err);
        toast.error("Checkout failed");
      }
    }
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-[#e5e7eb]">
      <h3 className="text-xl font-semibold mb-4">Choose Payment Method</h3>

      <div
        onClick={() => setPaymentMethod("upi")}
        className={`flex items-center justify-between p-4 border rounded-lg mb-3 cursor-pointer ${
          paymentMethod === "upi" ? "border-[#4f46e5]" : "border-[#e5e7eb]"
        }`}
      >
        <div className="flex items-center">
          <img
            src="https://cdn.razorpay.com/static/assets/razorpay-glyph.svg"
            alt="Razorpay"
            className="h-8 mr-3"
          />
          <span className="font-medium">UPI</span>
        </div>
        <div className="w-5 h-5 rounded-full border-2 border-[#4f46e5] flex items-center justify-center">
          {paymentMethod === "upi" && (
            <div className="w-3 h-3 rounded-full bg-[#4f46e5]" />
          )}
        </div>
      </div>

      <div className="border-t border-[#e5e7eb] pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-[#4b5563]">Subtotal</span>
          <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-[#4b5563]">Shipping</span>
          <span className="font-medium">Free</span>
        </div>
        <div className="flex justify-between text-lg font-semibold mt-4 pt-2 border-t border-[#e5e7eb]">
          <span>Total</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setCheckoutStep("shipping")}
          className="text-[#4f46e5] hover:text-[#4338ca] flex items-center font-medium"
        >
          &larr; Back to Shipping
        </button>
        <button
          onClick={handleCheckout}
          className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3 rounded-md font-medium flex items-center"
        >
          {paymentMethod === "upi"
            ? `Pay Now ₹${cartTotal.toFixed(2)}`
            : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default RazorpayPayment;