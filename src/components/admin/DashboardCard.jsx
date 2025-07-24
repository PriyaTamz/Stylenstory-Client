import React from 'react';

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className={`p-6 rounded-xl shadow-lg flex items-center space-x-4 bg-gradient-to-br ${color} text-white`}>
      <div className="bg-white bg-opacity-20 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;