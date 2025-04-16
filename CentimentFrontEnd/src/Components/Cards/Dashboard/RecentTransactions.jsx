import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../TransactionInfoCard';

const RecentTransactions = ({ transactions, onSeeMore }) => {
    console.log("Received Transactions:"); 
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold">Recent Transactions</h5>
        <button className="buttonrt" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0, 5).map((item) => (
          <TransactionInfoCard
          key={item._id}
          title={item.category ? item.category : item.source} // Expense → category, Income → source
          icon={item.icon || '💰'} // Default icon if missing
          amount={item.amount}
          date={moment(item.date).format('DD MMM YYYY')}
          type={item.category ? 'expense' : 'income'} // If category exists, it's an expense; otherwise, it's income
          hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
