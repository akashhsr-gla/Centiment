import React, { useState } from 'react';
import CustomBarGraph from '../Charts/CustomBarGraph';
import Modal from '../Layouts/Modal';
import { FiSearch } from 'react-icons/fi';
import { FiChevronDown } from 'react-icons/fi';

const IncomeOverview = ({ transactions, onAddIncome }) => {

  return (
   <div>
     <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
      {/* Title and Add Income Button */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold text-blue-700">Income Overview</h3>
          <p className="text-gray-500 text-sm">Track your earnings over time and analyze your income trends.</p>
        </div>
        <button 
          onClick={onAddIncome} 
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
          + Add Income
        </button>
      </div>

      {/* Income Bar Chart */}
      <CustomBarGraph transactions={transactions} title="Income Trends" />
    </div>
   
   </div>
  );
};

export default IncomeOverview;