import React from 'react'
import { LuArrowLeftRight } from 'react-icons/lu'
import TransactionInfoCard from '../TransactionInfoCard'
import moment from 'moment'

const ExpenseTransactions = ({transactions, onSeeMore}) => {

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-xl font-bold'>Recent Expenses</h5>
                <button className='buttonrt' onClick={onSeeMore}>
                    See All <LuArrowLeftRight className='text-base'/>


                </button>


            
        </div>
        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((expenses)=>(
                <TransactionInfoCard
                key={expenses._id}
                title={expenses.category}
                icon={expenses.icon}
                date={moment(expenses.date).format("DD MM YYYY")}
                amount={expenses.amount}
                type="expense"
                hideDeleteBtn/>
            ))}

        </div>
    </div>
  )
}

export default ExpenseTransactions