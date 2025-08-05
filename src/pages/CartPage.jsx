import React, { useState } from "react";
import {
  FiShoppingCart,
  FiTrash2,
  FiChevronRight,
  FiPlus,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import ShippingForm from "../components/ui/ShippingForm.jsx";
import RazorpayPayment from "../components/ui/RazorpayPayment.jsx";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useAddress } from "../context/AddressContext";

const CartPage = () => {
  const { cart, cartTotal, cartCount, removeFromCart, updateQuantity } = useCart();
  const {
    addressList,
    selectedAddressId,
    loading,
    addAddress,
    deleteAddress,
    selectAddress,
  } = useAddress();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("cart");

  const initialFormState = {
    type: "home",
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    isDefault: false,
  };
  const [shippingInfo, setShippingInfo] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOpenModal = () => {
    setShippingInfo(initialFormState);
    setIsModalOpen(true);
  };

  const CartItem = ({ item }) => (
    <li className="py-6 flex gap-4">
      <img
        src={item.images[0]}
        alt={item.title}
        className="w-24 h-24 rounded-md object-cover flex-shrink-0"
      />
      <div className="flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.title}</h3>
            <p>₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 capitalize">
            {item.color} / {item.size}
          </p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() =>
                updateQuantity(
                  item._id,
                  item.size,
                  item.color,
                  item.quantity - 1
                )
              }
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-4 font-medium">{item.quantity}</span>
            <button
              onClick={() =>
                updateQuantity(
                  item._id,
                  item.size,
                  item.color,
                  item.quantity + 1
                )
              }
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item._id, item.size, item.color)}
            className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
          >
            <FiTrash2 /> Remove
          </button>
        </div>
      </div>
    </li>
  );

  const handleSaveAddress = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:5000/api/address", 
        shippingInfo,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      toast.success("Address saved successfully");
      setIsModalOpen(false);
      setCheckoutStep("payment");
    } catch (error) {
      console.error("Failed to save address:", error);
      toast.error("Failed to save address. Please try again.");
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(
        `http://localhost:5000/api/address/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      toast.success("Address deleted successfully");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete address");
    }
  };

  const SavedAddresses = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e5e7eb]">
        <h3 className="text-xl font-semibold mb-4">Saved Addresses</h3>
        {addressList.length === 0 ? (
          <p className="text-[#6b7280]">No saved addresses found.</p>
        ) : (
          <ul className="space-y-4">
            {addressList.map((addr) => (
              <li
                key={addr._id}
                className={`p-4 border rounded-md hover:border-[#4f46e5] transition cursor-pointer ${
                  selectedAddressId === addr._id ? "border-[#4f46e5]" : ""
                }`}
                onClick={() => {
                  selectAddress(addr._id);
                  setShippingInfo({
                    fullName: addr.fullName,
                    address: addr.address,
                    city: addr.city,
                    state: addr.state,
                    pincode: addr.pincode,
                    phone: addr.phone,
                    isDefault: addr.isDefault,
                    type: addr.type || "home",
                  });
                }}
              >
                <div className="flex items-start justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="selectedAddress"
                      checked={selectedAddressId === addr._id}
                      onChange={() => selectAddress(addr._id)}
                      className="accent-blue-600"
                    />
                    <span className="font-semibold capitalize">
                      {addr.type}
                    </span>
                  </label>
                  <div className="flex items-center gap-2">
                    {addr.isDefault && (
                      <span className="text-sm text-green-600 font-semibold">
                        Default
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAddress(addr._id);
                      }}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-[#374151] mt-1">
                  {addr.fullName}, {addr.address}, {addr.city}, {addr.state} -{" "}
                  {addr.pincode}
                </p>
                <p className="text-[#6b7280] text-sm">Phone: {addr.phone}</p>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6">
          <button
            disabled={!selectedAddressId}
            onClick={() => setCheckoutStep("payment")}
            className={`w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3 rounded-md font-medium transition ${
              !selectedAddressId ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    );
  };

  const CartSummary = () => (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 h-fit">
      <h3 className="text-lg font-semibold mb-4 border-b pb-3">
        Order Summary
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-green-600">FREE</span>
        </div>
        <div className="flex justify-between border-t pt-2 mt-2 text-base font-bold">
          <span>Total</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </div>
      </div>
      {checkoutStep === "cart" && (
        <button
          onClick={() => setCheckoutStep("shipping")}
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          Proceed to Checkout <FiChevronRight />
        </button>
      )}
    </div>
  );

  const CheckoutStepper = () => (
    <div className="flex items-center justify-center mb-10">
      {["Cart", "Shipping", "Payment"].map((step, index) => {
        const stepKey = step.toLowerCase();
        const isActive =
          checkoutStep === stepKey ||
          (checkoutStep === "shipping" && index === 0) ||
          (checkoutStep === "payment" && index < 2);
        const isCurrent = checkoutStep === stepKey;
        return (
          <React.Fragment key={step}>
            <div
              className={`flex items-center ${
                isActive ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`ml-3 font-medium ${
                  isCurrent ? "text-gray-900" : ""
                }`}
              >
                {step}
              </span>
            </div>
            {index < 2 && (
              <div
                className={`flex-auto border-t-2 mx-4 ${
                  isActive ? "border-indigo-600" : "border-gray-200"
                }`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  if (cartCount === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-lg shadow-sm max-w-2xl mx-auto my-10">
        <FiShoppingCart size={64} className="mx-auto text-gray-300" />
        <h3 className="mt-4 text-2xl font-semibold text-gray-800">
          Your cart is empty
        </h3>
        <p className="text-gray-500 mt-2">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <CheckoutStepper />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {checkoutStep === "cart" && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">
                  Shopping Cart ({cartCount} items)
                </h2>
                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <CartItem
                      key={`${item._id}-${item.size}-${item.color}`}
                      item={item}
                    />
                  ))}
                </ul>
              </div>
            )}

            {checkoutStep === "shipping" && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Shipping Address</h2>
                  <button
                    onClick={handleOpenModal}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
                  >
                    <FiPlus /> Add New Address
                  </button>
                </div>
                {loading ? (
                  <p className="text-center text-gray-500 py-8">
                    Loading addresses...
                  </p>
                ) : addressList.length > 0 ? (
                  <SavedAddresses />
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No saved addresses. Please add a new one.
                  </p>
                )}
              </div>
            )}

            {checkoutStep === "payment" && (
              <RazorpayPayment
                cartTotal={cartTotal}
                addressId={selectedAddressId}
                setCheckoutStep={setCheckoutStep}
                userInfo={shippingInfo}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-lg relative">
            <h2 className="text-xl font-bold mb-4">Add a New Address</h2>
            <ShippingForm
              shippingInfo={shippingInfo}
              handleInputChange={handleInputChange}
              handleSave={handleSaveAddress}
              closeModal={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;