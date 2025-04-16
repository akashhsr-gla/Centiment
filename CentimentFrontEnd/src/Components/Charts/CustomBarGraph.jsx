import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const CustomBarGraph = ({ transactions = [], title }) => {
  if (!transactions || transactions.length === 0) {
    return <p className="text-gray-500 text-center">No expense data available</p>;
  }

  // Format the data for the chart
  const data = transactions.map((expense) => ({
    date: moment(expense.date).format('DD MMM'), // Format date for X-axis
    amount: expense.amount || 0, // Ensure amount is a number
  }));

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-black mb-4">{title}</h3>
      <div className='mt-3'>
        <ResponsiveContainer widthx="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="date" stroke="#1E3A8A" />
            <YAxis stroke="#1E3A8A" />
            <Tooltip cursor={{ fill: '#1E3A8A20' }} />
            <Bar dataKey="amount" fill="#1E40AF" barSize={50} radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarGraph;
