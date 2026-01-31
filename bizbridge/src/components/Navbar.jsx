import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../services/firebase';
import logger from '../utils/logger';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success('Logged out successfully!');
      logger.info('User logged out.');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out.');
      logger.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">VentureConnect</Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                Logout
              </button>
              <span className="text-white">Welcome, {user.role}</span>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
              <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;