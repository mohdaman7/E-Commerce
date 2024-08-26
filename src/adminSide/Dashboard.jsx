import React from 'react';
import StatsCard from './StatsCard';
import { FaBox, FaUsers, FaDollarSign } from 'react-icons/fa';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatsCard title="Total Products" value="120" icon={<FaBox />} />
          <StatsCard title="Total Users" value="350" icon={<FaUsers />} />
          <StatsCard title="Total Sales" value="$5,340" icon={<FaDollarSign />} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {/* Add recent activity components here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

