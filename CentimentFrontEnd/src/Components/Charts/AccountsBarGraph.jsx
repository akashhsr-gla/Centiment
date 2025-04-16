import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { addThousandsSeparator } from '../../utilities/helper';

const AccountsBarGraph = ({ data }) => {
    const chartData = [
        { name: 'Income', value: data?.totalIncome || 0, fill: '#1d4ed8' },
        { name: 'Expenses', value: data?.totalExpenses || 0, fill: '#1d4ed8' },
        { name: 'Net Profit', value: data?.netProfit || 0, fill: data?.netProfit >= 0 ? '#1d4ed8' : '#dc2626' },
        { name: 'Tax Payable', value: data?.taxPayable || 0, fill: '#1d4ed8' }
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-medium text-gray-700">{payload[0].name}</p>
                    <p className="text-blue-700">₹{addThousandsSeparator(payload[0].value)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Financial Overview</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                            dataKey="name" 
                            tick={{ fill: '#6b7280' }}
                            axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <YAxis 
                            tick={{ fill: '#6b7280' }}
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickFormatter={(value) => `₹${addThousandsSeparator(value)}`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AccountsBarGraph; 