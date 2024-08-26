import React from 'react';

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
      <div className="text-3xl text-gray-500 mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
