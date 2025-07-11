import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaPhone, FaEnvelope } from 'react-icons/fa';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginBackGroundImage from '../assets/login-bg.jpg';
import RegisterBackGroundImage from '../assets/register-bg.jpg';
import StylenLogo from '../assets/stylenlogo.png';

function Auth() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('login');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [registerOtpSent, setRegisterOtpSent] = useState(false);
  const [registerOtp, setRegisterOtp] = useState('');

  // Background images for login and register
  const bgImages = {
    login: LoginBackGroundImage,
    register: RegisterBackGroundImage
  };

  useEffect(() => {
    if (location.state?.from) {
      setActiveTab('login');
    }
  }, [location]);

  useEffect(() => {
    let timer;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  const validatePhone = (number) => /^[0-9]{10}$/.test(number);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendOtp = () => {
    if (!validatePhone(phone)) {
      setErrors({ phone: 'Please enter a valid 10-digit mobile number' });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setOtpCountdown(30);
      setErrors({});
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setErrors({ otp: 'Please enter a 6-digit OTP' });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      const userData = {
        name: 'User',
        email: `${phone}@example.com`,
        phone
      };
      login('dummy-auth-token', userData);
      setSuccessAnimation(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 1500);
    }, 1500);
  };

  const handleSendRegisterOtp = () => {
    const newErrors = {};
    
    if (!registrationData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!registrationData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!validateEmail(registrationData.email)) newErrors.email = 'Please enter a valid email';
    if (!validatePhone(registrationData.phone)) newErrors.phone = 'Please enter a valid 10-digit mobile number';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setRegisterOtpSent(true);
      setOtpCountdown(30);
      setErrors({});
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyRegisterOtp = () => {
    if (registerOtp.length !== 6) {
      setErrors({ registerOtp: 'Please enter a 6-digit OTP' });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      const userData = {
        name: `${registrationData.firstName} ${registrationData.lastName}`,
        email: registrationData.email,
        phone: registrationData.phone
      };
      login('dummy-auth-token', userData);
      setSuccessAnimation(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 1500);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setPhone('');
    setOtp('');
    setOtpSent(false);
    setRegisterOtp('');
    setRegisterOtpSent(false);
    setRegistrationData({
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex">
      {/* Background image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 z-10"></div>
        <img 
          src={activeTab === 'login' ? LoginBackGroundImage : RegisterBackGroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: 0.9 }}
        />
      </div>

      {/* Auth form */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex flex-col justify-center py-12 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center lg:hidden">
            <img src={StylenLogo} alt="Stylen Logo" className="h-12" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            {activeTab === 'login' ? 'Welcome Back!' : 'Join Stylenstory'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {activeTab === 'login' 
              ? 'Sign in to access your personalized style dashboard' 
              : 'Create an account to start your style journey'}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-xl rounded-2xl">
            {/* Tab buttons */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                onClick={() => { setActiveTab('login'); resetForm(); }}
                className={`flex-1 py-3 font-medium text-sm ${activeTab === 'login' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setActiveTab('register'); resetForm(); }}
                className={`flex-1 py-3 font-medium text-sm ${activeTab === 'register' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Register
              </button>
            </div>

            {/* Success animation overlay */}
            {successAnimation && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center rounded-2xl z-10">
                <div className="animate-bounce">
                  <FiCheckCircle className="text-green-500 text-6xl" />
                </div>
                <p className="mt-4 text-xl font-medium text-gray-900">
                  {activeTab === 'login' ? 'Login Successful!' : 'Registration Complete!'}
                </p>
                <p className="mt-2 text-gray-600">Redirecting you now...</p>
              </div>
            )}

            {/* Login Form */}
            {activeTab === 'login' ? (
              <div className="space-y-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={otpSent}
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      placeholder="9876543210"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                {otpSent && (
                  <div className="animate-fade-in">
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                      OTP Verification
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="otp"
                        name="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className={`block w-full pl-10 pr-3 py-3 border ${errors.otp ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="Enter 6-digit OTP"
                      />
                    </div>
                    {errors.otp && <p className="mt-1 text-sm text-red-600">{errors.otp}</p>}
                    <div className="mt-2 text-xs text-gray-500 flex justify-between">
                      {otpCountdown > 0 ? (
                        <span>OTP expires in {otpCountdown} seconds</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                          Resend OTP
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setOtp('123456')} // Demo shortcut
                        className="text-gray-500 hover:text-gray-700"
                      >
                        Use demo OTP
                      </button>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  {!otpSent ? (
                    <button
                      onClick={handleSendOtp}
                      disabled={isLoading}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                    >
                      {isLoading ? (
                        'Sending...'
                      ) : (
                        <>
                          <FiSend className="mr-2" />
                          Send OTP
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleVerifyOtp}
                      disabled={isLoading}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                    >
                      {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Registration Form */
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={registrationData.firstName}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={registrationData.lastName}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={registrationData.email}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={registrationData.phone}
                      onChange={handleInputChange}
                      disabled={registerOtpSent}
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      placeholder="9876543210"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                {registerOtpSent && (
                  <div className="animate-fade-in">
                    <label htmlFor="registerOtp" className="block text-sm font-medium text-gray-700 mb-1">
                      OTP Verification
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="registerOtp"
                        name="registerOtp"
                        type="text"
                        value={registerOtp}
                        onChange={(e) => setRegisterOtp(e.target.value)}
                        className={`block w-full pl-10 pr-3 py-3 border ${errors.registerOtp ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="Enter 6-digit OTP"
                      />
                    </div>
                    {errors.registerOtp && <p className="mt-1 text-sm text-red-600">{errors.registerOtp}</p>}
                    <div className="mt-2 text-xs text-gray-500 flex justify-between">
                      {otpCountdown > 0 ? (
                        <span>OTP expires in {otpCountdown} seconds</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendRegisterOtp}
                          className="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                          Resend OTP
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setRegisterOtp('123456')} // Demo shortcut
                        className="text-gray-500 hover:text-gray-700"
                      >
                        Use demo OTP
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                  </label>
                </div>

                <div className="pt-2">
                  {!registerOtpSent ? (
                    <button
                      onClick={handleSendRegisterOtp}
                      disabled={isLoading}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                    >
                      {isLoading ? (
                        'Sending...'
                      ) : (
                        <>
                          <FiSend className="mr-2" />
                          Send OTP
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleVerifyRegisterOtp}
                      disabled={isLoading}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                    >
                      {isLoading ? 'Verifying...' : 'Verify & Register'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            {activeTab === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setActiveTab('register')}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setActiveTab('login')}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>  
  );
}

export default Auth;