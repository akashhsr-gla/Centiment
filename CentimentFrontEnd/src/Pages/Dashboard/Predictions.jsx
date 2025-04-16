import React, { useEffect, useState } from 'react';
import Dashboardlayout from '../../Components/dashboardlayout';
import axiosInstance from '../../utilities/axios';
import { API_PATHS } from '../../utilities/apipath';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import moment from 'moment';
import { LuTrendingUp, LuTrendingDown } from 'react-icons/lu';
import { addThousandsSeparator } from '../../utilities/helper';

const Predictions = () => {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPredictions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get(API_PATHS.PREDICTIONS.GET_PREDICTIONS);
      if (response.data && response.data.success) {
        setPredictions(response.data);
      } else {
        setError(response.data?.message || 'Failed to load predictions');
      }
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setError(error.response?.data?.message || 'Failed to load predictions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  if (loading) {
    return (
      <Dashboardlayout activeMenu="Predictions">
        <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {[...Array(4)].map((_, index) => (
              <div key={index} className='card animate-pulse'>
                <div className='h-64 bg-gray-200 rounded'></div>
              </div>
            ))}
          </div>
        </div>
      </Dashboardlayout>
    );
  }

  if (error) {
    return (
      <Dashboardlayout activeMenu="Predictions">
        <div className='my-5 mx-auto'>
          <div className='card text-center p-6'>
            <p className='text-red-500 mb-4'>{error}</p>
            <button 
              onClick={fetchPredictions}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Try Again
            </button>
          </div>
        </div>
      </Dashboardlayout>
    );
  }

  if (!predictions) return null;

  const incomeData = predictions.predictions.map(pred => ({
    date: moment(pred.date).format('DD MMM'),
    amount: pred.predictedIncome
  }));

  const expenseData = predictions.predictions.map(pred => ({
    date: moment(pred.date).format('DD MMM'),
    amount: pred.predictedExpense
  }));

  return (
    <Dashboardlayout activeMenu="Predictions">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Income Predictions Card */}
          <div className='card'>
            <div className='flex items-center gap-2 mb-4'>
              <LuTrendingUp className='text-green-500 text-xl' />
              <h5 className='text-xl font-bold'>Income Predictions</h5>
            </div>
            <div className='mt-6'>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={incomeData}>
                  <XAxis dataKey="date" stroke="#1E3A8A" />
                  <YAxis stroke="#1E3A8A" />
                  <Tooltip 
                    cursor={{ fill: '#1E3A8A20' }}
                    formatter={(value) => [`₹${addThousandsSeparator(value)}`, 'Predicted Income']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Expense Predictions Card */}
          <div className='card'>
            <div className='flex items-center gap-2 mb-4'>
              <LuTrendingDown className='text-red-500 text-xl' />
              <h5 className='text-xl font-bold'>Expense Predictions</h5>
            </div>
            <div className='mt-6'>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={expenseData}>
                  <XAxis dataKey="date" stroke="#1E3A8A" />
                  <YAxis stroke="#1E3A8A" />
                  <Tooltip 
                    cursor={{ fill: '#1E3A8A20' }}
                    formatter={(value) => [`₹${addThousandsSeparator(value)}`, 'Predicted Expense']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    dot={{ fill: '#EF4444', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Combined Predictions Card */}
          <div className='card md:col-span-2'>
            <h5 className='text-xl font-bold mb-4 text-blue-700'>Combined Predictions</h5>
            <div className='mt-6'>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={predictions.predictions.map(pred => ({
                  date: moment(pred.date).format('DD MMM'),
                  income: pred.predictedIncome,
                  expense: pred.predictedExpense
                }))}>
                  <XAxis dataKey="date" stroke="#1E3A8A" />
                  <YAxis stroke="#1E3A8A" />
                  <Tooltip 
                    cursor={{ fill: '#1E3A8A20' }}
                    formatter={(value, name) => [`₹${addThousandsSeparator(value)}`, name === 'income' ? 'Predicted Income' : 'Predicted Expense']}
                  />
                  <Bar dataKey="income" fill="#10B981" barSize={30} radius={[10, 10, 0, 0]} />
                  <Bar dataKey="expense" fill="#EF4444" barSize={30} radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Dashboardlayout>
  );
};

export default Predictions; 