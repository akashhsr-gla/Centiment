import React from 'react';
import CustomPieChart from '../../Charts/CustomPieChart';

const IncomeLast60Days = ({ transactions }) => {
  if (!transactions || typeof transactions !== 'number') {
    return <p className="text-gray-500 text-center">No income data available</p>;
  }

  // Format data for Pie Chart
  const chartData = [
    { name: 'Total Income', value: transactions }
  ];

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-black mb-4">Income Overview (Last 60 Days)</h3>
      <CustomPieChart data={chartData} />
    </div>
  );
};

export default IncomeLast60Days;
