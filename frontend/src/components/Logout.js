import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/api';

const Logout = () => {
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        await authLogout();
        navigate('/');
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    performLogout();
  }, [navigate, authLogout]);

  return null;
};

export default Logout;
