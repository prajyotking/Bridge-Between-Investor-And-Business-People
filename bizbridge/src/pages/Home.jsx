import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto text-center py-20">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to VentureConnect</h1>
        <p className="text-xl text-gray-600 mb-8">
          The bridge between innovative ideas and investment opportunities.
        </p>
        <div className="space-x-4">
          <Link to="/register" className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
            Get Started
          </Link>
          <Link to="/dashboard" className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;