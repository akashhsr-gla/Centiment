import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utilities/axios';
import { API_PATHS } from '../../../utilities/apipath';
import { addThousandsSeparator } from '../../../utilities/helper';
import { LuTrendingUp, LuTrendingDown, LuCalendar, LuArrowUpRight, LuArrowDownRight } from 'react-icons/lu';
import moment from 'moment';

const PredictionCard = ({ type = 'both' }) => {
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
      <div className='card'>
        <div className='flex items-center justify-between'>
          <h5 className='text-xl font-bold text-blue-700'>Future Predictions</h5>
        </div>
        <div className='mt-6 space-y-4'>
          {[...Array(5)].map((_, index) => (
            <div key={index} className='animate-pulse'>
              <div className='h-16 bg-gray-200 rounded'></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='card'>
        <div className='flex items-center justify-between'>
          <h5 className='text-xl font-bold text-blue-700'>Future Predictions</h5>
        </div>
        <div className='mt-6 text-center text-red-500'>
          <p>{error}</p>
          <button 
            onClick={fetchPredictions}
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!predictions) return null;

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-xl font-bold text-blue-700'>Future Predictions</h5>
      </div>
      <div className='mt-6 space-y-4'>
        {type !== 'expense' && (
          <div className='mb-6'>
            <div className='flex items-center gap-2 mb-4'>
              <LuTrendingUp className='text-green-500 text-xl' />
              <h6 className='font-semibold'>Income Predictions</h6>
            </div>
            <div className='space-y-4'>
              {predictions.predictions.map((pred, index) => (
                <div key={index} className='flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-green-100 rounded-full'>
                      <LuCalendar className='text-green-500' />
                    </div>
                    <div>
                      <p className='font-medium'>{moment(pred.date).format('DD MMM YYYY')}</p>
                      <p className='text-sm text-gray-500'>Predicted Income</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <LuArrowUpRight className='text-green-500' />
                    <span className='text-green-600 font-semibold'>₹{addThousandsSeparator(pred.predictedIncome)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {type !== 'income' && (
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <LuTrendingDown className='text-red-500 text-xl' />
              <h6 className='font-semibold'>Expense Predictions</h6>
            </div>
            <div className='space-y-4'>
              {predictions.predictions.map((pred, index) => (
                <div key={index} className='flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-red-100 rounded-full'>
                      <LuCalendar className='text-red-500' />
                    </div>
                    <div>
                      <p className='font-medium'>{moment(pred.date).format('DD MMM YYYY')}</p>
                      <p className='text-sm text-gray-500'>Predicted Expense</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <LuArrowDownRight className='text-red-500' />
                    <span className='text-red-600 font-semibold'>₹{addThousandsSeparator(pred.predictedExpense)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionCard; 