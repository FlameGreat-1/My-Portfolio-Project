import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SearchBar from './SearchBar';
import Login from './Login';
import Register from './Register';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight hover:text-gray-200 transition duration-300">
            DevBlog
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <SearchBar />
            <nav>
              <ul className="flex space-x-6">
                <li><Link to="/" className="hover:text-gray-200 transition duration-300">Home</Link></li>

                {user ? (
                  <>
                    <li><Link to="/create-post" className="hover:text-gray-200 transition duration-300">Create Post</Link></li>
                    <li><button onClick={handleLogout} className="hover:text-gray-200 transition duration-300">Logout</button></li>
                  </>
                ) : (
                  <>
                    <li><button onClick={() => setIsLoginOpen(true)} className="hover:text-gray-200 transition duration-300">Login</button></li>
                    <li><button onClick={() => setIsRegisterOpen(true)} className="hover:text-gray-200 transition duration-300">Sign Up</button></li>
                  </>
                )}
              </ul>
            </nav>
          </div>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="block hover:bg-blue-700 px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" className="block hover:bg-blue-700 px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>About</Link>
            {user ? (
              <>
                <Link to="/create-post" className="block hover:bg-blue-700 px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>Create Post</Link>
                <button onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }} className="block hover:bg-blue-700 px-3 py-2 rounded-md w-full text-left">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => {
                  setIsLoginOpen(true);
                  setIsMenuOpen(false);
                }} className="block hover:bg-blue-700 px-3 py-2 rounded-md w-full text-left">Login</button>
                <button onClick={() => {
                  setIsRegisterOpen(true);
                  setIsMenuOpen(false);
                }} className="block hover:bg-blue-700 px-3 py-2 rounded-md w-full text-left">Sign Up</button>
              </>
            )}
          </nav>
          <div className="px-4 pb-4">
            <SearchBar />
          </div>
        </div>
      )}
      {isLoginOpen && <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
      {isRegisterOpen && <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />}
    </header>
  );
};

export default Header;
