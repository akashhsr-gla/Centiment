import React, { useEffect, useState } from 'react'
import Dashboardlayout from '../../Components/dashboardlayout'
import { userUserAuth } from '../../Hooks/userUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utilities/axios';
import { API_PATHS } from '../../utilities/apipath';
import InfoCard from '../../Components/Cards/InfoCard';
import { IoCardSharp } from "react-icons/io5";
import { addThousandsSeparator } from "../../utilities/helper"
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import RecentTransactions from '../../Components/Cards/Dashboard/RecentTransactions';
import FinanceOverview from '../../Components/Cards/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../Components/Cards/Dashboard/ExpenseTransactions';
import CustomBarGraph from '../../Components/Charts/CustomBarGraph';
import IncomeTransactions from '../../Components/Cards/Dashboard/IncomeTransactions';
import IncomeLast60Days from '../../Components/Cards/Dashboard/IncomeLast60Days';
import PredictionCard from '../../Components/Cards/Dashboard/PredictionCard';
import TaxSummaryCard from '../../Components/Cards/Dashboard/TaxSummaryCard';

const Home = () => {
  userUserAuth();
  const navigate= useNavigate();
  const [DashboardData,setDashboardData]=useState(null);
  const [loading,setloading]= useState(false);
  const fetchDashboardData= async()=>{
    if(loading){return}

    setloading(true);
     try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      )
      if(response.data){
        setDashboardData(response.data);
      }
      
     } catch (error) {
      console.error("Error in Loading Data")
      
     }finally{
      setloading(false);
     }


  } ;
  useEffect(() => {
    fetchDashboardData();
  
    return () => { 
      
    }
  }, []);
  
  return (
    <Dashboardlayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <InfoCard
           icon={<IoCardSharp/>}
           label= "Total Balance"
           value={addThousandsSeparator(DashboardData?.totalBalance||0)}
           color="bg-blue-700"/>
           <InfoCard
           icon={<LuWalletMinimal/>}
           label= "Total Income"
           value={addThousandsSeparator(DashboardData?.totalIncome||0)}
           color="bg-blue-700"/>
           <InfoCard
           icon={<LuHandCoins/>}
           label= "Total Expense"
           value={addThousandsSeparator(DashboardData?.totalExpenses||0)}
           color="bg-blue-700"/>


        </div>

        <div className="mt-6">
            <TaxSummaryCard 
                taxableProfit={DashboardData?.taxableProfit}
                taxPayable={DashboardData?.taxPayable}
            />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
          transactions={DashboardData?.lastFiveTransactions}
          onSeeMore={()=>{navigate('/expense')}}
          />
          <FinanceOverview
          tB={DashboardData?.totalBalance}
          tI= {DashboardData?.totalIncome}
          tE={DashboardData?.totalExpenses}
          />
          <ExpenseTransactions
          transactions={DashboardData?.expenseLast30Days}
          onSeeMore={()=>{
            navigate('/expense')
          }}
          />
          <CustomBarGraph transactions={DashboardData?.expenseLast30Days}
          title="Expense Overview (Last 30 Days)" />

          <IncomeLast60Days transactions={DashboardData?.sumIncomeLast60Days}/>
          
          <IncomeTransactions
          transactions={DashboardData?.incomeLast60Days}
          onSeeMore={()=>{
            navigate('/income')
          }}
          />

          <PredictionCard type="income" /><PredictionCard type="expense" />
        </div>

      </div>

    </Dashboardlayout>
  )
}

export default Home