// src/pages/Dashboard/InvestorDashboard.jsx

import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import logger from '../../utils/logger';

const InvestorDashboard = () => {
  const { user } = useAuth();
  // Form state for posting investor interest
  const [interestArea, setInterestArea] = useState('');
  const [maxInvestment, setMaxInvestment] = useState('');
  
  // State for viewing proposals
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all business proposals when the component mounts
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const proposalsQuery = query(collection(db, "proposals"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(proposalsQuery);
        const proposalsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProposals(proposalsList);
        logger.info('Successfully fetched business proposals for investor.');
      } catch (error) {
        logger.error('Error fetching business proposals:', error);
        toast.error('Could not fetch proposals.');
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const handlePostInterest = async (e) => {
    e.preventDefault();
    if (!interestArea || !maxInvestment) {
      return toast.error("Please fill all fields.");
    }
    const loadingToast = toast.loading('Posting your interest...');
    try {
      await addDoc(collection(db, 'investorInterests'), {
        interestArea,
        maxInvestment: Number(maxInvestment),
        investorId: user.uid,
        investorName: user.name,
        createdAt: new Date(),
      });
      logger.info('New investor interest posted by:', user.email);
      toast.dismiss(loadingToast);
      toast.success('Interest posted successfully!');
      // Reset form
      setInterestArea('');
      setMaxInvestment('');
    } catch (error) {
      logger.error('Error posting investor interest:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to post your interest.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Post Investor Proposal Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Post Your Investment Proposal</h2>
        <form onSubmit={handlePostInterest} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Areas of Interest (e.g., Tech, Healthcare)</label>
            <input type="text" value={interestArea} onChange={(e) => setInterestArea(e.target.value)} className="w-full mt-1 p-2 border rounded"/>
          </div>
          <div>
            <label className="block text-sm font-medium">Maximum Investment ($)</label>
            <input type="number" value={maxInvestment} onChange={(e) => setMaxInvestment(e.target.value)} className="w-full mt-1 p-2 border rounded"/>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Post Proposal</button>
        </form>
      </div>

      {/* View Business Proposals */}
      <div className="bg-white p-6 rounded-lg shadow h-full overflow-y-auto max-h-[70vh]">
        <h2 className="text-2xl font-semibold mb-4">Available Business Proposals</h2>
        {loading ? <p>Loading proposals...</p> : (
          <div className="space-y-4">
            {proposals.length > 0 ? proposals.map(prop => (
              <div key={prop.id} className="p-4 border rounded-lg bg-gray-50">
                <h3 className="font-bold text-lg text-blue-800">{prop.title}</h3>
                <p className="font-semibold text-green-600">Funding Needed: ${prop.fundingNeeded.toLocaleString()}</p>
                <p className="text-sm text-gray-700 mt-2">{prop.description}</p>
                <p className="text-xs text-gray-500 mt-3">Posted by: {prop.entrepreneurName}</p>
              </div>
            )) : <p>No business proposals found at the moment.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;