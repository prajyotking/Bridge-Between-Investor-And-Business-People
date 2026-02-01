import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home">
      <div className="container h-screen relative items-center flex flex-col mx-auto text-center">
        <div className='Logo h-[200px] w-[200px] overflow-hidden rounded-full relative top-10 '>
          <img src="src/assets/Logo.png" alt="logo" />
        </div>
        <div className='homeText py-20'>
          <h1 className="text-5xl font-bold text-white mb-4">Welcome to BizBridge</h1> 
        <p className="text-xl text-white mb-8">
          The bridge between innovative ideas and investment opportunities.
        </p>
        <div className="space-x-4">
          <Link to="/register" className="gsBtn bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
            Get Started
          </Link>
          <Link to="/dashboard" className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300">
            Go to Dashboard
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;