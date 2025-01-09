import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SocialLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    try {
      await loginWithGoogle(credentialResponse.credential);
      toast.success('Google login successful!');
      navigate('/blog'); // Redirecting to the blog page as per previous instructions
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          console.error('Google Login Failed');
          toast.error('Google Login Failed');
        }}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled || isLoading}
            className="w-full py-2 px-4 bg-white text-blue-600 border-2 border-blue-600 rounded-full cursor-pointer text-sm font-bold flex justify-center items-center transition duration-300 hover:bg-gray-100 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Continue with Google
              </span>
            )}
          </button>
        )}
      />
    </div>
  );
};

export default SocialLogin;