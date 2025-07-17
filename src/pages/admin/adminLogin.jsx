import React, { useState } from 'react';
import { FiPhone, FiKey } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone.match(/^[6-9]\d{9}$/)) {
      toast.error('Enter a valid 10-digit Indian phone number');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      toast.success('OTP sent successfully!');
    }, 1500);
  };

  const handleLogin = () => {
    if (!otp || otp.length < 4) {
      toast.error('Please enter a valid OTP');
      return;
    }

    toast.success('Admin Logged in Successfully!');
    // You would typically call your backend here to verify OTP
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>

        {/* Phone Number Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <FiPhone className="text-gray-400 mr-2" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full outline-none bg-transparent"
            />
          </div>
        </div>

        {/* OTP Input */}
        {otpSent && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FiKey className="text-gray-400 mr-2" />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                maxLength={6}
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6">
          {!otpSent ? (
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Resend OTP */}
        {otpSent && (
          <div className="text-center mt-4">
            <button
              onClick={handleSendOtp}
              className="text-sm text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
