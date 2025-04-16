import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-300">
        <h5 className="text-xl font-bold text-black">Income Sources</h5>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-700  font-bold text-white rounded-lg hover:bg-blue-800 transition"
          onClick={onDownload}
        >
          <LuDownload className="text-lg" /> Download
        </button>
      </div>

      {/* Transactions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {transactions?.length > 0 ? (
          transactions.map((income) => (
            <TransactionInfoCard
             key={income._id}
              
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("DD MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-2 text-center">No income records found.</p>
        )}
      </div>
    </div>
  );
};

export default IncomeList;