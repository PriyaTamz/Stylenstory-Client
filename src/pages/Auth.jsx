import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaPhone, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser, loginUser, forgotPassword } from '../services/api';
import { toast } from 'react-toastify';
import LoginBackGroundImage from '../assets/login-bg.jpg';
import RegisterBackGroundImage from '../assets/register-bg.jpg';
import StylenLogo from '../assets/stylenlogo.png';

function Auth() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState('login'); // 'login', 'register', 'forgot'
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [forgotEmail, setForgotEmail] = useState('');

  const bgImages = {
    login: LoginBackGroundImage,
    register: RegisterBackGroundImage,
    forgot: LoginBackGroundImage,
  };

  const resetForms = () => {
    setLoginData({ email: '', password: '' });
    setRegistrationData({ firstName: '', lastName: '', phone: '', email: '', password: '', confirmPassword: '' });
    setForgotEmail('');
    setErrors({});
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetForms();
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else if (formType === 'register') {
      setRegistrationData(prev => ({ ...prev, [name]: value }));
    } else {
      setForgotEmail(value);
    }
  };

  // --- LOGIN HANDLER ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    try {
      const data = await loginUser(loginData);
      login(data.token, data.user);
      setSuccessAnimation(true);
      setTimeout(() => {
        navigate(location.state?.from?.pathname || '/');
      }, 1500);
    } catch (error) {
      toast.error(error.message || 'Invalid email or password.');
      setErrors({ general: error.message || 'Invalid email or password.' });
    } finally {
      setIsLoading(false);
    }
  };

  // --- REGISTRATION HANDLER ---
  const handleRegister = async (e) => {
    e.preventDefault();
    if (registrationData.password !== registrationData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      const data = await registerUser(registrationData);
      toast.success(data.message || 'Registration successful! Please log in.');
      setActiveTab('login'); // Switch to login tab after successful registration
      resetForms();
    } catch (error) {
      toast.error(error.message || 'Registration failed.');
      setErrors({ general: error.message || 'An error occurred during registration.' });
    } finally {
      setIsLoading(false);
    }
  };

  // --- FORGOT PASSWORD HANDLER ---
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    try {
        const data = await forgotPassword(forgotEmail);
        toast.success(data.message || 'If an account exists, a password reset email has been sent.');
        setActiveTab('login'); // Go back to login screen
    } catch (error) {
        toast.error(error.message || 'Could not process request.');
        setErrors({ general: error.message });
    } finally {
        setIsLoading(false);
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-5">
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <div className="mt-1 relative">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input name="email" type="email" required value={loginData.email} onChange={(e) => handleInputChange(e, 'login')} className="block w-full pl-10 py-3 border border-gray-300 rounded-lg shadow-sm" placeholder="john@example.com" />
        </div>
      </div>
      {/* Password Input */}
      <div>
        <label htmlFor="password-login" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="mt-1 relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input name="password" type={showPassword ? 'text' : 'password'} required value={loginData.password} onChange={(e) => handleInputChange(e, 'login')} className="block w-full pl-10 py-3 border border-gray-300 rounded-lg shadow-sm" placeholder="••••••••" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label htmlFor="remember-me" className="ml-2 block text-gray-900">Remember me</label>
        </div>
        <button type="button" onClick={() => setActiveTab('forgot')} className="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</button>
      </div>
      {/* Submit Button */}
      <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50">
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );

  const renderRegisterForm = () => (
    <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <InputWithIcon icon={<FaUser />} name="firstName" placeholder="John" value={registrationData.firstName} onChange={(e) => handleInputChange(e, 'register')} error={errors.firstName} required />
            <InputWithIcon icon={<FaUser />} name="lastName" placeholder="Doe" value={registrationData.lastName} onChange={(e) => handleInputChange(e, 'register')} error={errors.lastName} required />
        </div>
        <InputWithIcon icon={<FaEnvelope />} name="email" type="email" placeholder="john@example.com" value={registrationData.email} onChange={(e) => handleInputChange(e, 'register')} error={errors.email} required />
        <InputWithIcon icon={<FaPhone />} name="phone" type="tel" placeholder="9876543210" value={registrationData.phone} onChange={(e) => handleInputChange(e, 'register')} error={errors.phone} required />
        <InputWithIcon icon={<FaLock />} name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" value={registrationData.password} onChange={(e) => handleInputChange(e, 'register')} error={errors.password} required toggleVisibility={() => setShowPassword(!showPassword)} isPassword />
        <InputWithIcon icon={<FaLock />} name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" value={registrationData.confirmPassword} onChange={(e) => handleInputChange(e, 'register')} error={errors.confirmPassword} required toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)} isPassword />
        
        <div className="pt-2">
            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50">
            {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
        </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-5">
        <p className="text-center text-sm text-gray-600">Enter your email and we'll send you a link to reset your password.</p>
        <InputWithIcon icon={<FaEnvelope />} name="email-forgot" type="email" placeholder="Your registered email" value={forgotEmail} onChange={(e) => handleInputChange(e, 'forgot')} error={errors.general} required />
        <div className="pt-2">
            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50">
            {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
        </div>
        <div className="text-center">
            <button type="button" onClick={() => setActiveTab('login')} className="font-medium text-indigo-600 hover:text-indigo-500">
                &larr; Back to Login
            </button>
        </div>
    </form>
  );
  
  const getTitle = () => {
    if (activeTab === 'login') return 'Welcome Back!';
    if (activeTab === 'register') return 'Join Stylenstory';
    return 'Forgot Password?';
  }

  return (
    <div className="min-h-screen flex">
      {/* Background image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img src={bgImages[activeTab]} alt="Background" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" />
      </div>

      {/* Auth form */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex flex-col justify-center py-12 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center lg:hidden">
              <img src={StylenLogo} alt="Stylen Logo" className="h-12" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">{getTitle()}</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-xl rounded-2xl relative">
            {activeTab !== 'forgot' && (
              <div className="flex border-b border-gray-200 mb-8">
                <button onClick={() => handleTabChange('login')} className={`flex-1 py-3 font-medium text-sm ${activeTab === 'login' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>Sign In</button>
                <button onClick={() => handleTabChange('register')} className={`flex-1 py-3 font-medium text-sm ${activeTab === 'register' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>Register</button>
              </div>
            )}

            {successAnimation && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center rounded-2xl z-10">
                <FiCheckCircle className="text-green-500 text-6xl animate-bounce" />
                <p className="mt-4 text-xl font-medium text-gray-900">Login Successful!</p>
                <p className="mt-2 text-gray-600">Redirecting...</p>
              </div>
            )}

            {errors.general && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{errors.general}</div>}
            
            {activeTab === 'login' && renderLoginForm()}
            {activeTab === 'register' && renderRegisterForm()}
            {activeTab === 'forgot' && renderForgotPasswordForm()}
          </div>
          <div className="mt-6 text-center text-sm text-gray-600">
            {activeTab === 'login' && <p>Don't have an account? <button onClick={() => handleTabChange('register')} className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</button></p>}
            {activeTab === 'register' && <p>Already have an account? <button onClick={() => handleTabChange('login')} className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</button></p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for inputs to reduce repetition
const InputWithIcon = ({ icon, name, type = 'text', placeholder, value, onChange, error, required, isPassword, toggleVisibility }) => (
    <div>
        <label htmlFor={name} className="sr-only">{placeholder}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{React.cloneElement(icon, { className: 'h-5 w-5 text-gray-400' })}</div>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={`block w-full pl-10 pr-3 py-3 border ${error ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm`}
            />
            {isPassword && (
                <button type="button" onClick={toggleVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                    {type === 'password' ? <FaEyeSlash /> : <FaEye />}
                </button>
            )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

export default Auth;