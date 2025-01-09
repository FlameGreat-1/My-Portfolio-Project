import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordConfirm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`http://localhost:8000/api/accounts/password-reset/${uidb64}/${token}/`);
        setIsLoading(false);
      } catch (error) {
        console.error("Token verification error:", error);
        setIsError(true);
        setMessage('Invalid or expired link');
        setIsLoading(false);
      }
    };
    verifyToken();
  }, [uidb64, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setIsError(true);
      setMessage('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await axios.patch('http://localhost:8000/api/accounts/password-reset-complete/', {
        password,
        token,
        uidb64
      });
      setMessage(response.data.message);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100"><p className="text-xl">Loading...</p></div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100"><p className="text-xl text-red-500">{message}</p></div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Set New Password</h2>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="mb-6">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Set New Password'}
          </button>
        </div>
      </form>
      {message && <p className={`mt-4 text-center ${isError ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
    </div>
  );
};

export default ResetPasswordConfirm;
