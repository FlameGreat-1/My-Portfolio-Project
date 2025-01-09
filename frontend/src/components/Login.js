import React, { useState, useCallback } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { loginUser, loginWithGoogle, verifyOTP, resendOTP } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Register from './Register';

const Login = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '', otp: '' });
  const [step, setStep] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { email, password } = formData;
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      const response = await loginUser({ email, password });
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
      }, 1000);
      toast.success('OTP sent to your email and phone (if available)');
      sessionStorage.setItem('tempTokens', JSON.stringify(response.data.tokens));
      sessionStorage.setItem('tempRedirect', response.data.redirect);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { otp } = formData;
      if (!otp) {
        throw new Error('OTP is required');
      }
      const response = await verifyOTP(otp);
      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          login(response.data);
          onClose();
          navigate('/blog');
        }, 1000);
        toast.success('Login successful!');
      } else {
        throw new Error(response.data.message || 'Invalid response from server');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'OTP verification failed. Please try again.';
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const { email } = formData;
      if (!email) {
        throw new Error('Email is required to resend OTP');
      }
      await resendOTP(email);
      toast.success('New OTP sent successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const response = await loginWithGoogle(credentialResponse.credential);
      setTimeout(() => {
        setIsLoading(false);
        login(response.data);
        onClose();
        navigate('/blog');
      }, 1000);
      toast.success('Google login successful!');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Google login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate('/password-reset');
    onClose();
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" onClick={onClose}>
        <div className="bg-white p-6 rounded-2xl w-full max-w-sm flex flex-col items-center shadow-xl" onClick={e => e.stopPropagation()}>
          <img src="/mestack-logo.webp" alt="MeStack Logo" className="w-6 h-6 mb-3" />
          <h1 className="text-xl font-semibold mb-3 text-gray-800">Log in to see more</h1>
          {step === 'login' ? (
            <form onSubmit={handleSubmit} className="w-full">
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="w-full mb-2 p-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                className="w-full mb-2 p-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
              <RouterLink to="/password-reset" onClick={handleForgotPassword} className="text-blue-600 text-xs hover:underline">Forgot your password?</RouterLink>
              <button type="submit" disabled={isLoading} className="w-full py-2 bg-blue-600 text-white rounded-full cursor-pointer my-2 text-sm font-bold transition duration-300 hover:bg-blue-700 disabled:opacity-50">
                {isLoading ? 'Logging in...' : 'Log in'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOTPVerification} className="w-full">
              <input 
                type="text" 
                name="otp"
                placeholder="Enter OTP" 
                value={formData.otp} 
                onChange={handleChange} 
                required 
                className="w-full mb-2 p-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
              <button type="submit" disabled={isLoading} className="w-full py-2 bg-blue-600 text-white rounded-full cursor-pointer my-2 text-sm font-bold transition duration-300 hover:bg-blue-700 disabled:opacity-50">
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <span onClick={handleResendOTP} className="text-blue-600 text-xs underline cursor-pointer">Resend OTP</span>
            </form>
          )}
          <div className="flex items-center w-full my-3">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-xs">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.error('Google Login Failed');
              toast.error('Google Login Failed');
            }}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled || isLoading} className="w-full py-2 bg-white text-blue-600 border border-blue-600 rounded-full cursor-pointer my-2 text-sm font-bold flex justify-center items-center transition duration-300 hover:bg-gray-100 disabled:opacity-50">
                Continue with Google
              </button>
            )}
          />
          <p className="text-xs text-gray-500 text-center my-2">
            By continuing, you agree to MeStack's <RouterLink to="/terms" className="text-blue-600 hover:underline">Terms of Service</RouterLink> and acknowledge you've read our <RouterLink to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</RouterLink>. <RouterLink to="/notice" className="text-blue-600 hover:underline">Notice at collection</RouterLink>.
          </p>
          <RouterLink to="#" onClick={handleSignUp} className="text-blue-600 text-xs hover:underline">Not on MeStack yet? Sign up</RouterLink>
          <p className="text-xs text-gray-500 text-center mt-2">
            Are you a business? <RouterLink to="/business" onClick={onClose} className="text-blue-600 hover:underline">Get started here!</RouterLink>
          </p>
        </div>
      </div>
      {isRegisterOpen && <Register isOpen={isRegisterOpen} onClose={handleCloseRegister} />}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative w-12 h-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="absolute w-3 h-3 bg-blue-600 rounded-full animate-slide" style={{animationDelay: `${i * 0.1}s`}}></div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
