import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import logger from '../../utils/logger';

const EntrepreneurDashboard = () => {
  const { user } = useAuth();
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [fundingNeeded, setFundingNeeded] = useState('');
  const [myIdeas, setMyIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user's posted ideas
  useEffect(() => {
    if (!user) return;
    const fetchIdeas = async () => {
      setLoading(true);
      const q = query(collection(db, "proposals"), where("entrepreneurId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const ideas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMyIdeas(ideas);
      setLoading(false);
    };
    fetchIdeas();
  }, [user]); 

  const handlePostIdea = async (e) => {
    e.preventDefault();
    if (!ideaTitle || !ideaDescription || !fundingNeeded) {
        return toast.error("Please fill all fields.");
    }
    const loadingToast = toast.loading('Posting your idea...');
    try {
      await addDoc(collection(db, 'proposals'), {
        title: ideaTitle,
        description: ideaDescription,
        fundingNeeded: Number(fundingNeeded),
        entrepreneurId: user.uid,
        entrepreneurName: user.name,
        createdAt: new Date(),
      });
      logger.info('New business idea posted by:', user.email);
      toast.dismiss(loadingToast);
      toast.success('Idea posted successfully!');
      // Reset form
      setIdeaTitle('');
      setIdeaDescription('');
      setFundingNeeded('');
    } catch (error) {
      logger.error('Error posting idea:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to post idea.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Post Idea Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Post a New Business Idea</h2>
        <form onSubmit={handlePostIdea} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Idea Title</label>
            <input type="text" value={ideaTitle} onChange={(e) => setIdeaTitle(e.target.value)} className="w-full mt-1 p-2 border rounded"/>
          </div>
          <div>
            <label className="block text-sm font-medium">Detailed Description</label>
            <textarea value={ideaDescription} onChange={(e) => setIdeaDescription(e.target.value)} className="w-full mt-1 p-2 border rounded" rows="4"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">Funding Needed (₹)</label>
            <input type="number" value={fundingNeeded} onChange={(e) => setFundingNeeded(e.target.value)} className="w-full mt-1 p-2 border rounded"/>
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Post Idea</button>
        </form>
      </div>

      {/* View My Ideas */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">My Posted Ideas</h2>
        {loading ? <p>Loading ideas...</p> : (
          <div className="space-y-4">
            {myIdeas.length > 0 ? myIdeas.map(idea => (
              <div key={idea.id} className="p-4 border rounded">
                <h3 className="font-bold">{idea.title}</h3>
                <p>Funding: ₹{idea.fundingNeeded.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{idea.description.substring(0, 100)}...</p>
              </div>
            )) : <p>You haven't posted any ideas yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;