// At top of the file or in a new file like ShippingForm.jsx
function ShippingForm({
  shippingInfo,
  handleInputChange,
  handleSaveAddress,
  setCheckoutStep,
}) {
  return (
    <div className="space-y-4">
      <select
        name="type"
        value={shippingInfo.type}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Address Type</option>
        <option value="home">Home</option>
        <option value="work">Work</option>
        <option value="other">Other</option>
      </select>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={shippingInfo.fullName}
        onChange={handleInputChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={shippingInfo.address}
        onChange={handleInputChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={shippingInfo.city}
        onChange={handleInputChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={shippingInfo.state}
        onChange={handleInputChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={shippingInfo.pincode}
        onChange={handleInputChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={shippingInfo.phone}
        onChange={handleInputChange}
        className="border p-2 w-full"
      />

      <div className="flex gap-4">
        <button
          onClick={handleSaveAddress}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Address
        </button>
        <button
          onClick={() => setCheckoutStep("payment")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}

export default ShippingForm;
