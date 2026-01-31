// src/pages/Dashboard/AdvisorDashboard.jsx

import React, { useState } from 'react';
import { db } from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import logger from '../../utils/logger';

const AdvisorDashboard = () => {
  const { user } = useAuth();
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');

  // This component could be expanded to view queries and post solutions.
  // For now, it focuses on posting informational articles.

  const handlePostArticle = async (e) => {
    e.preventDefault();
    if (!articleTitle || !articleContent) {
      return toast.error("Please provide a title and content for the article.");
    }
    const loadingToast = toast.loading('Posting article...');
    try {
      await addDoc(collection(db, 'articles'), {
        title: articleTitle,
        content: articleContent,
        advisorId: user.uid,
        advisorName: user.name,
        createdAt: new Date(),
      });
      logger.info('New article posted by advisor:', user.email);
      toast.dismiss(loadingToast);
      toast.success('Article posted successfully!');
      // Reset form
      setArticleTitle('');
      setArticleContent('');
    } catch (error)
    {
      logger.error('Error posting article:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to post article.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Post Article Form */}
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Post an Informational Article</h2>
            <form onSubmit={handlePostArticle} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Article Title</label>
                    <input type="text" value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} className="w-full mt-1 p-2 border rounded"/>
                </div>
                <div>
                    <label className="block text-sm font-medium">Article Content</label>
                    <textarea value={articleContent} onChange={(e) => setArticleContent(e.target.value)} className="w-full mt-1 p-2 border rounded" rows="8"></textarea>
                </div>
                <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600">Publish Article</button>
            </form>
        </div>

        {/* Placeholder for View Queries / Post Solutions */}
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">User Queries</h2>
            <div className="text-center text-gray-500 mt-10">
                <p>The feature to view and answer user queries is under development.</p>
                <p className="text-sm mt-2">This section will display questions from entrepreneurs and investors, allowing you to provide expert advice.</p>
            </div>
        </div>
    </div>
  );
};

export default AdvisorDashboard;