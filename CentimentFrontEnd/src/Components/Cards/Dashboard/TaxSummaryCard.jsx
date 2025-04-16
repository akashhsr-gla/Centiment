import React, { useEffect, useState } from 'react';
import { LuFileText } from 'react-icons/lu';
import { IoPieChart } from "react-icons/io5";
import { addThousandsSeparator } from '../../../utilities/helper';
import axiosInstance from '../../../utilities/axios';
import { API_PATHS } from '../../../utilities/apipath';

const TaxSummaryCard = () => {
    const [taxData, setTaxData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchTaxData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.ACCOUNTS.GET_SUMMARY);
            if (response.data) {
                setTaxData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching tax data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTaxData();
    }, []);

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-700"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Tax Summary</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 flex items-center justify-center text-xl text-white bg-blue-700 rounded-full">
                            <LuFileText />
                        </div>
                        <span className="text-gray-600">Taxable Profit</span>
                    </div>
                    <span className="text-lg font-medium">₹{addThousandsSeparator(taxData?.taxableProfit || 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 flex items-center justify-center text-xl text-white bg-blue-700 rounded-full">
                            <IoPieChart />
                        </div>
                        <span className="text-gray-600">Tax Payable (25%)</span>
                    </div>
                    <span className="text-lg font-medium">₹{addThousandsSeparator(taxData?.taxPayable || 0)}</span>
                </div>
            </div>
        </div>
    );
};

export default TaxSummaryCard; 