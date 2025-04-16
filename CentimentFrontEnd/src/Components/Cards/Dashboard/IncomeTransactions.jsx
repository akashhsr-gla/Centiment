import React from 'react';
import { LuArrowLeftRight } from 'react-icons/lu';
import TransactionInfoCard from '../TransactionInfoCard';
import moment from 'moment';

const IncomeTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-xl font-bold'>Recent Income</h5>
        <button className='buttonrt' onClick={onSeeMore}>
          See All <LuArrowLeftRight className='text-base' />
        </button>
      </div>
      <div className='mt-6'>
        {transactions?.slice(0, 5)?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format('DD MM YYYY')}
            amount={income.amount}
            type='income'
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeTransactions;
