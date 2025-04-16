import React, { useEffect, useState } from 'react';
import Dashboardlayout from '../../Components/dashboardlayout';
import axiosInstance from '../../utilities/axios';
import { API_PATHS } from '../../utilities/apipath';
import InfoCard from '../../Components/Cards/InfoCard';
import { addThousandsSeparator } from '../../utilities/helper';
import { 
    LuWallet, 
    LuHandCoins, 
    LuTrendingUp, 
    LuFileText, 
    LuCalendar
} from 'react-icons/lu';
import { IoPieChart } from "react-icons/io5";
import AccountsBarGraph from '../../Components/Charts/AccountsBarGraph';

const Accounts = () => {
    const [accountsData, setAccountsData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchAccountsData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.ACCOUNTS.GET_SUMMARY);
            if (response.data) {
                setAccountsData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching accounts data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccountsData();
    }, []);

    if (loading) {
        return (
            <Dashboardlayout activeMenu="Accounts">
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
                </div>
            </Dashboardlayout>
        );
    }

    return (
        <Dashboardlayout activeMenu="Accounts">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <InfoCard
                        icon={<LuWallet />}
                        label="Total Income"
                        value={addThousandsSeparator(accountsData?.totalIncome || 0)}
                        color="bg-blue-700"
                    />
                    <InfoCard
                        icon={<LuHandCoins />}
                        label="Total Expenses"
                        value={addThousandsSeparator(accountsData?.totalExpenses || 0)}
                        color="bg-blue-700"
                    />
                    <InfoCard
                        icon={<LuTrendingUp />}
                        label="Net Profit"
                        value={addThousandsSeparator(accountsData?.netProfit || 0)}
                        color={accountsData?.netProfit >= 0 ? "bg-blue-700" : "bg-red-600"}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                                <span className="text-lg font-medium">₹{addThousandsSeparator(accountsData?.taxableProfit || 0)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 flex items-center justify-center text-xl text-white bg-blue-700 rounded-full">
                                        <IoPieChart />
                                    </div>
                                    <span className="text-gray-600">Tax Payable (25%)</span>
                                </div>
                                <span className="text-lg font-medium">₹{addThousandsSeparator(accountsData?.taxPayable || 0)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Performance Metrics</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 flex items-center justify-center text-xl text-white bg-blue-700 rounded-full">
                                        <LuTrendingUp />
                                    </div>
                                    <span className="text-gray-600">Profitability Ratio</span>
                                </div>
                                <span className="text-lg font-medium">{accountsData?.profitabilityRatio?.toFixed(2) || 0}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 flex items-center justify-center text-xl text-white bg-blue-700 rounded-full">
                                        <LuCalendar />
                                    </div>
                                    <span className="text-gray-600">Operating Profit</span>
                                </div>
                                <span className="text-lg font-medium">₹{addThousandsSeparator(accountsData?.operatingProfit || 0)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <AccountsBarGraph data={accountsData} />
                </div>
            </div>
        </Dashboardlayout>
    );
};

export default Accounts; 