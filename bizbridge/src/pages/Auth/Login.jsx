import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import toast from 'react-hot-toast';
import logger from '../../utils/logger';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Logging in...');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      logger.info('User logged in:', email);
      toast.dismiss(loadingToast);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      logger.error('Login error:', error.message);
      toast.dismiss(loadingToast);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center relative justify-center min-h-screen">
      <h1 className='absolute top-20 text-white font-bold text-4xl'>Lets Go! 📈</h1>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login to BizBridge</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md" />
          </div>
          <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Login</button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;