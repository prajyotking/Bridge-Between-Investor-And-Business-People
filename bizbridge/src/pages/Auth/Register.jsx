import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';
import toast from 'react-hot-toast';
import logger from '../../utils/logger';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('entrepreneur'); // default role
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Registering...');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        role: role,
        createdAt: new Date(),
      });
      
      logger.info('User registered successfully:', { email, role });
      toast.dismiss(loadingToast);
      toast.success('Registration successful!');
      navigate('/dashboard');

    } catch (error) {
      logger.error('Registration error:', error.message);
      toast.dismiss(loadingToast);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className='absolute top-20 text-white font-bold text-4xl '>Towards Growth! 📈</h1>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register for BizBridge</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Form fields... */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">I am a...</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md">
              <option value="entrepreneur">Business Person / Entrepreneur</option>
              <option value="investor">Investor</option>
              <option value="banker">Banker</option>
              <option value="advisor">Business Advisor</option>
            </select>
          </div>
          <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Register</button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;