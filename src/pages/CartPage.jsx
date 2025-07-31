import { FiShoppingCart, FiTrash2, FiChevronRight } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ShippingForm from "../components/ShippingForm.jsx";

const CartPage = () => {
  const { cart, cartTotal, cartCount, removeFromCart, updateQuantity } =
    useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [checkoutStep, setCheckoutStep] = useState("cart"); // 'cart', 'shipping', 'payment'
  const [shippingInfo, setShippingInfo] = useState({
    type: "work", // or 'home'
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    isDefault: false,
  });

  const resetForm = () => {
    setShippingInfo({
      type: "",
      fullName: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    });
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (checkoutStep === "shipping") {
      console.log("📦 Entering shipping step, fetching address...");

      const fetchAddress = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/address",
            {
              withCredentials: true,
            }
          );

          console.log("✅ Address API response:", response.data);

          const addressData = response.data.addresses;
          setAddressList(addressData);

          if (Array.isArray(addressData) && addressData.length > 0) {
            const defaultAddress =
              addressData.find((addr) => addr.isDefault) || addressData[0];

            setShippingInfo({
              fullName: defaultAddress.fullName || "",
              address: defaultAddress.address,
              city: defaultAddress.city,
              state: defaultAddress.state,
              pincode: defaultAddress.pincode,
              phone: defaultAddress.phone,
              isDefault: defaultAddress.isDefault,
              type: defaultAddress.type || "home",
            });
          } else {
            console.warn("📭 No addresses found");
          }
        } catch (error) {
          console.error("❌ Failed to fetch address:", error);
        }
      };

      fetchAddress();
    }
  }, [checkoutStep]);

  const handleCheckout = () => {
    alert(`Simulating payment of ₹${cartTotal.toFixed(2)}...`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const CartItem = ({ item }) => (
    <li className="py-6 flex items-center gap-4 border-b border-[#e5e7eb]">
      <div className="w-28 h-28 flex-shrink-0 border rounded-md overflow-hidden shadow-sm">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-[#111827]">{item.title}</h3>
          <p className="text-md font-medium text-[#1f2937]">
            ₹{(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
        <p className="text-sm text-[#6b7280] mt-1 capitalize">
          {item.color} / {item.size}
        </p>
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center border rounded-md overflow-hidden text-sm">
            <button
              className="px-3 py-1 bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]"
              onClick={() =>
                updateQuantity(
                  item._id,
                  item.size,
                  item.color,
                  item.quantity - 1
                )
              }
            >
              -
            </button>
            <span className="px-4 font-medium">{item.quantity}</span>
            <button
              className="px-3 py-1 bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]"
              onClick={() =>
                updateQuantity(
                  item._id,
                  item.size,
                  item.color,
                  item.quantity + 1
                )
              }
            >
              +
            </button>
          </div>
          <button
            className="text-[#ef4444] hover:text-[#dc2626] flex items-center text-sm"
            onClick={() => removeFromCart(item._id, item.size, item.color)}
          >
            <FiTrash2 className="mr-1" />
            Remove
          </button>
        </div>
      </div>
    </li>
  );

  const handleSaveAddress = async () => {
    try {
      await axios.post("http://localhost:5000/api/address", shippingInfo, {
        withCredentials: true,
      });
      console.log("✅ Address saved successfully");

      // Clear the form after saving
      setShippingInfo({
        fullName: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        isDefault: false,
        type: "home", // or default type you want
      });

      setCheckoutStep("payment");
    } catch (error) {
      console.error("❌ Failed to save address:", error);
      alert("Failed to save address. Please check the form and try again.");
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/address/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        // Remove the deleted address from the UI
        setAddressList((prev) => prev.filter((addr) => addr._id !== id));

        if (selectedAddressId === id) {
          setSelectedAddressId(null);
          setShippingInfo({
            fullName: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            phone: "",
            isDefault: false,
            type: "home",
          });
        }
      }
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete address");
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
            {addressList.map((addr, idx) => (
              <li
                key={addr._id || idx}
                className={`p-4 border rounded-md hover:border-[#4f46e5] transition cursor-pointer ${
                  selectedAddressId === addr._id ? "border-[#4f46e5]" : ""
                }`}
                onClick={() => {
                  setSelectedAddressId(addr._id);
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
                      onChange={() => setSelectedAddressId(addr._id)}
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
                        e.stopPropagation(); // prevent parent click
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

  const PaymentSection = () => (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-[#e5e7eb]">
      <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
      <div className="mb-6">
        <div className="flex items-center justify-between p-4 border border-[#e5e7eb] rounded-lg mb-3 hover:border-[#4f46e5] cursor-pointer">
          <div className="flex items-center">
            <img
              src="https://cdn.razorpay.com/static/assets/razorpay-glyph.svg"
              alt="Razorpay"
              className="h-8 mr-3"
            />
            <span className="font-medium">Razorpay</span>
          </div>
          <div className="w-5 h-5 rounded-full border-2 border-[#4f46e5] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#4f46e5]"></div>
          </div>
        </div>
        <p className="text-sm text-[#6b7280] mt-2">
          You'll be redirected to Razorpay's secure payment page.
        </p>
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
          Pay Now ₹{cartTotal.toFixed(2)}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#111827]">
            {checkoutStep === "cart" && "Shopping Cart"}
            {checkoutStep === "shipping" && "Shipping Information"}
            {checkoutStep === "payment" && "Payment Method"}
          </h2>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div
              className={`flex items-center ${
                checkoutStep !== "cart" ? "text-[#4f46e5]" : "text-[#6b7280]"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  checkoutStep === "cart"
                    ? "bg-[#e5e7eb]"
                    : "bg-[#4f46e5] text-white"
                }`}
              >
                1
              </div>
              <span className="ml-2">Cart</span>
            </div>
            <div
              className={`w-16 h-0.5 mx-2 ${
                checkoutStep !== "cart" ? "bg-[#4f46e5]" : "bg-[#e5e7eb]"
              }`}
            ></div>
            <div
              className={`flex items-center ${
                checkoutStep === "payment"
                  ? "text-[#4f46e5]"
                  : checkoutStep === "shipping"
                  ? "text-[#4f46e5]"
                  : "text-[#6b7280]"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  checkoutStep === "shipping" || checkoutStep === "payment"
                    ? "bg-[#4f46e5] text-white"
                    : "bg-[#e5e7eb]"
                }`}
              >
                2
              </div>
              <span className="ml-2">Shipping</span>
            </div>
            <div
              className={`w-16 h-0.5 mx-2 ${
                checkoutStep === "payment" ? "bg-[#4f46e5]" : "bg-[#e5e7eb]"
              }`}
            ></div>
            <div
              className={`flex items-center ${
                checkoutStep === "payment" ? "text-[#4f46e5]" : "text-[#6b7280]"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  checkoutStep === "payment"
                    ? "bg-[#4f46e5] text-white"
                    : "bg-[#e5e7eb]"
                }`}
              >
                3
              </div>
              <span className="ml-2">Payment</span>
            </div>
          </div>
        </div>

        {cartCount === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <FiShoppingCart size={64} className="mx-auto text-gray-300" />
            <h3 className="mt-4 text-2xl font-semibold text-[#1f2937]">
              Your cart is empty
            </h3>
            <p className="text-[#6b7280] mt-2">
              Looks like you haven't added anything yet.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-block bg-[#4f46e5] text-white px-6 py-2 rounded-md hover:bg-[#4338ca] transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {checkoutStep === "cart" && (
              <>
                <ul className="divide-y divide-[#e5e7eb] bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  {cart.map((item) => (
                    <CartItem
                      key={`${item._id}-${item.size}-${item.color}`}
                      item={item}
                    />
                  ))}
                </ul>
                <div className="mt-10 border-t border-[#e5e7eb] pt-6">
                  <div className="flex justify-between text-xl font-semibold text-[#111827] mb-4">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-[#6b7280]">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                    <button
                      onClick={() => setCheckoutStep("shipping")}
                      className="w-full sm:w-auto bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3 rounded-md text-base font-medium transition flex items-center justify-center"
                    >
                      Proceed to Checkout <FiChevronRight className="ml-1" />
                    </button>
                    <Link
                      to="/products"
                      className="w-full sm:w-auto text-center py-3 text-[#4f46e5] hover:text-[#4338ca] text-base font-medium transition"
                    >
                      Continue Shopping &rarr;
                    </Link>
                  </div>
                </div>
              </>
            )}
            {checkoutStep === "shipping" && (
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Saved addresses and Add button */}
                <div className="w-full md:w-1/2">
                  <button
                    onClick={() => {
                      resetForm();
                      setIsModalOpen(true);
                    }}
                    className="mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
                  >
                    + Add New Address
                  </button>

                  <SavedAddresses />
                </div>

                {/* Right: Cart summary (you can also move this if needed) */}
                <div className="w-full md:w-1/2">
                  {/* Right-side content or leave empty */}
                </div>
              </div>
            )}
            {checkoutStep === "payment" && <PaymentSection />}
          </>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
              >
                &times;
              </button>

              <h2 className="text-lg font-semibold mb-4">Add New Address</h2>

              <ShippingForm
                shippingInfo={shippingInfo}
                handleInputChange={handleInputChange}
                handleSaveAddress={(e) => {
                  handleSaveAddress(e);
                  setIsModalOpen(false);
                }}
                setCheckoutStep={setCheckoutStep}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
