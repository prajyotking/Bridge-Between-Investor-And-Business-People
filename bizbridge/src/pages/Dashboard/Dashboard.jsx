import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/Loader';
import EntrepreneurDashboard from './EntrepreneurDashboard';
import InvestorDashboard from './InvestorDashboard';
import BankerDashboard from './BankerDashboard';
import AdvisorDashboard from './AdvisorDashboard';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case 'entrepreneur':
        return <EntrepreneurDashboard />;
      case 'investor':
        return <InvestorDashboard />;
      case 'banker':
        return <BankerDashboard />;
      case 'advisor':
        return <AdvisorDashboard />;
      default:
        return <div>Invalid user role or not logged in.</div>;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-white font-bold mb-4">Welcome to your Dashboard, {user?.name}</h1>
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;