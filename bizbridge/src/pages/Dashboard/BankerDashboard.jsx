// src/pages/Dashboard/BankerDashboard.jsx

import React, { useState } from 'react';
import { db } from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import logger from '../../utils/logger';

const BankerDashboard = () => {
  const { user } = useAuth();
  const [loanType, setLoanType] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [description, setDescription] = useState('');

  const handlePostLoan = async (e) => {
    e.preventDefault();
    if (!loanType || !interestRate || !maxAmount) {
      return toast.error("Please fill all required fields.");
    }
    const loadingToast = toast.loading('Posting loan details...');
    try {
      await addDoc(collection(db, 'loanOffers'), {
        loanType,
        interestRate: Number(interestRate),
        maxAmount: Number(maxAmount),
        description,
        bankerId: user.uid,
        bankerName: user.name,
        bankName: "Example Bank Inc.", // You might want to add this to the banker's user profile
        createdAt: new Date(),
      });
      logger.info('New loan offer posted by:', user.email);
      toast.dismiss(loadingToast);
      toast.success('Loan offer posted successfully!');
      // Reset form
      setLoanType('');
      setInterestRate('');
      setMaxAmount('');
      setDescription('');
    } catch (error) {
      logger.error('Error posting loan offer:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to post loan offer.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Post New Loan Details</h2>
        <form onSubmit={handlePostLoan} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Loan Type (e.g., Small Business Loan)</label>
            <input type="text" value={loanType} onChange={(e) => setLoanType(e.target.value)} className="w-full mt-1 p-2 border rounded"/>
          </div>
          <div>
            <label className="block text-sm font-medium">Interest Rate (%)</label>
            <input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full mt-1 p-2 border rounded"/>
          </div>
          <div>
            <label className="block text-sm font-medium">Maximum Loan Amount (₹)</label>
            <input type="number" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} className="w-full mt-1 p-2 border rounded"/>
          </div>
          <div>
            <label className="block text-sm font-medium">Description and Terms (Optional)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mt-1 p-2 border rounded" rows="3"></textarea>
          </div>
          <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">Post Loan Offer</button>
        </form>
      </div>
    </div>
  );
};

export default BankerDashboard;