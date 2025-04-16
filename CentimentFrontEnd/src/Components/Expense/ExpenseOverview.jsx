import React from 'react';
import CustomBarGraph from '../Charts/CustomBarGraph';


const ExpenseOverview = ({ transactions, onAddExpense }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold text-black">Expense Overview</h3>
          <p className="text-gray-500">Track your spending habits and manage expenses effectively.</p>
        </div>
        <button 
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          onClick={onAddExpense}
        >
          + Add Expense
        </button>
      </div>

      {/* Bar Chart */}
      <CustomBarGraph transactions={transactions} title="Expense Trends" />
    </div>
  );
};

export default ExpenseOverview;