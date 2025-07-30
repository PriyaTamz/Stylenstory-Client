import { FiShoppingCart, FiTrash2, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {
  const {
    cart,
    cartTotal,
    cartCount,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'shipping', 'payment'
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const handleCheckout = () => {
    alert(`Simulating payment of ₹${cartTotal.toFixed(2)}...`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
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
          <p className="text-md font-medium text-[#1f2937]">₹{(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <p className="text-sm text-[#6b7280] mt-1 capitalize">{item.color} / {item.size}</p>
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center border rounded-md overflow-hidden text-sm">
            <button className="px-3 py-1 bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]" onClick={() => updateQuantity(item._id, item.size, item.color, item.quantity - 1)}>-</button>
            <span className="px-4 font-medium">{item.quantity}</span>
            <button className="px-3 py-1 bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]" onClick={() => updateQuantity(item._id, item.size, item.color, item.quantity + 1)}>+</button>
          </div>
          <button className="text-[#ef4444] hover:text-[#dc2626] flex items-center text-sm" onClick={() => removeFromCart(item._id, item.size, item.color)}><FiTrash2 className="mr-1" />Remove</button>
        </div>
      </div>
    </li>
  );

  const ShippingForm = () => (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-[#e5e7eb]">
      <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-[#374151] mb-1">Full Name</label><input type="text" name="name" value={shippingInfo.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" required/></div>
        <div><label className="block text-sm font-medium text-[#374151] mb-1">Email</label><input type="email" name="email" value={shippingInfo.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" required/></div>
        <div><label className="block text-sm font-medium text-[#374151] mb-1">Phone Number</label><input type="tel" name="phone" value={shippingInfo.phone} onChange={handleInputChange} className="w-full px-3 py-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" required/></div>
        <div><label className="block text-sm font-medium text-[#374151] mb-1">Address</label><input type="text" name="address" value={shippingInfo.address} onChange={handleInputChange} className="w-full px-3 py-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" required/></div>
        <div><label className="block text-sm font-medium text-[#374151] mb-1">City</label><input type="text" name="city" value={shippingInfo.city} onChange={handleInputChange} className="w-full px-3 py-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" required/></div>
        <div><label className="block text-sm font-medium text-[#374151] mb-1">State</label><input type="text" name="state" value={shippingInfo.state} onChange={handleInputChange} className="w-full px-3 py-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" required/></div>
        <div><label className="block text-sm font-medium text-[#374151] mb-1">ZIP Code</label><input type="text" name="zip" value={shippingInfo.zip} onChange={handleInputChange} className="w-full px-3 py-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" required/></div>
      </div>
      <div className="mt-8 flex justify-between">
        <button onClick={() => setCheckoutStep('cart')} className="text-[#4f46e5] hover:text-[#4338ca] flex items-center font-medium">&larr; Back to Cart</button>
        <button onClick={() => setCheckoutStep('payment')} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-2 rounded-md flex items-center">Continue to Payment <FiChevronRight className="ml-1" /></button>
      </div>
    </div>
  );
  
  const PaymentSection = () => (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-[#e5e7eb]">
      <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
      <div className="mb-6"><div className="flex items-center justify-between p-4 border border-[#e5e7eb] rounded-lg mb-3 hover:border-[#4f46e5] cursor-pointer"><div className="flex items-center"><img src="https://cdn.razorpay.com/static/assets/razorpay-glyph.svg" alt="Razorpay" className="h-8 mr-3"/><span className="font-medium">Razorpay</span></div><div className="w-5 h-5 rounded-full border-2 border-[#4f46e5] flex items-center justify-center"><div className="w-3 h-3 rounded-full bg-[#4f46e5]"></div></div></div><p className="text-sm text-[#6b7280] mt-2">You'll be redirected to Razorpay's secure payment page.</p></div>
      <div className="border-t border-[#e5e7eb] pt-4"><div className="flex justify-between mb-2"><span className="text-[#4b5563]">Subtotal</span><span className="font-medium">₹{cartTotal.toFixed(2)}</span></div><div className="flex justify-between mb-2"><span className="text-[#4b5563]">Shipping</span><span className="font-medium">Free</span></div><div className="flex justify-between text-lg font-semibold mt-4 pt-2 border-t border-[#e5e7eb]"><span>Total</span><span>₹{cartTotal.toFixed(2)}</span></div></div>
      <div className="mt-8 flex justify-between"><button onClick={() => setCheckoutStep('shipping')} className="text-[#4f46e5] hover:text-[#4338ca] flex items-center font-medium">&larr; Back to Shipping</button><button onClick={handleCheckout} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3 rounded-md font-medium flex items-center">Pay Now ₹{cartTotal.toFixed(2)}</button></div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#111827]">
            {checkoutStep === 'cart' && 'Shopping Cart'}
            {checkoutStep === 'shipping' && 'Shipping Information'}
            {checkoutStep === 'payment' && 'Payment Method'}
          </h2>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-center"><div className={`flex items-center ${checkoutStep !== 'cart' ? 'text-[#4f46e5]' : 'text-[#6b7280]'}`}><div className={`w-8 h-8 rounded-full flex items-center justify-center ${checkoutStep === 'cart' ? 'bg-[#e5e7eb]' : 'bg-[#4f46e5] text-white'}`}>1</div><span className="ml-2">Cart</span></div><div className={`w-16 h-0.5 mx-2 ${checkoutStep !== 'cart' ? 'bg-[#4f46e5]' : 'bg-[#e5e7eb]'}`}></div><div className={`flex items-center ${checkoutStep === 'payment' ? 'text-[#4f46e5]' : checkoutStep === 'shipping' ? 'text-[#4f46e5]' : 'text-[#6b7280]'}`}><div className={`w-8 h-8 rounded-full flex items-center justify-center ${checkoutStep === 'shipping' || checkoutStep === 'payment' ? 'bg-[#4f46e5] text-white' : 'bg-[#e5e7eb]'}`}>2</div><span className="ml-2">Shipping</span></div><div className={`w-16 h-0.5 mx-2 ${checkoutStep === 'payment' ? 'bg-[#4f46e5]' : 'bg-[#e5e7eb]'}`}></div><div className={`flex items-center ${checkoutStep === 'payment' ? 'text-[#4f46e5]' : 'text-[#6b7280]'}`}><div className={`w-8 h-8 rounded-full flex items-center justify-center ${checkoutStep === 'payment' ? 'bg-[#4f46e5] text-white' : 'bg-[#e5e7eb]'}`}>3</div><span className="ml-2">Payment</span></div></div>
        </div>

        {cartCount === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <FiShoppingCart size={64} className="mx-auto text-gray-300" />
            <h3 className="mt-4 text-2xl font-semibold text-[#1f2937]">Your cart is empty</h3>
            <p className="text-[#6b7280] mt-2">Looks like you haven't added anything yet.</p>
            <Link to="/products" className="mt-6 inline-block bg-[#4f46e5] text-white px-6 py-2 rounded-md hover:bg-[#4338ca] transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {checkoutStep === 'cart' && (
              <>
                <ul className="divide-y divide-[#e5e7eb] bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  {cart.map((item) => (<CartItem key={`${item._id}-${item.size}-${item.color}`} item={item}/>))}
                </ul>
                <div className="mt-10 border-t border-[#e5e7eb] pt-6">
                  <div className="flex justify-between text-xl font-semibold text-[#111827] mb-4"><span>Subtotal</span><span>₹{cartTotal.toFixed(2)}</span></div>
                  <p className="text-sm text-[#6b7280]">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                    <button onClick={() => setCheckoutStep('shipping')} className="w-full sm:w-auto bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3 rounded-md text-base font-medium transition flex items-center justify-center">Proceed to Checkout <FiChevronRight className="ml-1" /></button>
                    <Link to="/products" className="w-full sm:w-auto text-center py-3 text-[#4f46e5] hover:text-[#4338ca] text-base font-medium transition">Continue Shopping &rarr;</Link>
                  </div>
                </div>
              </>
            )}
            {checkoutStep === 'shipping' && <ShippingForm />}
            {checkoutStep === 'payment' && <PaymentSection />}
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;