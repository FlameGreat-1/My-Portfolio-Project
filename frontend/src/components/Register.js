import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { registerUser, registerWithGoogle } from '../services/api';
import Login from './Login';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password1: '',
    password2: ''
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password1 !== formData.password2) {
      toast.error("Passwords don't match");
      return;
    }
    setIsLoading(true);
    try {
      await registerUser(formData);
      toast.success('Registration successful! Please check your email to activate your account.');
      setTimeout(() => {
        setIsLoading(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const response = await registerWithGoogle(credentialResponse.credential);
      toast.success('Google registration successful!');
      setTimeout(() => {
        setIsLoading(false);
        onClose();
        navigate('/blog', { state: { user: response.data } });
      }, 1000);
    } catch (error) {
      console.error('Google registration failed:', error);
      toast.error('Google registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onClose(); // Close the register modal
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" onClick={onClose}>
        <div className="bg-white p-6 rounded-2xl w-full max-w-sm flex flex-col items-center shadow-xl" onClick={e => e.stopPropagation()}>
          <img src="/path-to-your-logo.png" alt="MeStack Logo" className="w-6 h-6 mb-3" />
          <h1 className="text-xl font-semibold mb-1 text-gray-800">Welcome to MeStack</h1>
          <h2 className="text-xs text-gray-600 mb-3">Organize Your Tasks</h2>
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
              type="text" 
              name="username"
              placeholder="Username" 
              value={formData.username} 
              onChange={handleChange} 
              required 
              className="w-full mb-2 p-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
            <input 
              type="password" 
              name="password1"
              placeholder="Create a password" 
              value={formData.password1} 
              onChange={handleChange} 
              required 
              className="w-full mb-2 p-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
            <input 
              type="password" 
              name="password2"
              placeholder="Confirm password" 
              value={formData.password2} 
              onChange={handleChange} 
              required 
              className="w-full mb-2 p-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-full cursor-pointer my-2 text-sm font-bold transition duration-300 hover:bg-blue-700">Continue</button>
          </form>
          <div className="flex items-center w-full my-3">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-xs">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <GoogleLogin
            onSuccess={handleGoogleRegister}
            onError={() => toast.error('Google Registration Failed')}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="w-full py-2 bg-white text-blue-600 border border-blue-600 rounded-full cursor-pointer my-2 text-sm font-bold flex justify-center items-center transition duration-300 hover:bg-gray-100">
                Continue with Google
              </button>
            )}
          />
          <p className="text-xs text-gray-500 text-center my-2">
            By continuing, you agree to MeStack's <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and acknowledge you've read our <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>. <Link to="/notice" className="text-blue-600 hover:underline">Notice at collection</Link>.
          </p>
          <p className="text-xs text-gray-500 text-center">
            Already a member? <a href="#" onClick={handleLoginClick} className="text-blue-600 hover:underline">Log in</a>
          </p>
        </div>
      </div>
      {isLoginOpen && <Login isOpen={isLoginOpen} onClose={handleCloseLogin} />}
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

export default Register;
